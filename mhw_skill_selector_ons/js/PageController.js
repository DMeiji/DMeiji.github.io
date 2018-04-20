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

        '{rootElement} copySelectedArmorInfo': function (context) {
            var infoStr = context.evArg.infoStr;
            infoStr += '\n' + this._resultContainerController.getActiveInfoStr();

            // コピー用のtextareaを作成してDOM追加
            var textarea = '<textarea style="position:absolute;left:-1px;height:1px;width:1px;overflow:hidden;"></textarea>';
            var $textarea = $(textarea);
            $(this.rootElement).append($textarea);

            $textarea.text(infoStr);// コピー用textareaにコピー文字列を入れる
            $textarea[0].select();// textarea内の文字列を選択
            document.execCommand('copy');// 選択範囲をクリップボードにコピー
            $textarea.remove();// textareaを除去
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);