(function ($) {
    'use strict';

    var consts = MhwSkillExpectation.consts;
    var skillNameMap = consts.SKILL_NAME_MAP;

    /**
	 * 期待値テーブルコンテナコントローラ
	 */
    var expectationTableContainerController = {

        __name: 'MhwSkillExpectation.controller.ExpectationTableContainerController',

        init: function (expectationData) {
            this.view.append(this.rootElement, 'ExpectationTableContainer', {
                expectationData: expectationData,
                skillNameMap: skillNameMap
            });
        }
    };
    h5.core.expose(expectationTableContainerController);
})(jQuery);