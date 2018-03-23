(function ($) {
    'use strict';

    var util = MhwSkillSelector.util;

    /**
	 * 防具選択コンテナコントローラ
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
        _amuletList: null,// 護石選択リスト。ObservableArray

        // 選択中の各部位の装備情報
        _selectedArmorInfo: {
            '0': null,// 頭
            '1': null,// 胴
            '2': null,// 手
            '3': null,// 腰
            '4': null,// 足
            '5': null,// 護石
        },

        setupArmorList: function (skillNameMap, armorData) {
            this._skillNameMap = skillNameMap;
            this._armorData = armorData;

            this._headArmorList = h5.core.data.createObservableArray();
            this._bodyArmorList = h5.core.data.createObservableArray();
            this._handArmorList = h5.core.data.createObservableArray();
            this._waistArmorList = h5.core.data.createObservableArray();
            this._legArmorList = h5.core.data.createObservableArray();
            this._amuletList = h5.core.data.createObservableArray();

            this.initArmorList();

            this.view.bind(this.rootElement, {
                headArmorList: this._headArmorList,
                bodyArmorList: this._bodyArmorList,
                handArmorList: this._handArmorList,
                waistArmorList: this._waistArmorList,
                legArmorList: this._legArmorList,
                amuletList: this._amuletList
            });
        },

        initArmorList: function () {
            this._headArmorList.copyFrom(this._armorData[0]);
            this._bodyArmorList.copyFrom(this._armorData[1]);
            this._handArmorList.copyFrom(this._armorData[2]);
            this._waistArmorList.copyFrom(this._armorData[3]);
            this._legArmorList.copyFrom(this._armorData[4]);
            this._amuletList.copyFrom(this._armorData[5]);
        },

        '.armorSelect change': function (context, $el) {
            var part = $el.data('armorPart');// 装備部位
            var armorName = $el.val();
            var selectedArmorInfo = this._getArmorInfo(part, armorName);// 選択した防具の情報をキャッシュから取得
            var $armorContainer = $el.parents('.armorContainer');
            this._updateSelectedArmorView($armorContainer, selectedArmorInfo, part);// 選択した防具の情報を画面に表示
            this._selectedArmorInfo[part] = selectedArmorInfo;// 選択した部位の装備情報のキャッシュを更新
            this._triggerUpdateResult();
        },

        _getArmorInfo: function (part, name) {
            var info = null;
            $.each(this._armorData[part], function (idx, armorInfo) {
                if (armorInfo.armorName === name) {
                    info = armorInfo;
                    return false;
                }
            });
            return info;
        },

        _updateSelectedArmorView: function ($armorContainer, selectedArmorInfo, part) {
            var $selectedArmorInfoCell = $('.selectedArmorTable [data-armor-part="' + part + '"]');
            $selectedArmorInfoCell.empty();

            if (selectedArmorInfo.armorName === '') {
                // ダミー（各部位の先頭の選択肢）を選択した場合は選択中の装備欄を空にするだけ
                return;
            }
            if (part !== 5) {
                this.view.append($selectedArmorInfoCell, 'SelectedArmorInfo', {
                    armorName: selectedArmorInfo.armorName,
                    firstSkillName: this._skillNameMap[selectedArmorInfo.firstSkillName],
                    firstSkillVal: selectedArmorInfo.firstSkillVal,
                    secondSkillName: this._skillNameMap[selectedArmorInfo.secondSkillName],
                    secondSkillVal: selectedArmorInfo.secondSkillVal,
                    lv1Slot: util.convertSlotNumToSlotStr(selectedArmorInfo.lv1Slot, '①'),
                    lv2Slot: util.convertSlotNumToSlotStr(selectedArmorInfo.lv2Slot, '②'),
                    lv3Slot: util.convertSlotNumToSlotStr(selectedArmorInfo.lv3Slot, '③')
                });
                return;
            }
            this.view.append($selectedArmorInfoCell, 'SelectedAmuletInfo', {
                armorName: selectedArmorInfo.armorName,
                firstSkillName: this._skillNameMap[selectedArmorInfo.firstSkillName],
                firstSkillVal: selectedArmorInfo.firstSkillVal,
                secondSkillName: this._skillNameMap[selectedArmorInfo.secondSkillName],
                secondSkillVal: selectedArmorInfo.secondSkillVal
            });
        },

        _triggerUpdateResult: function () {
            this.trigger('updateResult', {
                selectedArmorInfo: this._selectedArmorInfo
            });
        },

        rebuildArmorList: function (filterSlot, filterSkills) {
            var isSelectedFilterSlot = false;
            $.each(filterSlot, function (key, isChecked) {
                if (isChecked) {
                    isSelectedFilterSlot = true;
                    return false;
                }
            });
            if (!isSelectedFilterSlot && filterSkills.length === 0) {
                // スロットLvフィルタが未選択、かつ、スキルフィルタが未選択の場合はリストを初期化
                this.initArmorList();
                return;
            }
            this._headArmorList.copyFrom(this._extractArmorData(this._armorData[0], filterSlot, isSelectedFilterSlot, filterSkills));
            this._bodyArmorList.copyFrom(this._extractArmorData(this._armorData[1], filterSlot, isSelectedFilterSlot, filterSkills));
            this._handArmorList.copyFrom(this._extractArmorData(this._armorData[2], filterSlot, isSelectedFilterSlot, filterSkills));
            this._waistArmorList.copyFrom(this._extractArmorData(this._armorData[3], filterSlot, isSelectedFilterSlot, filterSkills));
            this._legArmorList.copyFrom(this._extractArmorData(this._armorData[4], filterSlot, isSelectedFilterSlot, filterSkills));
            this._amuletList.copyFrom(this._extractArmorData(this._armorData[5], filterSlot, isSelectedFilterSlot, filterSkills));
        },

        _extractArmorData: function (armorDataArray, filterSlot, isSelectedFilterSlot, filterSkills) {
            return $.map(armorDataArray, this.own(function (armorInfo, idx) {
                if (idx === 0) {
                    // 表示対象防具が1件の場合、セレクトボックスで選択できない（changeが発火しない）ため
                    // 先頭のダミーデータは必ずリストに表示する
                    return armorInfo;
                }
                var firstSkillName = armorInfo.firstSkillName;
                if (firstSkillName === '') {
                    // 第1スキルが空文字の場合はフィルタではじく
                    return;
                }
                var isAmulet = armorInfo.part === '5';// 対象装備が護石であればtrue
                if (isAmulet && filterSkills.length === 0) {
                    // 護石かつスキルフィルタが未選択の場合、護石は全てリストに表示する対象とみなす
                    return armorInfo;
                }
                if (!isAmulet && isSelectedFilterSlot) {
                    // 護石以外の装備、かつ、スロットフィルタが1つでも設定されている場合
                    var hasSelectedSlot = this._hasSelectedSlot(armorInfo, filterSlot);
                    if (!hasSelectedSlot) {
                        // 防具が指定されたLvのスロットを持たないのではじく
                        return;
                    }
                    if (filterSkills.length === 0) {
                        // スキルフィルタが未選択の場合は、スロットLvを満たしていればリストに表示する対象とみなす
                        return armorInfo;
                    }
                }
                if (filterSkills.indexOf(firstSkillName) !== -1) {
                    // 第1スキルがフィルタチェックONのスキルと一致する場合。リストに表示する対象
                    return armorInfo;
                }
                var secondSkillName = armorInfo.secondSkillName;
                if (secondSkillName === '') {
                    // 第2スキルが空文字の場合はフィルタではじく
                    return;
                }
                if (filterSkills.indexOf(secondSkillName) !== -1) {
                    // 第2スキルがフィルタチェックONのスキルと一致する場合。リストに表示する対象
                    return armorInfo;
                }
            }));
        },

        /**
         * 対象防具がスロットフィルタONのスロットLvを持つかどうかOR判定する
         * <p>
         * 例：Lv1,Lv2をONにした場合にtrueを返す防具は、[①を持つ防具,②を持つ防具,①②を持つ防具]である
         */
        _hasSelectedSlot: function (armorInfo, filterSlot) {
            var hasSelectedSlot = false;
            $.each(filterSlot, function (key, isChecked) {
                if (!isChecked) {
                    // スロットフィルタがOFFの項目は無視する
                    return;
                }
                if (0 < armorInfo[key]) {
                    // 対象防具が該当Lvスロット数を持つ場合
                    hasSelectedSlot = true;
                    return false;
                }
            });
            return hasSelectedSlot;
        },

        '.showSelectedArmorDialogButton click': function () {
            var dialogStr = '';
            var lv1SlotNum = 0;
            var lv2SlotNum = 0;
            var lv3SlotNum = 0;
            $.each(this._selectedArmorInfo, function (part, armorInfo) {
                if (armorInfo == null) {
                    // 装備が選択されていない部位は無視
                    return;
                }
                dialogStr += armorInfo.armorName + '\n';
                if (part === '5') {
                    return;
                }
                lv1SlotNum += armorInfo.lv1Slot;
                lv2SlotNum += armorInfo.lv2Slot;
                lv3SlotNum += armorInfo.lv3Slot;
            });
            if (dialogStr.length === 0) {
                alert('装備が何も選択されていません');
                return;
            }
            var lv1SlotStr = util.convertSlotNumToSlotStr(lv1SlotNum, '①');
            var lv2SlotStr = util.convertSlotNumToSlotStr(lv2SlotNum, '②');
            var lv3SlotStr = util.convertSlotNumToSlotStr(lv3SlotNum, '③');
            dialogStr += lv1SlotStr + '\n' + lv2SlotStr + '\n' + lv3SlotStr;
            alert('選択中の装備と空きスロット\n=======================\n' + dialogStr);
        }
    };
    h5.core.expose(armorContainerController);
})(jQuery);