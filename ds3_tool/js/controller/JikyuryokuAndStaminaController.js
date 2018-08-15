(function ($) {
    'use strict';

    var jikyuryokuAndStaminaController = {

        __name: 'ds3tool.controller.JikyuryokuAndStaminaController',

        init: function () {
            var jikyuryokuAndStaminaData = ds3tool.data.status.jikyuryokuAndStamina;
            this.view.append(this.rootElement, 'jikyuryoku-and-stamina', {
                jikyuryokuList: jikyuryokuAndStaminaData
            });
        }
    };

    h5.core.expose(jikyuryokuAndStaminaController);
})(jQuery);