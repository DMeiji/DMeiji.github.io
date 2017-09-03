(function ($) {
    'use strict';

    // =========================
    // 定数
    // =========================
    var DIVISION_CONST = division_build_support.const;
    var ARMOR_CONST = DIVISION_CONST.ARMOR;
    var SET_NAME_MAP = DIVISION_CONST.SET.NAME_MAP;

    // =========================
    // 静的変数
    // =========================
    var manager = h5.core.data.createManager('divisionArmor');
    var armorTalentModel = manager.createModel({
        name: 'divisionArmorModel',
        schema: {
            id: { id: true },
            name: { type: 'string' }
        }
    });

    // =========================
    // 関数
    // =========================
    var errAlert = function () {
        alert('想定外のエラー');
    };

    // =========================
    // 画面コントローラ
    // =========================
    var pageController = {

        __name: 'division_build_support.controller.PageController',

        _logic: division_build_support.logic.PageLogic,
        _setBounusList: h5.core.data.createObservableArray(),// 発動しているセット効果の一覧
        
        // 各部位の選択されているセット防具名のマップ。非セット防具ならnullまたは空文字
        _selectedSetMap: {
            mask: null,
            body: null,
            backpack: null,
            glove: null,
            knee: null,
            holster: null
        },

        __init: function () {
            // 防具タレントのデータを取得
            this._logic.getArmorTalentData().done(this.own(function (armorTalentDataRes) {
                // 取得したデータを画面表示用に変換してバインド
                this._armorTalentData = this._convertResToArmorTalentData(armorTalentDataRes);
                h5.core.view.bind('.armorTalentContainer', {
                    armorItems: this._armorTalentData
                });
            }));
            // セットボーナスのデータを取得
            this._logic.getSetBounusData().done(this.own(function (setBounusDataRes) {
                // 取得したデータを画面表示用に変換してバインド
                this._setBounusData = this._convertResToSetBounusData(setBounusDataRes);
                h5.core.view.bind('.setBounusContainer', {
                    setBounusList: this._setBounusList
                });
            }));
        },

        /**
         * 防具タレントのデータを表示用データに変換
         */
        _convertResToArmorTalentData: function (res) {
            // returnするデータの型
            // [{
            //     partName: 'mask',
            //     data: [
            //         { name: 'エンデュアリング', setName: '' },
            //         { name: 'D3-FNC', setName: 'd3fnc' }
            //     ]
            // }]
            var result = h5.core.data.createObservableArray();

            var keys = Object.keys(res);// 部位名の配列
            keys.forEach(function (key) {
                var partDataAry = h5.core.data.createObservableArray();
                var strAry = res[key].split(/\r\n|\r|\n/);// 各要素が'name,desc'の配列
                strAry.forEach(function (str) {
                    var ary = str.split(',');
                    partDataAry.push({
                        name: ary[0],
                        desc: ary[1],
                        setName: ary[2]
                    });
                });

                result.push({
                    partName: key,// 部位名
                    data: partDataAry,// 当該部位の各タレントとセット防具
                    
                    // 防具の銃器・スタミナ・電子のステータス値。初期表示では銃器が選択状態なのでMAX値
                    firearmsStatusVal: ARMOR_CONST.STATUS.MAX,
                    staminaStatusVal: ARMOR_CONST.STATUS.MIN,
                    electronStatusVal: ARMOR_CONST.STATUS.MIN
                });
            });

            return result;
        },

        /**
         * セット効果のデータをキャッシュする型に変換
         */
        _convertResToSetBounusData: function (res) {
            // retusnするデータの型
            // {
            //     d3fnc: {
            //         name: 'D3-FNC',
            //         desc: {
            //             '2': 'xxx',
            //             '3': 'yyy',
            //             ...
            //         }
            //     },
            //     ...
            // }
            var result = {};

            // 各要素は１セット分の文字列。先頭の要素はヘッダ部分なので除外。最後の要素はsplitによる空行なので除外
            var rowAry = res.split(/@@@/).slice(1, -1);

            rowAry.forEach(function (rowStr) {
                var ary = rowStr.split(',');
                result[ary[0].replace(/\r\n|\r|\n/, '')] = {
                    name: ary[2],
                    desc: {
                        '2': ary[3],
                        '3': ary[4],
                        '4': ary[5],
                        '5': ary[6],
                        '6': ary[7]
                    }
                }
            });

            return result;
        },

        '.armorTalentList change': function (context, $el) {
            this._updateArmorTalentDesc($el);// 選択したarmorのdescに表示を更新する
            this._updateSetArmorMap($el);// setArmorのマップを更新
            this._updateSetBounus();// setArmorの選択状態からbounus表示欄を更新
        },

        _updateArmorTalentDesc: function ($list) {
            var desc = this._getArmorTalentDesc($list);// talentのdescを取得
            var descArea = $list.next('.talentDescArea')[0];
            descArea.innerText = desc;
        },

        _getArmorTalentDesc: function ($list) {
            var optionIdx = $list[0].selectedIndex;
            var option = $list.find('option').eq(optionIdx)[0];
            var desc = option.attributes.desc.nodeValue;
            return desc;
        },

        _updateSetArmorMap: function ($list) {
            var optionIdx = $list[0].selectedIndex;
            var $option = $list.find('option').eq(optionIdx);
            var setName = $option.data('setName');
            var partName = $list.prev('.partName').text();
            this._selectedSetMap[partName] = setName;
        },

        _updateSetBounus: function () {
            this._setBounusList.splice(0, this._setBounusList.length);
            var selectSetList = {};
            $.each(this._selectedSetMap, this.own(function (key, setName) {
                if (setName == null || setName === '') {
                    return;
                }
                selectSetList[setName] = selectSetList[setName] == null ? 1 : ++selectSetList[setName];
            }));

            $.each(selectSetList, this.own(function (setName, cnt) {
                if (cnt < 2) {
                    return;
                }
                for (var i = 2; i <= cnt; i++) {
                    var desc = this._setBounusData[setName].desc[i];
                    if (desc == null || desc === '') {
                        continue;
                    }
                    this._setBounusList.push({
                        setNum: SET_NAME_MAP[setName] + ' ' + i + 'セット効果：',
                        setDesc: desc
                    });
                }
            }));
        },

        '.armorStatusArea click': function (context, $el) {
            this._toggleSelectContainer($el);
        },

        _toggleSelectContainer: function ($statusArea) {
            // 選択された部位ですでに選択されているステータスを非選択状態にする
            var $parentContainer = $statusArea.parent('.armorStatusContainer');
            var $selected = $parentContainer.find('.armorStatusArea.selectedStatus');
            $selected.toggleClass('selectedStatus');
            $selected.find('.statusVal').text('205');
            // 選択された部位のステータスを選択状態にする
            $statusArea.toggleClass('selectedStatus');
            $statusArea.find('.statusVal').text('1272');
        }
    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);