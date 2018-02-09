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
                // 対象スキルのチェックがONになった場合は、配列に追加し対象checkboxを内包するラベルにハイライトを付ける
                this._checkedSkillsArray.push(skillName);
                this._toggleHighlight($el, true);
            } else {
                // 対象スキルのチェックがOFFになった場合は、配列から除去し対象チェックボックスを内包するラベルのハイライトを消す
                var idx = this._checkedSkillsArray.indexOf(skillName);
                this._checkedSkillsArray.splice(idx, 1);
                this._toggleHighlight($el, false);
            }
            this._triggerChangeSkillFilter();
        },

        _toggleHighlight: function ($check, isAdd) {
            var $label = $check.parent();
            isAdd ? $label.addClass('skillFilterHighlight') : $label.removeClass('skillFilterHighlight');
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
            this.$find('.skillFilterHighlight').removeClass('skillFilterHighlight');
            this.trigger('clearSkillFilter');
        },

        '.spreadFilterContainerButton click': function () {
            this.trigger('spreadFilterContainer');
        },

        '.restoreFilterContainerButton click': function () {
            this.trigger('restoreFilterContainer');
        },

        '.narrowFilterContainerButton click': function() {
            this.trigger('narrowFilterContainer');
        }
    };
    h5.core.expose(filterContainerController);
})(jQuery);