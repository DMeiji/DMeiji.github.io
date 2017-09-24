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

        __ready: function () {
            // 出力用データアイテムを生成してバインド
            this._resultDataItem = model.create({
                id: 'resultItem',
                setItems: null
            });
            h5.core.view.bind('.resultArea', this._resultDataItem);
        },

        /**
         * 所持データ入力欄から文字列を取得
         * 
         * @private
         */
        _getPossessionStr: function () {
            return this.$find('.possessionList').val();
        },

        /**
         * 素材データ入力欄から文字列を取得
         * 
         * @private
         */
        _getMaterialStr: function () {
            return this.$find('.materialList').val();
        },

        /**
         * 所持データ文字列をデータに変換
         * 
         * @private
         */
        _convertPosessionStrToData: function (data) {

        },

        /**
         * 素材データ文字列をデータに変換
         * 
         * @private
         */
        _convertMaterialStrToData: function (data) {
            this._materialMap = {};
            var hasConvertErr = false;

            var setBlockStrList = data.split(/^# /);// 見出しごとに分割
            setBlockStrList.shift();// 先頭要素は空文字列なのでshiftで配列から外す
            setBlockStrList.forEach(this.own(function (setBlockStr, setIdx) {
                this._materialMap[setIdx] = {};

                var lineStrList = setBlockStr.split('\n');// 改行ごとに分割
                var setName = lineStrList[0];// セット名
                this._materialMap[setIdx].setName = setName;// セット名をキャッシュ
                lineStrList.shift();// 先頭要素(セット名)をshiftで外す

                var materials = this._materialMap[setIdx].materials = {};

                lineStrList.forEach(this.own(function (lineStr) {
                    // 小見出し「## 」は現在出力に使用しないので何もしない
                    if (/^## /.test(lineStr)) {
                        return;
                    }
                    // 素材行「- 」から素材名と数を取得
                    var tabIdx = lineStr.match(/ [0-9]+$/).index;
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
            var posessionStr = this._getPossessionStr();// 所持素材データ文字列
            this._convertPosessionStrToData(posessionStr);
            var materialStr = this._getMaterialStr();// 素材データ文字列
            this._convertMaterialStrToData(materialStr);// 素材データに変換してキャッシュ

            this._updateResult();
        },

        _updateResult: function () {
            var result = [];

            // var posessionMap = this._possessionMap;

            $.each(this._materialMap, this.own(function (setIdxKey, blockData) {
                var setName = blockData.setName;
                var materials = [];

                $.each(blockData.materials, this.own(function (materialName, materialTotalVal) {
                    materials.push({
                        name: materialName,
                        totalNum: materialTotalVal
                        // remainNum: remainVal
                    });
                }));
                result.push({
                    setName: setName,
                    materials: materials
                });
            }));
            this._resultDataItem.set('setItems', result);
        }

    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);