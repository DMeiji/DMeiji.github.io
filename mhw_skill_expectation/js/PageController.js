(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'MhwSkillExpectation.controller.PageController',

        __templates: ['./ejs/index.ejs'],

        _logic: MhwSkillExpectation.logic.PageLogic,

        _skillContainerController: MhwSkillExpectation.controller.SkillContainerController,
        _chartContainerController: MhwSkillExpectation.controller.ChartContainerController,
        _tableController: MhwSkillExpectation.controller.ExpectationTableContainerController,

        __meta: {
            _skillContainerController: {
                rootElement: '.skillContainer'
            },
            _chartContainerController: {
                rootElement: '.chartContainer'
            },
            _tableController: {
                rootElement: '.expectationTableContainer'
            }
        },

        _chart: null,

        __init: function () {
            return this._logic.getExpectationData().done(this.own(function (expectationData) {
                this._expectationData = expectationData;
            }));
        },

        __ready: function () {
            this._skillContainerController.init(this._expectationData);
            var chartData = this._logic.convertExpectationDataToChartData(this._expectationData);
            this._chartContainerController.init(chartData);
            this._chartContainerController.updateChart(this._skillContainerController.getSelectedSkills());
            this._tableController.init(this._expectationData);
        },

        '{rootElement} changeSelectedSkill': function (context) {
            var selectedSkills = context.evArg.selectedSkills;
            this._chartContainerController.updateChart(selectedSkills);
        },

        '.clearButton click': function () {
            this._skillContainerController.clear();
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);