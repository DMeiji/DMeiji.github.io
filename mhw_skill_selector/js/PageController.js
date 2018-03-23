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

        _$armorAndResultRootContainer: null,
        _$armorAndResultContainerWrapper: null,
        _$filterContainerContent: null,

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
            this._armorContainerController.setupArmorList(this._skillNameMap, this._armorData);
            this._resultContainerController.initActiveSkillList(this._skillNameMap);
            this._filterContainerController.initFilterContainer(this._filterSkillMap);

            this._$armorAndResultRootContainer = this.$find('.armorAndResultRootContainer');
            this._$armorAndResultContainerWrapper = this.$find('.armorAndResultContainerWrapper');
            this._$filterContainerContent = this.$find('.filterContainerContent');
        },

        '{rootElement} updateResult': function (context) {
            this._resultContainerController.updateResult(context.evArg.selectedArmorInfo);
        },

        '{rootElement} changeSkillFilter': function (context) {
            var evArg = context.evArg;
            this._armorContainerController.rebuildArmorList(evArg.filterSlot, evArg.filterSkills);
        },

        '{rootElement} clearSkillFilter': function () {
            this._armorContainerController.initArmorList();
        },

        /**
         * フィルタコンテナを拡げる
         */
        '{rootElement} spreadFilterContainer': function () {
            this._restoreFilterContainer();
            this._$armorAndResultContainerWrapper.addClass('hidden');
        },

        /**
         * フィルタコンテナをもとのサイズに戻す
         */
        '{rootElement} restoreFilterContainer': function () {
            this._restoreFilterContainer();
        },

        /**
         * フィルタコンテナを狭める
         */
        '{rootElement} narrowFilterContainer': function () {
            this._restoreFilterContainer();
            this._$armorAndResultRootContainer.addClass('spreadContainer');
        },

        _restoreFilterContainer: function () {
            this._$armorAndResultContainerWrapper.removeClass('hidden');
            this._$armorAndResultRootContainer.removeClass('spreadContainer');
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);