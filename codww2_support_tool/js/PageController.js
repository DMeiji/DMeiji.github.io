(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'CoDWW2.controller.PageController',

        __templates: ['./ejs/index.ejs'],

        _infoContainerController: CoDWW2.controller.DictionaryContainerController,
        _toolContainerController: CoDWW2.controller.ToolContainerController,

        __meta: {
            _infoContainerController: {
                rootElement: '.dictionaryRootContainer'
            },
            _toolContainerController: {
                rootElement: '.toolRootContainer'
            }
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);