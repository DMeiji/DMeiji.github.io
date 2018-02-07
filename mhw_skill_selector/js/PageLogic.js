(function ($) {
    'use strict';

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'MhwSkillSelector.logic.PageLogic',

        getSkillNameMapData: function () {
            return h5.ajax('./data/skillName.json');
        },

        getArmorData: function () {
            return h5.ajax('./data/armor.csv');
        },

        getFilterSkillMapData: function () {
            return h5.ajax('./data/filterSkillMap.json');
        },

        convertArmorCSVToArmorData: function (csvStr, skillNameMap) {
            var result = {
                '0': [],// 頭
                '1': [],// 胴
                '2': [],// 手
                '3': [],// 腰
                '4': []// 足
            };
            var csvStrAry = csvStr.split('\n');
            csvStrAry.shift();// 1行目はコメントなので除外

            $.each(csvStrAry, function (i, armorRecordStr) {
                var armorAry = armorRecordStr.split(',');
                var armorName = armorAry[0];// 装備名
                var part = armorAry[1];// 装備部位
                var firstSkillName = armorAry[2] || '';// 第1スキル名
                var firstSkillVal = parseInt(armorAry[3]) || null;// 第1スキル値
                var secondSkillName = armorAry[4] || '';// 第2スキル名
                var secondSkillVal = parseInt(armorAry[5]) || null;// 第2スキル値
                var lv1Slot = parseInt(armorAry[6]);// Lv1スロット
                var lv2Slot = parseInt(armorAry[7]);// Lv2スロット
                var lv3Slot = parseInt(armorAry[8]);// Lv3スロット

                var dispArmorName = armorName;

                if (firstSkillName != '') {
                    dispArmorName += ' | ' + skillNameMap[firstSkillName] + '+' + firstSkillVal;
                }
                if (secondSkillName != '') {
                    dispArmorName += ' | ' + skillNameMap[secondSkillName] + '+' + secondSkillVal;
                }
                var idx;
                var slotStr = '';
                for (idx = 0; idx < lv1Slot; idx++) {
                    slotStr += '①';
                }
                for (idx = 0; idx < lv2Slot; idx++) {
                    slotStr += '②';
                }
                for (idx = 0; idx < lv3Slot; idx++) {
                    slotStr += '③';
                }
                slotStr += '---';
                slotStr = slotStr.slice(0, 3);
                dispArmorName += ' | ' + slotStr;

                result[part].push({
                    armorName: armorAry[0],// 装備名
                    part: part,// 装備部位
                    firstSkillName: firstSkillName,// 第1スキル名
                    firstSkillVal: firstSkillVal,// 第1スキル値
                    secondSkillName: secondSkillName,// 第2スキル名
                    secondSkillVal: secondSkillVal,// 第2スキル値
                    lv1Slot: lv1Slot,// Lv1スロット
                    lv2Slot: lv2Slot,// Lv2スロット
                    lv3Slot: lv3Slot,// Lv3スロット
                    resFire: parseInt(armorAry[9]),// 火耐性
                    resWater: parseInt(armorAry[10]),// 水耐性
                    resThunder: parseInt(armorAry[11]),// 雷耐性
                    resIce: parseInt(armorAry[12]),// 氷耐性
                    resDragon: parseInt(armorAry[13]),// 龍耐性
                    dispArmorName: dispArmorName// 防具選択リストの表示用
                });
            });
            return result;
        },

        convertSkillNameMapToFilterTable: function (skillNameMap) {

        }
    };

    h5.core.expose(pageLogic);
})(jQuery);