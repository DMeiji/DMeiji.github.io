(function ($) {
    'use strict';

    var seimeiryokuAndHPController = {

        __name: 'ds3tool.controller.SeimeiryokuAndHPController',

        init: function () {
            var seimeiryokuAndHPData = ds3tool.data.status.seimeiryokuAndHP;
            this.view.append(this.rootElement, 'seimeiryoku-and-hp', {
                seimeiryokuAndHPList: seimeiryokuAndHPData
            });
        }
    };

    h5.core.expose(seimeiryokuAndHPController);
})(jQuery);