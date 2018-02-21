(function ($) {
    'use strict';

    var consts = MhwSkillExpectation.consts;

    /**
	 * スキルコンテナコントローラ
	 */
    var skillContainerController = {

        __name: 'MhwSkillExpectation.controller.SkillContainerController',

        init: function (expectationData) {
            this.view.append(this.rootElement, 'SkillContainer', {
                expectationData: expectationData,
                skillNameMap: consts.SKILL_NAME_MAP
            });
            this._initSelectedSkill();
        },

        _initSelectedSkill: function () {
            this.$find('input[type="checkbox"][data-skill-name="konsin"]:eq(2)').prop('checked', true);// 渾身Lv3 ON
            this.$find('input[type="checkbox"][data-skill-name="tuugeki"]:eq(2)').prop('checked', true);// 痛撃Lv3 ON
            this.$find('input[type="checkbox"][data-skill-name="tyoukai"]:eq(2)').prop('checked', true);// 超会心Lv3 ON
            this.$find('input[type="checkbox"][data-skill-name="kougeki"]:eq(3)').prop('checked', true);// 攻撃Lv4 ON
            this.$find('input[type="checkbox"][data-skill-name="hurutya"]:eq(2)').prop('checked', true);// ﾌﾙﾁｬｰｼﾞLv3 ON
            this.$find('input[type="checkbox"][data-skill-name="tyousen"]:eq(1)').prop('checked', true);// 挑戦者Lv2 ON
        },

        _triggerChangeSelectedSkill: function () {
            var selectedSkills = this.getSelectedSkills();
            this.trigger('changeSelectedSkill', {
                selectedSkills: selectedSkills
            });
        },

        '.skillLvCb change': function () {
            this._triggerChangeSelectedSkill();
        },

        getSelectedSkills: function () {
            var $checked = this._getCheckedSkillLvCb();
            return $.map($checked, function (cb) {
                var $cb = $(cb);
                return $cb.data('skillName') + $cb.val();
            });
        },

        _getCheckedSkillLvCb: function () {
            return this.$find('.skillLvCb:checked');
        },

        clear: function () {
            this._getCheckedSkillLvCb().prop('checked', false);
            this._triggerChangeSelectedSkill();
        }
    };
    h5.core.expose(skillContainerController);
})(jQuery);