(function ($) {
    'use strict';

    /**
	 * フィルタコンテナコントローラ
	 */
    var filterContainerController = {

        __name: 'MhwSkillSelector.controller.FilterContainerController',

        _checkedSkillsArray: [],// フィルタチェックボックスがONのスキルの配列

        initFilterContainer: function (filterSkillMap) {
            this.view.append('.filterContainerContent', 'SkillFilterTable', {
                filterSkillMap: filterSkillMap
            });
        },

        '.skillFilterCheckbox change': function (context, $el) {
            var skillName = $el.val();
            var checked = $el[0].checked;
            if (checked) {
                // 対象スキルのチェックがONになった場合は、配列に追加
                this._checkedSkillsArray.push(skillName);
            } else {
                // 対象スキルのチェックがOFFになった場合は、配列から除去
                var idx = this._checkedSkillsArray.indexOf(skillName);
                this._checkedSkillsArray.splice(idx, 1);
            }
            this._triggerChangeSkillFilter();
        },

        _triggerChangeSkillFilter: function () {
            this.trigger('changeSkillFilter', {
                filterSkills: this._checkedSkillsArray
            });
        },

        '.filterClearButton click': function () {
            this._clearFilter();
        },

        _clearFilter: function () {
            this._checkedSkillsArray = [];
            this.$find('.skillFilterCheckbox:checked').prop('checked', false);
            this.trigger('clearSkillFilter');
        }
    };
    h5.core.expose(filterContainerController);
})(jQuery);