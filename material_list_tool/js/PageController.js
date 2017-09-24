(function ($) {
    'use strict';

    // =========================
    // 定数
    // =========================

    // =========================
    // 静的変数
    // =========================

    // =========================
    // 関数
    // =========================

    // =========================
    // 画面コントローラ
    // =========================
    var pageController = {

        __name: 'MaterialListTool.controller.PageController',

        _logic: MaterialListTool.logic.PageLogic,

        // 素材マップ。セット単位で素材合計を出すので
        // マップの構造は { 0: {xxx: m, yyy: n}, 1: {...} }
        _materialMap: {},

        _getPossessionData: function () {
            return this.$find('.possessionList').val();
        },

        _getMaterialData: function () {
            return this.$find('.materialList').val();
        },

        _convert: function (data) {
            var hasConvertErr = false;

            var setBlockStrList = data.split(/# /);// 見出しごとに分割
            setBlockStrList.forEach(this.own(function (setBlockStr, setIdx) {
                var lineStrList = setBlockStr.split('\n');// 改行ごとに分割
                var setName = lineStrList[0].slice(2);// セット名

                lineStrList.forEach(this.own(function (lineStr) {
                    // 小見出し「## 」は現在出力に使用しないので何もしない
                    if (/^## /.test(lineStr)) {
                        return;
                    }
                    // 素材行「- 」から素材名と数を取得
                    var tabIdx = lineStr.match(/\t/).index;
                    var materialName = lineStr.slice(2, tabIdx);// 素材名。「- 」の後からtabの間の文字
                    var materialNum = parseInt(lineStr.slice(tabIdx));
                    hasConvertErr = isNaN(materialNum);// 素材名の数値が文字列から数値に変換できたかチェック

                    // 素材がマップに存在しない場合は0をセット
                    if (this._materialMap[setIdx][materialName] == nul) {
                        this._materialMap[materialName] = 0;
                    }
                    this._materialMap[materialName] += materialNum;// 素材数を加算
                }));
            }));

        }
    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);