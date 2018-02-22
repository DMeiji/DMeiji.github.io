(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'MhwSkillBuildExpectation.controller.PageController',

        __templates: ['./ejs/index.ejs'],

        _logic: MhwSkillBuildExpectation.logic.PageLogic,

        _skillContainerController: MhwSkillBuildExpectation.controller.SkillContainerController,
        _chartContainerController: MhwSkillBuildExpectation.controller.ChartContainerController,
        _operationContainerController: MhwSkillBuildExpectation.controller.OperationContainerController,

        __meta: {
            _skillContainerController: {
                rootElement: '.skillContainer'
            },
            _chartContainerController: {
                rootElement: '.chartContainer'
            },
            _operationContainerController: {
                rootElement: '.operationContainer'
            }
        },

        _skillEffectData: null,

        __init: function () {
            return this._logic.getSkillEffectData().done(this.own(function (skillEffectData) {
                this._skillEffectData = skillEffectData;
            }));
        },

        __ready: function () {
            this._skillContainerController.init(this._skillEffectData);

            var selectedSkillsInfo = this._skillContainerController.getSelectedSkillsInfo();
            var chartData = this._logic.convertSkillsInfoToChartData(selectedSkillsInfo, this._skillEffectData);
            this._chartContainerController.init(chartData);

            var skillsStr = this._logic.convertSkillsInfoToSkillsStr(selectedSkillsInfo);
            this._operationContainerController.init(skillsStr);
        },

        '{rootElement} changeSelectedSkill': function (context) {
            var skillsInfo = context.evArg.skillsInfo;// 選択されたスキル情報
            var chartData = this._logic.convertSkillsInfoToChartData(skillsInfo, this._skillEffectData);// スキル情報をチャートデータに変換
            this._chartContainerController.updateChartLine(chartData, 0);// チャート更新
            var skillsStr = this._logic.convertSkillsInfoToSkillsStr(skillsInfo);// スキル情報をスキル構成文字列に変換 
            this._operationContainerController.updateEditingLineInfoRow(skillsStr);// 編集中のチャートのスキル構成情報を更新
        },

        '{rootElement} addChartLine': function () {
            var selectedSkillsInfo = this._skillContainerController.getSelectedSkillsInfo();// 選択されたスキル情報を取得
            var chartData = this._logic.convertSkillsInfoToChartData(selectedSkillsInfo, this._skillEffectData);// スキル情報をチャートデータに変換
            var buildName = this._chartContainerController.appendChartLine(chartData);// チャートにLineを追加
            var skillsStr = this._logic.convertSkillsInfoToSkillsStr(selectedSkillsInfo);// スキル情報をスキル構成文字列に変換 
            this._operationContainerController.appendLineInfoRow(buildName, skillsStr);// チャートのスキル構成情報を追加
        },

        '{rootElement} removeChartLine': function (context) {
            var rowIdx = context.evArg.rowIdx;// 削除ボタンを内包するtr要素のindex
            this._chartContainerController.removeChartLine(rowIdx);// 対象のLineを削除。trのindexとチャートのdatasetsのindexは一致する
        },

        '{rootElement} skillClear': function () {
            this._skillContainerController.clear();
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);