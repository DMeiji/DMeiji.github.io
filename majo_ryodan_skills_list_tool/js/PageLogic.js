(function ($) {
    'use strict';

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'MajoryodanSkillList.logic.PageLogic',

        getSkillsData: function() {
            return h5.ajax('./csv/skills.csv')
        }
    };

    h5.core.expose(pageLogic);

})(jQuery);