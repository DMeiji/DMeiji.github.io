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
        
        _getPossessionData: function() {
            return this.$find('.possessionList').val();
        },
        
        _getMaterialData: function() {
            return this.$find('.materialList').val();
        },
        
        _iter: function(data) {
            // ```
            // # hoge
            // ## xxx
            // - a 5
            // - b 4
            // - c 2
            // ## yyy
            // - a 3
            // - d 2
            // - e 4
            
            // # fuga
            // ## xxx
            // - a 5
            // - b 4
            // - c 2
            // ## yyy
            // - a 3
            // - d 2
            // - e 4
            // ```
            // 解釈の順
            // 「#」見出しでsplit
            // 「##」小見出しでsplit
            // 改行コードでsplit
            // 「- 」
            // 「-」子でsplit
            var headlineList = data.split(/# /);// 見出しごとに分割
            headLineList.forEach(this.own(function(headLineStr) {
                var subheadingList = headLineStr.split(/## /);// 小見出しごとに分割
                subheadingList.forEach(this.own(function() {
                    var lineList = data.split(/\n/);// 各要素が1行の文字列である配列
                    lineList.forEach(this.own(function(lineStr, idx){
        
                    }));
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