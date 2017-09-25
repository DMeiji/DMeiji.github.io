(function ($) {
    'use strict';

    // =========================
    // 定数
    // =========================

    // =========================
    // 静的変数
    // =========================
    var manager = h5.core.data.createManager('ResultListManager', 'MaterialListTool.manager');
    var model = manager.createModel({
        name: 'ResultModel',
        schema: {
            id: { id: true },
            setItems: null,
            materials: null
        }
    });

    // =========================
    // 関数
    // =========================

    // =========================
    // 画面コントローラ
    // =========================
    var pageController = {

        __name: 'MaterialListTool.controller.PageController',

        _logic: MaterialListTool.logic.PageLogic,

        // 所持素材マップ。所持素材はセット単位ではなく全体で合計を出すので
        // マップの構造は { xxx: m, yyy: n }
        _possessionMap: {},
        // 素材マップ。セット単位で素材合計を出すので
        // マップの構造は { 0: {xxx: m, yyy: n}, 1: {...} }
        _materialMap: {},
        // 出力用データアイテム
        _resultDataItem: null,

        _$possessionList: null,// 所持textarea要素
        _$materialList: null,// 素材textarea要素

        __ready: function () {
            // 出力用データアイテムを生成してバインド
            this._resultDataItem = model.create({
                id: 'resultItem',
                setItems: null
            });
            h5.core.view.bind('.resultContainer', this._resultDataItem);

            this._$possessionList = this.$find('.possessionList');// 所持textarea要素をキャッシュ
            this._$materialList = this.$find('.materialList');// 素材textarea要素をキャッシュ
        },

        /**
         * 所持データ入力欄から文字列を取得
         * 
         * @private
         */
        _getPossessionStr: function () {
            return this._$possessionList.val();
        },

        /**
         * 素材データ入力欄から文字列を取得
         * 
         * @private
         */
        _getMaterialStr: function () {
            return this._$materialList.val();
        },

        /**
         * 所持データ文字列をデータに変換
         * 
         * @private
         */
        _convertPossessionStrToData: function (data) {
            var result = {};
            var lineListStr = data.split('\n');// 改行で区切る。各要素は素材名と数の文字列。
            lineListStr.forEach(function (lineStr, idx) {
                if (lineStr === '') {
                    return;
                }
                var match = lineStr.match(/ [0-9]+$/);
                var materialName = lineStr.slice(0, match.index);
                var materialNum = parseInt(lineStr.slice(match.index));

                result[materialName] = result[materialName] || 0;
                result[materialName] += materialNum;// 重複する素材名が存在する場合は加算している
            });
            this._possessionMap = result;
        },

        /**
         * 素材データ文字列をデータに変換
         * 
         * @private
         */
        _convertMaterialStrToData: function (data) {
            this._materialMap = {};
            var hasConvertErr = false;

            var setBlockStrList = data.split(/^# |\n# /);// 見出しごとに分割
            setBlockStrList.shift();// 先頭要素は空文字列なのでshiftで配列から外す
            setBlockStrList.forEach(this.own(function (setBlockStr, setIdx) {
                this._materialMap[setIdx] = {};

                var lineStrList = setBlockStr.split('\n');// 改行ごとに分割
                var setName = lineStrList[0];// セット名
                this._materialMap[setIdx].setName = setName;// セット名をキャッシュ
                lineStrList.shift();// 先頭要素(セット名)をshiftで外す

                var materials = this._materialMap[setIdx].materials = {};

                lineStrList.forEach(this.own(function (lineStr) {
                    if (lineStr === '') {
                        return;
                    }
                    // 小見出し「## 」は現在出力に使用しないので何もしない
                    if (/^## /.test(lineStr)) {
                        return;
                    }
                    // 素材行「- 」から素材名と数を取得
                    var match = lineStr.match(/ [0-9]+$/);
                    if (match == null) {
                        return;
                    }
                    var tabIdx = match.index;
                    var materialName = lineStr.slice(2, tabIdx);// 素材名
                    var materialNum = parseInt(lineStr.slice(tabIdx));// 末尾からみて半角スペース+数値が素材数部分
                    hasConvertErr = isNaN(materialNum);// 素材名の数値が文字列から数値に変換できたかチェック

                    // 素材がマップに存在しない場合は0をセット
                    materials[materialName] = materials[materialName] || 0;
                    materials[materialName] += materialNum;// 素材数を加算
                }));
            }));
        },

        '.calcBtn click': function (context) {
            var possessionStr = this._getPossessionStr();// 所持素材データ文字列
            this._convertPossessionStrToData(possessionStr);

            var materialStr = this._getMaterialStr();// 素材データ文字列
            this._convertMaterialStrToData(materialStr);// 素材データに変換してキャッシュ

            this._updateResult();// 出力を更新
        },

        _updateResult: function () {
            var result = [];
            // 出力はセット単位で分ける
            $.each(this._materialMap, this.own(function (setIdxKey, blockData) {
                var setName = blockData.setName;// セット名
                var materials = [];
                // 素材ごとに素材名・必要合計数・残数をオブジェクトに詰める
                $.each(blockData.materials, this.own(function (materialName, materialTotalVal) {
                    var possessionVal = this._possessionMap[materialName] || 0;
                    var remainVal = materialTotalVal - possessionVal;// 残数
                    remainVal = remainVal < 0 ? 0 : remainVal;// 残数は0未満であれば0とする
                    var cellColor = remainVal === 0 ? '#ded3de' : 'white';// セルの背景色。残数0かどうかで色を変える
                    materials.push({
                        name: materialName,
                        totalNum: materialTotalVal,
                        remainNum: remainVal,
                        cellColor: cellColor
                    });
                }));
                result.push({
                    setName: setName,
                    materials: materials
                });
            }));
            this._resultDataItem.set('setItems', result);
        },

        /**
         * 記述例ボタン押下。記述例を所持欄、素材欄に入れる
         */
        '.descExampleBtn click': function () {
            var data = this._logic.getDescExampleData();
            this._$possessionList.val(data.possessionData);
            this._$materialList.val(data.materialData);
        },

        /**
         * 所持textareaをクリア
         */
        '.possessionClearBtn click': function () {
            this._$possessionList.val('');
        },

        /**
         * 素材textareaをクリア
         */
        '.materialClearBtn click': function () {
            this._$materialList.val('');
        },

        /**
         * 出力エリアをクリア
         */
        '.outputClearBtn click': function() {
            // 出力エリアはデータバインド機構で出力しているので
            // データアイテムを空にして出力する
            this._materialMap = {};
            this._updateResult();
        }
    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);