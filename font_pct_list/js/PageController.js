(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'sandbox.fontSample.PageController',

        __templates: ['tmpl/index.ejs'],

        __ready: function () {
            // this._appendFontExampleContainer('', '');
            this._appendFontExampleContainer('meiryo', 'メイリオ', 'meiryo.png');
            this._appendFontExampleContainer('corpmarugo_v1', 'コーポレート・ロゴ丸', 'corpmarugo_v1.png');
            this._appendFontExampleContainer('font_1_ant-maru', 'ほのかアンティーク丸', 'font_1_ant-maru.png');
            this._appendFontExampleContainer('NikumaruFont', 'にくまるフォント', 'NikumaruFont.png');
            this._appendFontExampleContainer('OthutomeFont_Ver2', 'おつとめフォント', 'OthutomeFont_Ver2.png');
            this._appendFontExampleContainer('CHIKARA-YOWAKU_002', '851チカラヨワク', 'CHIKARA-YOWAKU_002.png');
            this._appendFontExampleContainer('mushin', '無心', 'mushin.png');
            this._appendFontExampleContainer('tihaya_kado', 'ちはや角', 'tihaya_kado.png');
            this._appendFontExampleContainer('SoukouMincho', '装甲明朝', 'SoukouMincho.png');
            this._appendFontExampleContainer('genkai-mincho', '源界明朝', 'genkai-mincho.png');
            this._appendFontExampleContainer('onryou', '怨霊フォント', 'onryou.png');
        },

        _appendFontExampleContainer: function (fontName, fontNameKana, src) {
            this.view.append('.root-container', 'font-sample', {
                fontName: fontName,
                fontNameKana: fontNameKana,
                src: 'pcts/' + src
            });
        }
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