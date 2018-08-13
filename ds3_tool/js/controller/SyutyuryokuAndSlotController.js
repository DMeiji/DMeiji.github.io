(function ($) {
    'use strict';

    var syutyuryokuAndSlotController = {

        __name: 'ds3tool.controller.SyutyuryokuAndSlotController',

        init: function () {
            var syutyuryokuAndSlot = ds3tool.data.syutyuryokuAndSlot;
            this.view.append(this.rootElement, 'syutyuryoku-and-slot', {
                syutyuryokuAndSlotList: syutyuryokuAndSlot
            });
        }
    };

    h5.core.expose(syutyuryokuAndSlotController);
})(jQuery);