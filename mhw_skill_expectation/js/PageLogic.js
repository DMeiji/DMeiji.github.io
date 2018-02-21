(function ($) {
    'use strict';

    var consts = MhwSkillExpectation.consts;
    var skillNameMap = consts.SKILL_NAME_MAP;
    var skillColorMap = consts.SKILL_COLOR_MAP;

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'MhwSkillExpectation.logic.PageLogic',

        getExpectationData: function () {
            return h5.ajax('./data/skillExpectation.json');
        },

        convertExpectationDataToChartData: function (expectationData) {
            var result = {};
            $.each(expectationData, function (skillName, skillData) {
                $.each(skillData, function (lv, expectationAry) {
                    var key = skillName + lv;
                    result[key] = {
                        label: skillNameMap[skillName] + lv,
                        backgroundColor: skillColorMap[skillName],
                        borderColor: skillColorMap[skillName],
                        data: expectationAry,
                        fill: false
                    };
                });
            });
            return result;
        }
    };

    h5.core.expose(pageLogic);
})(jQuery);