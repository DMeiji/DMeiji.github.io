(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'ds3tool.controller.PageController',

        _sujoAndStatusController: ds3tool.controller.SujoAndStatusController,

        __meta: {
            _sujoAndStatusController: {
                rootElement: '#sujou-and-status'
            }
        },

        __templates: ['tmpl/index.ejs'],

        __init: function () {
            this.view.append(this.rootElement, 'root-container');// 画面の大枠をejsで生成
        },

        // _manageChildController: function (selector, controllerDef) {
        //     var controller = h5.core.controller(selector, controllerDef);
        //     this.manageChild(controller);
        //     return controller;
        // },

        __ready: function () {
            // 「素性と要求値」を初期化
            this._sujoAndStatusController.init();

            // 「持久とスタミナ」を初期化
            // this._inputCheckJokenController.init();
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