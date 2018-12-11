(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'GESkillManager.controller.PageController',

        __templates: ['./ejs/index.ejs'],

        _logic: GESkillManager.logic.PageLogic,

        _selectSkillContainerController: GESkillManager.controller.SelectSkillContainerController,
        _selectedSkillContainerController: GESkillManager.controller.SelectedSkillContainerController,

        __meta: {
            _selectSkillContainerController: {
                rootElement: '.select-skill-container'
            },
            _selectedSkillContainerController: {
                rootElement: '.selected-skill-container'
            }
        },

        _skillDataArray: null,
        _skillDataMap: null,

        __init: function () {
            return this._logic.getSkillData().done(this.own(function (csvSkillData) {
                this._skillDataArray = this._logic.convertCsvSkillDataToArray(csvSkillData);
                this._skillDataMap = this._logic.convertCsvSkillDataToMap(csvSkillData);
            }));
        },

        __ready: function () {
            this._selectSkillContainerController.init(this._skillDataArray, this._skillDataMap);
            this._selectedSkillContainerController.init(this._skillDataMap);
        },

        '{rootElement} updateSkillDataItem': function(context) {
            var skillDataItems = context.evArg.skillDataItems;
            this._selectedSkillContainerController.updateInfo(skillDataItems);
        }
    };

    $(function () {
        // FIXME デバッグ用にグローバル変数に格納
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);