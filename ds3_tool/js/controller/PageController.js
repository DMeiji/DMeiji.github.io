(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'ds3tool.controller.PageController',

        _sujoAndStatusController: ds3tool.controller.SujoAndStatusController,
        _seimeiryokuAndHPController: ds3tool.controller.SeimeiryokuAndHPController,
        _jikyuryokuAndStaminaController: ds3tool.controller.JikyuryokuAndStaminaController,
        _tairyokuAndWeightController: ds3tool.controller.TairyokuAndWeightController,
        _syutyuryokuAndFPController: ds3tool.controller.SyutyuryokuAndFPController,
        _syutyuryokuAndSlotController: ds3tool.controller.SyutyuryokuAndSlotController,

        __meta: {
            _sujoAndStatusController: {
                rootElement: '#sujou-and-status'
            },
            _seimeiryokuAndHPController: {
                rootElement: '#seimeiryoku-and-hp'
            },
            _jikyuryokuAndStaminaController: {
                rootElement: '#jikyuryoku-and-stamina'
            },
            _tairyokuAndWeightController: {
                rootElement: '#tairyoku-and-weight'
            },
            _syutyuryokuAndFPController: {
                rootElement: '#syutyuryoku-and-fp'
            },
            _syutyuryokuAndSlotController: {
                rootElement: '#syutyuryoku-and-slot'
            }
        },

        __templates: ['tmpl/index.ejs'],

        __init: function () {
            this.view.append(this.rootElement, 'root-container');// 画面の大枠をejsで生成
        },

        __ready: function () {
            // 「素性と要求値」を初期化
            this._sujoAndStatusController.init();
            // 「生命力とHP」を初期化
            this._seimeiryokuAndHPController.init();
            // 「持久とスタミナ」を初期化
            this._jikyuryokuAndStaminaController.init();
            // 「体力と装備重量」を初期化
            this._tairyokuAndWeightController.init();
            // 「集中力とFP」を初期化
            this._syutyuryokuAndFPController.init();
            // 「集中力と記憶スロット」を初期化
            this._syutyuryokuAndSlotController.init();
        }
    };

    $(function () {
        // MEMO
        // デバッグ時に開発者ツールからコントローラへのアクセスを容易にするために
        // グローバルスコープにコントローラを公開している
        // 開発終了前に修正すること
        window.c = h5.core.controller('.root-container', pageController);
        // h5.core.controller('body', pageController);
    });
})(jQuery); 