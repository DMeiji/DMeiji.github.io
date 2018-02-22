(function ($) {
    'use strict';

    var consts = MhwSkillExpectation.consts;
    var skillNameMap = consts.SKILL_NAME_MAP;

    /**
	 * 期待値テーブルコンテナコントローラ
	 */
    var expectationTableContainerController = {

        __name: 'MhwSkillExpectation.controller.ExpectationTableContainerController',

        _expectationData: null,

        init: function (expectationData) {
            this._expectationData = expectationData;
        },

        '.showExpectationTableButton click': function (context, $el) {
            this.view.append('.skillsTableWrapper', 'ExpectationTableContainer', {
                expectationData: this._expectationData,
                skillNameMap: skillNameMap
            });
            this._toggleExpectationTableButton();
        },

        '.hideExpectationTableButton click': function (context, $el) {
            this.$find('.skillsTableWrapper').empty();
            this._toggleExpectationTableButton();
        },

        _toggleExpectationTableButton: function () {
            this.$find('.showExpectationTableButton').toggleClass('hide');
            this.$find('.hideExpectationTableButton').toggleClass('hide');
        }
    };
    h5.core.expose(expectationTableContainerController);
})(jQuery);