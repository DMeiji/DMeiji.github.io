(function ($) {
    'use strict';

    var syutyuryokuAndFPController = {

        __name: 'ds3tool.controller.SyutyuryokuAndFPController',

        init: function () {
            var syutyuryokuAndFP = ds3tool.data.syutyuryokuAndFP;
            this.view.append(this.rootElement, 'syutyuryoku-and-fp', {
                syutyuryokuAndFPList: syutyuryokuAndFP
            });
        }
    };

    h5.core.expose(syutyuryokuAndFPController);
})(jQuery);