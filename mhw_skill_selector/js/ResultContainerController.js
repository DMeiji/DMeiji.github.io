(function ($) {
    'use strict';

    /**
	 * 結果コンテナコントローラ
	 */
    var resultContainerController = {

        __name: 'MhwSkillSelector.controller.ResultContainerController',

        _skillNameMap: null,// スキル名マップ
        _activeSkillList: null,// 発動スキルのリスト。obsAry

        initActiveSkillList: function (skillNameMap) {
            this._skillNameMap = skillNameMap;
            this._activeSkillList = h5.core.data.createObservableArray();
            this.view.bind('.activeSkillTable', {
                activeSkillList: this._activeSkillList
            });
        },

        updateResult: function (selectedArmorInfo) {
            var activeSkillList = this._calcActiveSkillList(selectedArmorInfo);
            this._activeSkillList.copyFrom(activeSkillList);
        },

        _calcActiveSkillList: function (selectedArmorInfo) {
            var temp = {};
            $.each(selectedArmorInfo, function (part, armorInfo) {
                if (armorInfo == null) {
                    // 防具が未選択の部位の場合は何もしない
                    return;
                }
                var firstSkillName = armorInfo.firstSkillName;
                if (firstSkillName === '') {
                    // 第1スキルが空文字の場合は第2スキルも存在しないので何もしない
                    return;
                }
                var firstSkillVal = armorInfo.firstSkillVal;
                temp[firstSkillName] = temp[firstSkillName] == null ? firstSkillVal : temp[firstSkillName] + firstSkillVal;
                var secondSkillName = armorInfo.secondSkillName;
                if (secondSkillName === '') {
                    return;
                }
                var secondSkillVal = armorInfo.secondSkillVal;
                temp[secondSkillName] = temp[secondSkillName] == null ? secondSkillVal : temp[secondSkillName] + secondSkillVal;
            });
            var result = [];
            $.each(temp, this.own(function (skillName, skillVal) {
                result.push({
                    skillName: this._skillNameMap[skillName],
                    skillVal: skillVal
                });
            }));
            return result;
        }
    };
    h5.core.expose(resultContainerController);
})(jQuery);