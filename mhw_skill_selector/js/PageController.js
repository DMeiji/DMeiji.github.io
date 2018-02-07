(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'MhwSkillSelector.controller.PageController',

        __templates: ['./ejs/index.ejs'],

        _logic: MhwSkillSelector.logic.PageLogic,

        _armorContainerController: MhwSkillSelector.controller.ArmorContainerController,
        _resultContainerController: MhwSkillSelector.controller.ResultContainerController,
        _filterContainerController: MhwSkillSelector.controller.FilterContainerController,

        __meta: {
            _armorContainerController: {
                rootElement: '.armorRootContainer'
            },
            _resultContainerController: {
                rootElement: '.resultRootContainer'
            },
            _filterContainerController: {
                rootElement: '.filterRootContainer'
            }
        },

        _skillNameMap: null,// スキル名マップ（例:kougeki=>攻撃）
        _armorData: null,// 防具の元データ(csvからコンバート後)

        __init: function () {
            var dfd = h5.async.deferred();

            this._logic.getSkillNameMapData().done(this.own(function (skillNameMap) {
                this._skillNameMap = skillNameMap;
                var armorDataPromise = this._logic.getArmorData().done(this.own(function (armorCSVStr) {
                    this._armorData = this._logic.convertArmorCSVToArmorData(armorCSVStr, skillNameMap);
                }));
                var filterSkillMapPromise = this._logic.getFilterSkillMapData().done(this.own(function (filterSkillMap) {
                    this._filterSkillMap = filterSkillMap;
                }));
                $.when(armorDataPromise, filterSkillMapPromise).done(function () {
                    dfd.resolve();
                })
            }));

            return dfd.promise();
        },

        __ready: function () {
            this._armorContainerController.initArmorList(this._skillNameMap, this._armorData);
            this._resultContainerController.initActiveSkillList(this._skillNameMap);
            this._filterContainerController.initFilterContainer(this._filterSkillMap);
        },

        '{rootElement} updateResult': function (context) {
            this._resultContainerController.updateResult(context.evArg.selectedArmorInfo);
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);