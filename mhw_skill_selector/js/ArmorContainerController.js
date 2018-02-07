(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var armorContainerController = {

        __name: 'MhwSkillSelector.controller.ArmorContainerController',

        _skillNameMap: null,// スキル名マップ（例:kougeki=>攻撃）
        _armorData: null,// 防具の元データ(csvからコンバート後)

        _headArmorList: null,// 頭装備選択リスト。ObservableArray
        _bodyArmorList: null,// 胴装備選択リスト。ObservableArray
        _handArmorList: null,// 手装備選択リスト。ObservableArray
        _waistArmorList: null,// 腰装備選択リスト。ObservableArray
        _legArmorList: null,// 足装備選択リスト。ObservableArray

        // 選択中の各部位の装備情報
        _selectedArmorInfo: {
            '0': null,// 頭
            '1': null,// 胴
            '2': null,// 手
            '3': null,// 腰
            '4': null// 足
        },

        initArmorList: function (skillNameMap, armorData) {
            this._skillNameMap = skillNameMap;
            this._armorData = armorData;

            this._headArmorList = h5.core.data.createObservableArray();
            this._bodyArmorList = h5.core.data.createObservableArray();
            this._handArmorList = h5.core.data.createObservableArray();
            this._waistArmorList = h5.core.data.createObservableArray();
            this._legArmorList = h5.core.data.createObservableArray();

            this._headArmorList.copyFrom(armorData[0]);
            this._bodyArmorList.copyFrom(armorData[1]);
            this._handArmorList.copyFrom(armorData[2]);
            this._waistArmorList.copyFrom(armorData[3]);
            this._legArmorList.copyFrom(armorData[4]);

            this.view.bind(this.rootElement, {
                headArmorList: this._headArmorList,
                bodyArmorList: this._bodyArmorList,
                handArmorList: this._handArmorList,
                waistArmorList: this._waistArmorList,
                legArmorList: this._legArmorList
            });
        },

        '.armorSelect change': function (context, $el) {
            var part = $el.data('armorPart');// 装備部位
            var armorName = $el.val();
            var selectedArmorInfo = this._getArmorInfo(part, armorName);// 選択した防具の情報をキャッシュから取得
            var $armorContainer = $el.parents('.armorContainer');
            this._updateSelectedArmorView($armorContainer, selectedArmorInfo);// 選択した防具の情報を画面に表示
            this._selectedArmorInfo[part] = selectedArmorInfo;// 選択した部位の装備情報のキャッシュを更新
            this._triggerUpdateResult();
        },

        _getArmorInfo: function (part, name) {
            // return this._armorData[part].find(function (el, idx, obsAry) {
            //     return el.armorName === name;
            // });
            var info = null;
            $.each(this._armorData[part], function (idx, armorInfo) {
                if (armorInfo.armorName === name) {
                    info = armorInfo;
                    return false;
                }
            });
            return info;
        },

        _updateSelectedArmorView: function ($armorContainer, selectedArmorInfo) {
            var $selectedArmorInfoContainer = $armorContainer.find('.selectedArmorInfoContainer');
            $selectedArmorInfoContainer.empty();
            this.view.append($selectedArmorInfoContainer, 'SelectedArmorInfo', {
                armorName: selectedArmorInfo.armorName,
                firstSkillName: this._skillNameMap[selectedArmorInfo.firstSkillName],
                firstSkillVal: selectedArmorInfo.firstSkillVal,
                secondSkillName: this._skillNameMap[selectedArmorInfo.secondSkillName],
                secondSkillVal: selectedArmorInfo.secondSkillVal,
                lv1Slot: selectedArmorInfo.lv1Slot,
                lv2Slot: selectedArmorInfo.lv2Slot,
                lv3Slot: selectedArmorInfo.lv3Slot
            });
        },

        _triggerUpdateResult: function () {
            this.trigger('updateResult', {
                selectedArmorInfo: this._selectedArmorInfo
            });
        }
    };
    h5.core.expose(armorContainerController);
})(jQuery);