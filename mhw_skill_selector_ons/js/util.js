(function ($) {
    'use strict';

    var util = {
        convertSlotNumToSlotStr: function (slotNum, convertChar) {
            var slotStr = '';
            for (var i = 0; i < slotNum; i++) {
                slotStr += convertChar;
            }
            return slotStr
        }
    };
    h5.u.obj.expose('MhwSkillSelector.util', util);
})(jQuery);