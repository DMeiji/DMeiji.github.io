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
            helmW: { defaultValue: 0 },// 頭の重量
            bodyW: { defaultValue: 0 },// 胴の重量
            handW: { defaultValue: 0 },// 手の重量
            legW: { defaultValue: 0 },// 足の重量
            helmK: { defaultValue: 0 },// 頭の強靭
            bodyK: { defaultValue: 0 },// 胴の強靭
            handK: { defaultValue: 0 },// 手の強靭
            legK: { defaultValue: 0 },// 足の強靭
            // 防具の合計重量
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
            // 防具の合計強靭
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
            r1W: { defaultValue: 0 },// 右手1の重量
            r2W: { defaultValue: 0 },// 右手2の重量
            r3W: { defaultValue: 0 },// 右手3の重量
            l1W: { defaultValue: 0 },// 左手1の重量
            l2W: { defaultValue: 0 },// 左手2の重量
            l3W: { defaultValue: 0 },// 左手3の重量
            // 武器の合計重量
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
            // 武器・防具の合計重量
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
            // 中ロリに必要な装備重量
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

        /**
         * 初期化
         */
        init: function () {
            // ejsから画面の大枠を生成
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

            //　初期選択状態の防具の重量、強靭を表示に反映する
            this._initArmorWeightAndKyoujin();
            this.view.bind(this.rootElement, this._buildItem);

            // 初期選択状態の武器ジャンルに合わせて武器選択リストを更新
            var $weaponSelects = this.$find('.weapon-select');
            $.each($weaponSelects, this.own(function (idx, weaponSelect) {
                var $weaponList = this._createWeaponListDOM('daggers');
                this._updateWeaponListDOM($(weaponSelect), $weaponList);
            }));
        },

        /**
         * 初期選択状態の防具の重量と強靭を表示に反映
         */
        _initArmorWeightAndKyoujin: function () {
            var $armorSelect = this.$find('.armor-select');
            $.each($armorSelect, this.own(function (idx, select) {
                var armorName = select.value;
                var partsName = $(select).data('partsName');
                var armorData = this._getSelectedArmorData(armorName, partsName);
                this._updateDispWeightAndKyoujin(armorData, partsName);
            }));
        },

        /**
         * 指定した防具の情報を返す
         * 
         * @param armorName 防具名
         * @param partsName 部位
         */
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

        /**
         * 指定した部位の重量と強靭を更新する
         * 
         * @param armorData 防具の情報
         * @param partsName 部位
         */
        _updateDispWeightAndKyoujin: function (armorData, partsName) {
            this._buildItem.set(partsName + 'W', armorData.weight);
            this._buildItem.set(partsName + 'K', armorData.kyoujin);
        },

        /**
         * 防具の選択リストのchangeハンドラ<p>
         * 選択した防具の重量・強靭を表示に反映する
         */
        '.armor-select change': function (context, $el) {
            var armorName = $el.val();
            var partsName = $el.data('partsName');
            var armorData = this._getSelectedArmorData(armorName, partsName);
            this._updateDispWeightAndKyoujin(armorData, partsName);
        },

        /**
         * 武器ジャンルの選択リストのchangeハンドラ<p>
         * 武器リストを選択したジャンルの武器一覧に置き換える
         */
        '.genre-select change': function (context, $el) {
            var genreKanaName = $el.val();
            var genreName = this._getGenreName(genreKanaName);
            var $weaponsList = this._createWeaponListDOM(genreName);

            var $weaponsBuildRow = $el.parents('.weapons-build-row');
            var $weaponSelect = $weaponsBuildRow.find('.weapon-select');
            this._updateWeaponListDOM($weaponSelect, $weaponsList);
        },

        /**
         * 指定したジャンル名(かな)に対応するジャンル名(英名)を返す
         * 
         * @param ジャンル名(かな)
         */
        _getGenreName: function (kanaName) {
            var result = null;
            $.each(equipData.genre, function (idx, genreData) {
                if (genreData.kanaName === kanaName) {
                    result = genreData.name;
                    return false;
                }
            });
            return result;
        },

        /**
         * 指定したジャンルの武器一覧のDOMを生成して返す
         * 
         * @param genreName 武器ジャンル名(英名)
         */
        _createWeaponListDOM: function (genreName) {
            var weaponsData = equipData[genreName];
            var html = '';
            $.each(weaponsData, function (idx, weaponData) {
                var temp = '<option data-weight="' + weaponData.weight + '">';
                temp += weaponData.name + '</option>';
                html += temp;
            });
            return $(html);
        },

        /**
         * 指定した武器リスト要素を新しい一覧に更新する
         * 
         * @param $targetSelect 更新対象のselect要素
         * @param $weaponsList 新しい武器一覧要素
         */
        _updateWeaponListDOM: function ($targetSelect, $weaponsList) {
            $targetSelect.empty();
            $targetSelect.append($weaponsList);
        },

        /**
         * 武器選択リストのchangeハンドラ<p>
         * 選択した武器の重量を表示に反映する
         */
        '.weapon-select change': function (context, $el) {
            var weaponBindName = $el.data('weaponBindName');
            var weight = $el.find('option:selected').data('weight');
            this._buildItem.set(weaponBindName, weight);
        }
    };

    h5.core.expose(calcBuildWeightController);
})(jQuery);