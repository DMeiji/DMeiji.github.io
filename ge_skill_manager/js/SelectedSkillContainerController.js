(function ($) {
    'use strict';

    /**
	 * 選択スキル表示コンテナコントローラ
	 */
    var selectedSkillContainerController = {

        __name: 'GESkillManager.controller.SelectedSkillContainerController',

        _skillDataMap: null,

        _$skillNameCell: null,
        _$skillLvCell: null,
        // _$activeSkillNameCell: null,
        // _$activeSkillLvCell: null,

        /**
         * 初期化
         * 
         * @param {*} skillDataMap 
         */
        init: function (skillDataMap) {
            this._skillDataMap = skillDataMap;

            this._$skillNameCell = this.$find('.selected-skill-data-row > .skill-name-cell');
            this._$skillLvCell = this.$find('.selected-skill-data-row > .skill-lv-cell');
            // this._$activeSkillNameCell = this.$find('.selected-skill-data-row > .active-skill-name-cell');
            // this._$activeSkillLvCell = this.$find('.selected-skill-data-row > .active-skill-lv-cell');
        },

        /**
         * 表示情報を更新
         * 
         * @param {*} skillDataItems
         */
        updateInfo: function (skillDataItems) {
            var skillMap = {};
            var activeSkillMap = {};

            $.each(skillDataItems, this.own(function (idx, skillDataItem) {
                var item = skillDataItem.get();
                var skillName = item.name;
                if (skillName == null || skillName === '') {
                    // nameがnullまたは空文字列の場合（＝スキル未選択orラベル選択肢を選択）は無視する
                    return;
                }
                var totalSkillLv = this._getTotalSkillLvBySkillDataItem(item);

                if (skillMap[skillName] == null) {
                    skillMap[skillName] = totalSkillLv;
                } else {
                    skillMap[skillName] += totalSkillLv;
                }

                var activeSkillNames = this._getActiveSkillNames(skillName);
                $.each(activeSkillNames.plusSkills, function (idx, plusSkill) {
                    if (activeSkillMap[plusSkill] == null) {
                        activeSkillMap[plusSkill] = totalSkillLv;
                    } else {
                        activeSkillMap[plusSkill] += totalSkillLv;
                    }
                });
                $.each(activeSkillNames.minusSkills, function (idx, minusSkill) {
                    if (activeSkillMap[minusSkill] == null) {
                        activeSkillMap[minusSkill] = -1 * totalSkillLv;
                    } else {
                        activeSkillMap[minusSkill] += (-1 * totalSkillLv);
                    }
                });
            }));

            var resultSkillNm = '';
            var resultSkillLv = '';
            $.each(skillMap, this.own(function (skillNm, skillLv) {
                var skillKanaName = this._skillDataMap[skillNm].kanaName;
                resultSkillNm += '<div>' + skillKanaName + '</div>';
                resultSkillLv += '<div>' + skillLv + '</div>';
            }));
            this._$skillNameCell.empty();
            this._$skillLvCell.empty();
            this._$skillNameCell.append(resultSkillNm);
            this._$skillLvCell.append(resultSkillLv);

            // var resultActiveSkillNm = '';
            // var resultActiveSkillLv = '';
            // $.each(activeSkillMap, this.own(function (activeSkillNm, activeSkillLv) {
            //     var activeSkillKanaName = this._skillDataMap[activeSkillNm].kanaName;
            //     resultActiveSkillNm += '<div>' + activeSkillKanaName + '</div>';
            //     resultActiveSkillLv += '<div>' + activeSkillLv + '</div>';
            // }));
            // this._$activeSkillNameCell.empty();
            // this._$activeSkillLvCell.empty();
            // this._$activeSkillNameCell.append(resultActiveSkillNm);
            // this._$activeSkillLvCell.append(resultActiveSkillLv);
        },

        _getTotalSkillLvBySkillDataItem: function (item) {
            function parseNum(strVal) {
                var result = parseInt(strVal);
                return isNaN(result) ? 0 : result;
            }
            var melee = item.canSetMelee ? parseNum(item.melee) : 0;
            var gun = item.canSetGun ? parseNum(item.gun) : 0;
            var shield = item.canSetShield ? parseNum(item.shield) : 0;
            return melee + gun + shield;
        },

        _getActiveSkillNames: function (skillName) {
            var skillInfo = this._skillDataMap[skillName];

            var plusSkills = skillInfo.plus;
            plusSkills = plusSkills.split('@');

            var minusSkills = skillInfo.minus;
            if (minusSkills === '') {
                minusSkills = [];
            } else {
                minusSkills = minusSkills.split('@');
            }

            return {
                plusSkills: plusSkills,
                minusSkills: minusSkills
            };
        }
    };
    h5.core.expose(selectedSkillContainerController);
})(jQuery);