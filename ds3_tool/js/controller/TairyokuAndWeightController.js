(function ($) {
    'use strict';

    var tairyokuAndWeightController = {

        __name: 'ds3tool.controller.TairyokuAndWeightController',

        init: function () {
            var tairyokuAndWeightData = ds3tool.data.status.tairyokuAndWeight;
            this.view.append(this.rootElement, 'tairyoku-and-weight', {
                tairyokuList: tairyokuAndWeightData
            });
        }
    };

    h5.core.expose(tairyokuAndWeightController);
})(jQuery);