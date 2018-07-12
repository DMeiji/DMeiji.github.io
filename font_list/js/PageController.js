(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'sandbox.fontSample.PageController',

        __templates: ['tmpl/index.ejs'],

        // _indicator: null,

        __ready: function () {
            // this._indicator = this.indicator({
            //     message: 'Webフォントをロード中...'
            // }).show();

            // this._appendFontExampleContainer('', '');
            this._appendFontExampleContainer('meiryo', 'メイリオ');
            this._appendFontExampleContainer('corpmarugo_v1', 'コーポレート・ロゴ丸');
            this._appendFontExampleContainer('font_1_ant-maru', 'ほのかアンティーク丸');
            this._appendFontExampleContainer('OthutomeFont_Ver2', 'おつとめフォント');
            this._appendFontExampleContainer('CHIKARA-YOWAKU_002', '851チカラヨワク');
            this._appendFontExampleContainer('mushin', '無心');
            this._appendFontExampleContainer('tihaya_kado', 'ちはや角');
            this._appendFontExampleContainer('SoukouMincho', '装甲明朝');
            this._appendFontExampleContainer('genkai-mincho', '源界明朝');
            this._appendFontExampleContainer('onryou', '怨霊フォント');
        },

        _appendFontExampleContainer: function (fontFamily, fontName) {
            this.view.append('.root-container', 'font-sample', {
                fontFamily: fontFamily,
                fontName: fontName
            });
        },

        // '{rootElement} loadFontCompleted': function () {
        //     this._indicator.hide();
        // }
    };

    $(function () {
        // MEMO
        // デバッグ時に開発者ツールからコントローラへのアクセスを容易にするために
        // グローバルスコープにコントローラを公開している
        // 開発終了前に修正すること
        window.c = h5.core.controller('body', pageController);
        // h5.core.controller('body', pageController);
    });

})(jQuery);