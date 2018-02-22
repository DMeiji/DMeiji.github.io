(function ($) {
    'use strict';

    var consts = MhwSkillBuildExpectation.consts;

    /**
	 * スキルコンテナコントローラ
	 */
    var skillContainerController = {

        __name: 'MhwSkillBuildExpectation.controller.SkillContainerController',

        init: function (skillData) {
            this.view.append(this.rootElement, 'SkillContainer', {
                skillData: skillData,
                skillNameMap: consts.SKILL_NAME_MAP
            });
            this._initSelectedSkill();
        },

        _initSelectedSkill: function () {
            this._selectSkillRb('input[type="radio"][data-skill-name="konsin"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="tuugeki"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="tyoukai"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="kougeki"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="mikiri"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="hurutya"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="tyousen"]:eq(0)');
            this._selectSkillRb('input[type="radio"][data-skill-name="muzokusei"]:eq(0)');
        },

        _selectSkillRb: function (selector) {
            var $rb = this.$find(selector);
            $rb.prop('checked', true);
            this._toggleHighlight($rb, true);
        },

        _toggleHighlight: function ($rb, isAdd) {
            // 選択したスキルで既にハイライトが当たっている場合はハイライトを外す
            var $skillRbContainer = $rb.parents('.skillRbContainer');
            $skillRbContainer.find('.skillHighlight').removeClass('skillHighlight');

            var $label = $rb.parent();
            isAdd ? $label.addClass('skillHighlight') : $label.removeClass('skillHighlight');
        },

        '.skillLvRb change': function (context, $el) {
            this._toggleHighlight($el, $el[0].checked);
            this._triggerChangeSelectedSkill();
        },

        _triggerChangeSelectedSkill: function () {
            var selectedSkillsInfo = this.getSelectedSkillsInfo();
            this.trigger('changeSelectedSkill', {
                skillsInfo: selectedSkillsInfo
            });
        },

        getSelectedSkillsInfo: function () {
            var $checked = this._getCheckedskillLvRb();
            return $.map($checked, function (cb) {
                var $cb = $(cb);
                return $cb.data('skillName') + $cb.val();
            });
        },

        _getCheckedskillLvRb: function () {
            return this.$find('.skillLvRb:checked');
        },

        clear: function () {
            this._initSelectedSkill();
            this._triggerChangeSelectedSkill();
        }
    };
    h5.core.expose(skillContainerController);
})(jQuery);