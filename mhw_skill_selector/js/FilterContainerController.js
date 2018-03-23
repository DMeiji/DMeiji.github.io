(function ($) {
    'use strict';

    /**
	 * フィルタコンテナコントローラ
	 */
    var filterContainerController = {

        __name: 'MhwSkillSelector.controller.FilterContainerController',

        // スロットLvフィルタのマップ
        _checkedSlotFilterMap: {
            lv1Slot: false,
            lv2Slot: false,
            lv3Slot: false
        },
        _checkedSkillsArray: [],// フィルタチェックボックスがONのスキルの配列

        initFilterContainer: function (filterSkillMap) {
            this.view.append('.filterContainerContent', 'SkillFilterTable', {
                filterSkillMap: filterSkillMap
            });
        },

        '.skillFilterCheckbox change': function (context, $el) {
            var skillName = $el.val();
            var checked = $el[0].checked;
            if (/lv[1-3]Slot/.test(skillName)) {
                // スロットLvフィルタをON/OFFにした場合の処理
                this._checkedSlotFilterMap[skillName] = checked;
            } else if (checked) {
                // 対象スキルのチェックがONになった場合は、配列に追加し対象checkboxを内包するラベルにハイライトを付ける
                this._checkedSkillsArray.push(skillName);
            } else {
                // 対象スキルのチェックがOFFになった場合は、配列から除去し対象チェックボックスを内包するラベルのハイライトを消す
                var idx = this._checkedSkillsArray.indexOf(skillName);
                this._checkedSkillsArray.splice(idx, 1);
            }
            this._toggleHighlight($el, checked);
            this._triggerChangeSkillFilter();
        },

        _toggleHighlight: function ($check, isAdd) {
            var $label = $check.parent();
            isAdd ? $label.addClass('skillFilterHighlight') : $label.removeClass('skillFilterHighlight');
        },

        _triggerChangeSkillFilter: function () {
            this.trigger('changeSkillFilter', {
                filterSlot: this._checkedSlotFilterMap,
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

        '.narrowFilterContainerButton click': function () {
            this.trigger('narrowFilterContainer');
        }
    };
    h5.core.expose(filterContainerController);
})(jQuery);