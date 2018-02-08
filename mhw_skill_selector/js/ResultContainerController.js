(function ($) {
    'use strict';

    var util = MhwSkillSelector.util;

    /**
	 * 結果コンテナコントローラ
	 */
    var resultContainerController = {

        __name: 'MhwSkillSelector.controller.ResultContainerController',

        _skillNameMap: null,// スキル名マップ
        _activeSkillList: null,// 発動スキルのリスト。obsAry
        _totalSlotInfo: null,

        initActiveSkillList: function (skillNameMap) {
            this._skillNameMap = skillNameMap;
            this._activeSkillList = h5.core.data.createObservableArray();
            this._totalSlotInfo = h5.core.data.createObservableArray();
            this.view.bind('.resultContainerContent', {
                activeSkillList: this._activeSkillList,
                totalSlotInfo: this._totalSlotInfo
            });
        },

        updateResult: function (selectedArmorInfo) {
            var calcResult = this._calcActiveSkillList(selectedArmorInfo);
            this._activeSkillList.copyFrom(calcResult.activeSkillList);
            this._totalSlotInfo.copyFrom(calcResult.totalSlotInfo);
        },

        _calcActiveSkillList: function (selectedArmorInfo) {
            var lv1SlotNum = 0;
            var lv2SlotNum = 0;
            var lv3SlotNum = 0;
            var temp = {};
            $.each(selectedArmorInfo, function (part, armorInfo) {
                if (armorInfo == null) {
                    // 防具が未選択の部位の場合は何もしない
                    return;
                }
                if (part !== '5') {
                    // 護石以外の場合はスロット数も計算対象
                    lv1SlotNum += armorInfo.lv1Slot;
                    lv2SlotNum += armorInfo.lv2Slot;
                    lv3SlotNum += armorInfo.lv3Slot;
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

            var lv1SlotStr = util.convertSlotNumToSlotStr(lv1SlotNum, '①');
            var lv2SlotStr = util.convertSlotNumToSlotStr(lv2SlotNum, '②');
            var lv3SlotStr = util.convertSlotNumToSlotStr(lv3SlotNum, '③');

            var result = {
                activeSkillList: [],
                totalSlotInfo: [{
                    slotStr: lv1SlotStr
                }, {
                    slotStr: lv2SlotStr
                }, {
                    slotStr: lv3SlotStr
                }]
            };
            $.each(temp, this.own(function (skillName, skillVal) {
                result.activeSkillList.push({
                    skillName: this._skillNameMap[skillName],
                    skillVal: skillVal
                });
            }));
            return result;
        }
    };
    h5.core.expose(resultContainerController);
})(jQuery);