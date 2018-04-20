(function ($) {
    'use strict';

    // 剣士汎用スキル
    var universalSwordsmanSkills = [
        'kougeki',// 攻撃
        'mikiri',// 見切
        'jakuten',// 弱点特効
        'konsin',// 渾身
        'tyousensya',// 挑戦者
        'hurutya-ji',// ﾌﾙﾁｬｰｼﾞ
        'tyoukaisin',// 超会心
        'takumi',// 匠
        'mimisen'// 耳栓
    ];

    // 弓汎用スキル
    var universalBowmanSkills = [
        'kougeki',// 攻撃
        'mikiri',// 見切
        'jakuten',// 弱点特効
        'tyousensya',// 挑戦者
        'hurutya-ji',// ﾌﾙﾁｬｰｼﾞ
        'tyoukaisin',// 超会心
        'mimisen',// 耳栓
        'taijutu',// 体術
        'sutaminakaihuku',// スタミナ急速回復
        'tuujoudankyouka',// 通常弾強化
        'kantuukyouka',// 貫通弾強化
        'sandankyouka',// 散弾強化
        'tokusyusyageki',// 特殊射撃強化
    ];

    // 盾斧汎用スキル
    var universalChargeAxSkills = [
        'houjutu',// 砲術
        'houdansoutensuu'// 砲弾装填数UP
    ];

    // 回性・回距
    var kaiseiKaikyoSkills = [
        'kaihiseinou',
        'kaihikyori'
    ];

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
            this._checkedSlotFilterMap.lv1Slot = false;
            this._checkedSlotFilterMap.lv2Slot = false;
            this._checkedSlotFilterMap.lv3Slot = false;
            this.$find('.skillFilterCheckbox:checked').prop('checked', false);
            this.$find('.skillFilterHighlight').removeClass('skillFilterHighlight');
            this.trigger('clearSkillFilter');
        },

        /**
         * 剣士汎用スキルONボタン
         */
        '.universalSwordsmanSkillButton click': function () {
            this._checkOnSkills(universalSwordsmanSkills);
        },

        /**
         * 弓汎用スキルONボタン
         */
        '.universalBowmanSkillButton click': function () {
            this._checkOnSkills(universalBowmanSkills);
        },

        /**
         * 盾斧汎用スキルONボタン
         */
        '.universalChargeAxSkillButton click': function () {
            this._checkOnSkills(universalChargeAxSkills);
        },

        /**
         * 回性・回距スキルONボタン
         */
        '.kaiseiKaikyoSkillButton click': function () {
            this._checkOnSkills(kaiseiKaikyoSkills);
        },

        _checkOnSkills: function (skills) {
            $.each(skills, this.own(function (idx, skillName) {
                if (this._checkedSkillsArray.indexOf(skillName) === -1) {
                    // 対象スキルが未選択状態ならば選択状態に変える
                    this._checkOnSkillFilterCb(skillName);
                }
            }));
            this._triggerChangeSkillFilter();
        },

        _checkOnSkillFilterCb: function (skillName) {
            this._checkedSkillsArray.push(skillName);
            var $e = this._getSkillFilterCbElem(skillName);
            $e.prop('checked', true);
            this._toggleHighlight($e, true);
        },

        _getSkillFilterCbElem: function (skillName) {
            return this.$find('.skillFilterCheckbox[value="' + skillName + '"]');
        },

        '.singleSkillCheckOnButton click': function (context, $el) {
            var skillName = $el.data('skillName');
            this._checkOnSkills([skillName]);
        }
    };
    h5.core.expose(filterContainerController);
})(jQuery);