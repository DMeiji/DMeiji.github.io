(function ($) {
    'use strict';

    var equipData = ds3tool.data.equip;

    var manager = h5.core.data.createManager('CalcBuildWeightManager');
    var calcBuildWeightModel = manager.createModel({
        name: 'CalcBuildWeightModel',
        schema: {
            id: {
                id: true
            },
            helmW: { defaultValue: 0 },
            bodyW: { defaultValue: 0 },
            handW: { defaultValue: 0 },
            legW: { defaultValue: 0 },
            helmK: { defaultValue: 0 },
            bodyK: { defaultValue: 0 },
            handK: { defaultValue: 0 },
            legK: { defaultValue: 0 },
            totalArmorW: {
                depend: {
                    on: ['helmW', 'bodyW', 'handW', 'legW'],
                    calc: function (ev) {
                        var helmW = parseFloat(this.get('helmW'));
                        var bodyW = parseFloat(this.get('bodyW'));
                        var handW = parseFloat(this.get('handW'));
                        var legW = parseFloat(this.get('legW'));
                        return (helmW + bodyW + handW + legW).toFixed(2);
                    }
                }
            },
            totalArmorK: {
                depend: {
                    on: ['helmK', 'bodyK', 'handK', 'legK'],
                    calc: function (ev) {
                        var helmK = parseFloat(this.get('helmK'));
                        var bodyK = parseFloat(this.get('bodyK'));
                        var handK = parseFloat(this.get('handK'));
                        var legK = parseFloat(this.get('legK'));
                        return (helmK + bodyK + handK + legK).toFixed(2);
                    }
                }
            },
            r1W: { defaultValue: 0 },
            r2W: { defaultValue: 0 },
            r3W: { defaultValue: 0 },
            l1W: { defaultValue: 0 },
            l2W: { defaultValue: 0 },
            l3W: { defaultValue: 0 },
            totalWeaponW: {
                depend: {
                    on: ['r1W', 'r2W', 'r3W', 'l1W', 'l2W', 'l3W'],
                    calc: function (ev) {
                        var r1W = parseFloat(this.get('r1W'));
                        var r2W = parseFloat(this.get('r2W'));
                        var r3W = parseFloat(this.get('r3W'));
                        var l1W = parseFloat(this.get('l1W'));
                        var l2W = parseFloat(this.get('l2W'));
                        var l3W = parseFloat(this.get('l3W'));
                        return (r1W + r2W + r3W + l1W + l2W + l3W).toFixed(2);
                    }
                }
            },
            r1W: { defaultValue: 0 },
            r2W: { defaultValue: 0 },
            r3W: { defaultValue: 0 },
            l1W: { defaultValue: 0 },
            l2W: { defaultValue: 0 },
            l3W: { defaultValue: 0 },
            totalW: {
                depend: {
                    on: ['totalArmorW', 'totalWeaponW'],
                    calc: function (ev) {
                        var totalArmorW = parseFloat(this.get('totalArmorW'));
                        var totalWeaponW = parseFloat(this.get('totalWeaponW'));
                        return (totalArmorW + totalWeaponW).toFixed(2);
                    }
                }
            },
            requiredPossessionW: {
                depend: {
                    on: ['totalW'],
                    calc: function (ev) {
                        var totalW = parseFloat(this.get('totalW'));
                        return (totalW * 10 / 7).toFixed(2);
                    }
                }
            }
        }
    });
    var calcBuildWeightItem = calcBuildWeightModel.create({
        id: 'CalcBuildWeightItem'
    });

    var calcBuildWeightController = {

        __name: 'ds3tool.controller.CalcBuildWeightController',

        _buildItem: calcBuildWeightItem,

        init: function () {
            this.view.append(this.rootElement, 'build-and-weight', {
                helmList: equipData.helm,
                bodyList: equipData.body,
                handList: equipData.hand,
                legList: equipData.leg,
                weaponsBuildList: [
                    { rowName: 'right-first', partsName: '右手1', weightBindName: 'r1W' },
                    { rowName: 'right-secound', partsName: '右手2', weightBindName: 'r2W' },
                    { rowName: 'right-third', partsName: '右手3', weightBindName: 'r3W' },
                    { rowName: 'left-first', partsName: '左手1', weightBindName: 'l1W' },
                    { rowName: 'left-secound', partsName: '左手2', weightBindName: 'l2W' },
                    { rowName: 'left-third', partsName: '左手3', weightBindName: 'l3W' }
                ],
                genreList: equipData.genre
            });

            this._initArmorWeightAndKyoujin();
            this.view.bind(this.rootElement, this._buildItem);
        },

        _createWeaponSelectDOM: function () {

        },

        _initArmorWeightAndKyoujin: function () {
            var $armorSelect = this.$find('.armor-select');
            // 選択状態の防具の重量と強靭を表示に反映
            $.each($armorSelect, this.own(function (idx, select) {
                var armorName = select.value;
                var partsName = $(select).data('partsName');
                var armorData = this._getSelectedArmorData(armorName, partsName);
                this._updateDispWeightAndKyoujin(armorData, partsName);
            }));
        },

        _getSelectedArmorData: function (armorName, partsName) {
            var selectedTypeArmors = equipData[partsName];
            var result = null;
            $.each(selectedTypeArmors, function (idx, armorData) {
                if (armorData.name === armorName) {
                    result = $.extend(true, {}, armorData);
                    return false;
                }
            });
            return result;
        },

        _updateDispWeightAndKyoujin: function (armorData, partsName) {
            this._buildItem.set(partsName + 'W', armorData.weight);
            this._buildItem.set(partsName + 'K', armorData.kyoujin);
        },

        '.armor-select change': function (context, $el) {
            var armorName = $el.val();
            var partsName = $el.data('partsName');
            var armorData = this._getSelectedArmorData(armorName, partsName);
            this._updateDispWeightAndKyoujin(armorData, partsName);
        }
    };

    h5.core.expose(calcBuildWeightController);
})(jQuery);