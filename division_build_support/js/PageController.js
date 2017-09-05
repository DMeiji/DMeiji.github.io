(function ($) {
    'use strict';

    // =========================
    // 定数
    // =========================
    var DIVISION_CONST = division_build_support.const;
    var ARMOR_STATUS = DIVISION_CONST.ARMOR.STATUS;
    var ARMOR_TOKUSEI_LEN_MAP = DIVISION_CONST.ARMOR.TOKUSEI_LEN_MAP;
    var ARMOR_TOKUSEI_PROPERTY_MAP = DIVISION_CONST.ARMOR.TOKUSEI_PROPERTY_MAP;
    var SET_NAME_MAP = DIVISION_CONST.SET.NAME_MAP;

    // =========================
    // 静的変数
    // =========================
    var manager = h5.core.data.createManager('divisionManager');
    var armorItemModel = manager.createModel({
        name: 'divisionArmorItemModel',
        schema: {
            id: { id: true },
            partName: null,// 部位名
            talentList: null,// 当該部位の防具タレント一覧
            talentDesc: null,// 選択したタレントの説明文
            // 銃器
            firearms: {
                depend: {
                    on: ['selectedStatus'],
                    calc: function (ev) {
                        return this.get('selectedStatus') === 'firearms' ? ARMOR_STATUS.MAX : ARMOR_STATUS.MIN;
                    }
                }
            },
            // スタミナ
            stamina: {
                depend: {
                    on: ['selectedStatus'],
                    calc: function (ev) {
                        return this.get('selectedStatus') === 'stamina' ? ARMOR_STATUS.MAX : ARMOR_STATUS.MIN;
                    }
                }
            },
            // 電子機器
            electron: {
                depend: {
                    on: ['selectedStatus'],
                    calc: function (ev) {
                        return this.get('selectedStatus') === 'electron' ? ARMOR_STATUS.MAX : ARMOR_STATUS.MIN;
                    }
                }
            },
            tokuseiList: null,// 特性一覧

            // 選択したステータス
            selectedStatus: {
                defaultValue: 'firearms'
            },
            // 選択した特性のマップ
            selectedTokuseiMap: {
                defaultValue: {}
            }
        }
    });
    var grandTotalModel = manager.createModel({
        name: 'divisionGrandTotalItemModel',
        schema: {
            id: { id: true },
            firearms: null,
            stamina: null,
            electron: null,

            ch: {
                defaultValue: 0
            },
            cd: {
                defaultValue: 0
            },
            smgdmg: {
                defaultValue: 0
            },
            ardmg: {
                defaultValue: 0
            },
            sgdmg: {
                defaultValue: 0
            },
            lmgdmg: {
                defaultValue: 0
            },
            pistoldmg: {
                defaultValue: 0
            },
            mmr: {
                defaultValue: 0
            },
            armordmg: {
                defaultValue: 0
            },
            resall: {
                defaultValue: 0
            },
            life: {
                defaultValue: 0
            },
            killlife: {
                defaultValue: 0
            },
            exdmgheal: {
                defaultValue: 0
            },
            sh: {
                defaultValue: 0
            },
            sp: {
                defaultValue: 0
            },
            stability: {
                defaultValue: 0
            },
            reload: {
                defaultValue: 0
            },
            vselite: {
                defaultValue: 0
            },
            resshock: {
                defaultValue: 0
            },
            resfire: {
                defaultValue: 0
            },
            resconfu: {
                defaultValue: 0
            },
            resaudiovis: {
                defaultValue: 0
            },
            resjack: {
                defaultValue: 0
            },
            resbleed: {
                defaultValue: 0
            },
            killxp: {
                defaultValue: 0
            },
            ammo: {
                defaultValue: 0
            }
        }
    });

    // =========================
    // 関数
    // =========================
    var errAlert = function () {
        alert('error');
    };

    // =========================
    // 画面コントローラ
    // =========================
    var pageController = {

        __name: 'division_build_support.controller.PageController',

        _logic: division_build_support.logic.PageLogic,
        _setBounusList: h5.core.data.createObservableArray(),// 発動しているセット効果の一覧

        _selectedSetMap: {},// 各部位の選択されているセット防具名のマップ。非セット防具ならnullまたは空文字
        _armorItemsMap: {},// keyがpartName、valueがデータアイテムのマップ
        _selectedArmorStatusItem: null,

        __init: function () {
            var armorTalentDataPromise = this._logic.getArmorTalentData();// 防具タレントデータ取得
            var mainTokuseiDataPromise = this._logic.getMainTokuseiData();// メイン特性データ取得
            var subTokuseiDataPromise = this._logic.getSubTokuseiData();// サブ特性データ取得

            $.when(armorTalentDataPromise, mainTokuseiDataPromise, subTokuseiDataPromise).then(this.own(
                function (armorTalentRes, mainTokuseiRes, subTokuseiRes) {
                    // 防具タレント名とタレント説明のマップをキャッシュ
                    this._armorTalentDescMap = this._convertResToArmorTalentDescMap(armorTalentRes);

                    // 各部位を初期表示
                    var armorItemsData = this._convertToArmorItemsData(armorTalentRes, mainTokuseiRes, subTokuseiRes);
                    h5.core.view.bind('.armorItemsContainer', {
                        armorItems: armorItemsData
                    });

                    // 各部位のデータアイテムをキャッシュ
                    armorItemsData.forEach(this.own(function (armorItem) {
                        var partName = armorItem.get('partName');
                        this._armorItemsMap[partName] = armorItem;
                    }));

                    // 合計性能欄にデータアイテムをバインド
                    var totalStatus = this._calcTotalStatus();
                    var grandTotalItem = this._grandTotalItem = grandTotalModel.create({
                        id: 'grandTotalItem',
                        firearms: totalStatus.firearms,
                        stamina: totalStatus.stamina,
                        electron: totalStatus.electron
                    });
                    h5.core.view.bind('.grandTotalContainer', {
                        grandTotal: grandTotalItem
                    });

                    // 特性値のマップをキャッシュ
                    this._tokuseiMap = this._convertToTokuseiMap(mainTokuseiRes, subTokuseiRes);
                },
                function () {
                    errAlert();
                }
            ));

            // セットボーナスのデータを取得
            this._logic.getSetBounusData().done(this.own(function (setBounusDataRes) {
                // 取得したデータを画面表示用に変換してバインド
                this._setBounusData = this._convertResToSetBounusData(setBounusDataRes);
                h5.core.view.bind('.setBounusContainer', {
                    setBounusList: this._setBounusList
                });
            }));
        },

        _convertResToArmorTalentDescMap: function (res) {
            var result = {};
            $.each(res, function (partName, dataStr) {
                result[partName] = {};
                var strAry = dataStr.split(/\r\n|\r|\n/);// 各要素は当該部位のタレント名と説明、setName(カンマで分ける前)
                strAry.forEach(function (str) {
                    var ary = str.split(',');//カンマで分ける。name,desc,setNameに分離
                    var name = ary[0];
                    var desc = ary[1];
                    result[partName][name] = desc;
                });
            });
            return result;
        },

        _convertToArmorItemsData: function (armorTalentRes, mainTokuseiRes, subTokuseiRes) {
            // 返す型はデータアイテムのObsAry(長さは6)
            var result = h5.core.data.createObservableArray();

            var partNames = Object.keys(armorTalentRes);// 各部位名の配列
            partNames.forEach(this.own(function (partName) {
                var mainTokuseiList = this._convertResToMainTokuseiList(mainTokuseiRes, partName);
                var subTokuseiList = this._convertResToSubTokuseiList(subTokuseiRes, partName);
                var tokuseiList = this._convertResToTokuseiList(mainTokuseiList, subTokuseiList, partName);

                var armorItem = armorItemModel.create({
                    id: partName,
                    partName: partName,// 部位名
                    talentList: this._convertResToArmorTalentData(armorTalentRes, partName),// 当該部位の防具タレント一覧
                    talentDesc: '',// 選択したタレントの説明文。初期は空文字
                    // firearms: ARMOR_STATUS.MAX,// 銃器ステータス値。初期は選択状態なのでMAX値を設定
                    // stamina: ARMOR_STATUS.MIN,// スタミナステータス値。初期は非選択状態なのでMIN値を設定
                    // electron: ARMOR_STATUS.MIN,// 電子機器ステータス値。初期は非選択状態なのでMIN値を設定
                    tokuseiList: tokuseiList,// 特性一覧
                    // selectedTokuseiMap: null// 選択した特性のマップ
                });
                result.push(armorItem);
            }));
            return result;
        },

        /**
         * csvデータを指定した部位の防具タレント情報の配列に変換
         */
        _convertResToArmorTalentData: function (res, partName) {
            var result = [];
            var strAry = res[partName].split(/\r\n|\r|\n/);// 各要素は当該部位のタレント名と説明、setName(カンマで分ける前)
            strAry.forEach(function (str) {
                var ary = str.split(',');//カンマで分ける。name,desc,setNameに分離
                result.push({
                    name: ary[0],
                    desc: ary[1],
                    setName: ary[2]
                });
            });
            return result;
        },

        /**
         * csvデータを指定した部位の特性情報に変換
         */
        _convertResToTokuseiList: function (mainTokuseiList, subTokuseiList, partName) {
            var tokuseiLenMap = ARMOR_TOKUSEI_LEN_MAP[partName];
            var mainLen = tokuseiLenMap.mainLen;
            var subLen = tokuseiLenMap.subLen;
            var result = [];

            for (var i = 0; i < mainLen; i++) {
                result.push({
                    tokuseiItemsList: mainTokuseiList
                });
            }
            for (i = 0; i < subLen; i++) {
                result.push({
                    tokuseiItemsList: subTokuseiList
                });
            }
            return result;
        },

        _convertResToMainTokuseiList: function (mainTokuseiRes, partName) {
            var result = [];
            var partRes = mainTokuseiRes[partName];
            var strAry = partRes.split(/\r\n|\r|\n/);
            strAry.forEach(this.own(function (str, idx) {
                // リストの先頭はselectの初期表示用の項目にする
                if (idx === 0) {
                    result.push({
                        label: 'メイン特性値  (最小 - 最大)',
                        property: null,
                        min: null,
                        max: null
                    });
                    return;
                }
                var ary = str.split(',');
                var property = ary[0];
                var min = ary[1];
                var max = ary[2];
                result.push({
                    label: this._createTokuseiLabel(property, min, max),
                    property: property,
                    min: min,
                    max: max
                });
            }));
            return result;
        },

        _convertResToSubTokuseiList: function (subTokuseiRes, partName) {
            var result = [];
            var partRes = subTokuseiRes[partName];
            if (partRes == null) {
                return result;
            }
            var strAry = partRes.split(/\r\n|\r|\n/);
            strAry.forEach(this.own(function (str, idx) {
                // リストの先頭はselectの初期表示用の項目にする
                if (idx === 0) {
                    result.push({
                        label: 'サブ特性値  (最小 - 最大)',
                        property: null,
                        min: null,
                        max: null
                    });
                    return;
                }
                var ary = str.split(',');
                var property = ary[0];
                var min = ary[1];
                var max = ary[2];
                result.push({
                    label: this._createTokuseiLabel(property, min, max),
                    property: property,
                    min: min,
                    max: max
                });
            }));
            return result;
        },

        _createTokuseiLabel: function (property, min, max) {
            var label = ARMOR_TOKUSEI_PROPERTY_MAP[property] || property;
            label += '  (' + min + ' - ' + max + ')';
            return label;
        },

        /**
         * セット効果のデータをキャッシュする型に変換
         */
        _convertResToSetBounusData: function (res) {
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

        _convertToTokuseiMap: function (mainTokuseiRes, subTokuseiRes) {
            var result = {};
            // メイン特性
            $.each(mainTokuseiRes, this.own(function (partName, partRowStr) {
                result[partName] = {};
                var strAry = partRowStr.split(/\r\n|\r|\n/);
                strAry.forEach(this.own(function (tokuseiRowStr) {
                    var ary = tokuseiRowStr.split(',');
                    var property = ary[0];
                    var max = ary[2];
                    result[partName][property] = max;
                }));
            }));
            // サブ特性
            $.each(subTokuseiRes, this.own(function (partName, partRowStr) {
                var strAry = partRowStr.split(/\r\n|\r|\n/);
                strAry.forEach(this.own(function (tokuseiRowStr) {
                    var ary = tokuseiRowStr.split(',');
                    var property = ary[0];
                    var max = ary[2];
                    result[partName][property] = max;
                }));
            }));
            return result;
        },

        '.armorTalentList change': function (context, $el) {
            this._updateArmorTalentDesc($el);// 選択したarmorのdescに表示を更新する
            this._updateSetArmorMap($el);// setArmorのマップを更新
            this._updateSetBounus();// setArmorの選択状態からbounus表示欄を更新
        },

        _updateArmorTalentDesc: function ($list) {
            var desc = this._getArmorTalentDesc($list);// talentのdescを取得
            var $parentArmorItem = $list.parent('.armorItem');
            var partName = $parentArmorItem.data('partName');
            this._armorItemsMap[partName].set('talentDesc', desc);
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
            this._setBounusList.splice(0, this._setBounusList.length);// セットボーナス一覧をクリア
            var isSelectedNinja = false;// ニンジャバイクが選択されているかどうか
            // 各部位で選択したセット効果数をカウント
            var selectSetList = {};
            $.each(this._selectedSetMap, this.own(function (partName, setName) {
                // セット防具が選択されていなければ何もしない
                if (setName == null || setName === '') {
                    return;
                }
                // ニンジャバイクが選択されていればフラグをたてる
                if (partName === 'backpack') {
                    isSelectedNinja = setName === 'ninja';
                }
                selectSetList[setName] = selectSetList[setName] == null ? 1 : ++selectSetList[setName];
            }));

            $.each(selectSetList, this.own(function (setName, cnt) {
                // setNameがninjaの場合、ニンジャバイク自体にセット効果はないため何もしない
                if (setName === 'ninja') {
                    return;
                }
                // ニンジャバイクが選択されている、かつ、セット効果カウントが３以下であれば+１する
                // MEMO ver1.7現在、ニンジャバイクでは５、６セット効果は発動しない
                if (isSelectedNinja && cnt < 4) {
                    cnt++;
                }
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
            this._toggleSelectedStatus($el);// 選択状態のステータスを切り換え
            var partName = $el.data('partName');
            var armorStatusName = $el.data('statusName');
            this._setArmorStatus(partName, armorStatusName);// 対象部位のデータアイテムに選択したステータスをセット
            var totalStatus = this._calcTotalStatus();// 各ステータスの合計値を算出
            this._updateTotalStatus(totalStatus);// ステータス合計値を更新
        },

        _toggleSelectedStatus: function ($statusArea) {
            var $parentContainer = $statusArea.parent('.armorStatusContainer');
            // ステータスを非選択状態にする
            var $selected = $parentContainer.find('.selectedStatus');
            $selected.toggleClass('selectedStatus');
            // 選択されたステータスを選択状態にする
            $statusArea.toggleClass('selectedStatus');
        },

        _setArmorStatus: function (partName, armorStatusName) {
            this._armorItemsMap[partName].set('selectedStatus', armorStatusName);
        },

        _calcTotalStatus: function () {
            var result = {
                firearms: 0,
                stamina: 0,
                electron: 0
            };
            // 各部位のデータアイテム毎にステータスの値を加算する
            // 加算する値は選択ステータスはARMOR_STATUS.MAX、非選択ステータスはARMOR_STATUS.MIN
            $.each(this._armorItemsMap, this.own(function (partName, armorItem) {
                var selectedStatus = armorItem.get('selectedStatus');
                $.each(result, this.own(function (status, val) {
                    result[status] += status === selectedStatus ? ARMOR_STATUS.MAX : ARMOR_STATUS.MIN;
                }));
            }));
            return result;
        },

        _updateTotalStatus: function (totalStatus) {
            var item = this._grandTotalItem;
            $.each(totalStatus, this.own(function (status, val) {
                item.set(status, val);
            }));
        },

        '.tokuseiList change': function (context, $el) {
            var property = $el.val();// 選択した特性名
            var $parentArmorItem = $el.parents('.armorItem');
            var partName = $parentArmorItem.data('partName');// 部位名
            var max = this._tokuseiMap[partName][property];// 選択した特性のmax値
            var idx = $el[0].selectedIndex;// 選択したoptionタグのindex
            var armorItem = this._armorItemsMap[partName];// 当該部位のデータアイテム
            var selectedTokuseiMap = armorItem.get('selectedTokuseiMap');// 当該部位の選択した特性のマップ

            // 当該部位ですでに選択されている特性であれば更新しない
            if (this._isSelectedTokusie(property, selectedTokuseiMap)) {
                return;
            }
            this._updateSelectTokusei(selectedTokuseiMap, idx, property, max);// 当該部位の選択した特性のマップを更新

            var totalTokuseiMap = this._calcTotalTokusei();
            $.each(totalTokuseiMap, this.own(function (property, val) {
                this._grandTotalItem.set(property, val);
            }));
        },

        _isSelectedTokusie: function (property, selectedTokuseiMap) {
            var isSelected = false;
            $.each(selectedTokuseiMap, function (idx, selectedTokusei) {
                // selectedTokuseiは{property: 選択した特性名, val: 選択した特性の最大値 }
                if (property === selectedTokusei.property) {
                    isSelected;
                }
            });
            return isSelected;
        },

        _updateSelectTokusei: function (selectedTokuseiMap, idx, property, max) {
            selectedTokuseiMap[idx] = selectedTokuseiMap[idx] || {};
            selectedTokuseiMap[idx] = {
                property: property,
                val: parseFloat(max)
            }
        },

        _calcTotalTokusei: function () {
            var result = {};
            $.each(this._armorItemsMap, this.own(function (partName, armorItem) {
                var selectedTokuseiMap = armorItem.get('selectedTokuseiMap');
                $.each(selectedTokuseiMap, this.own(function (idx, selectedTokusei) {
                    var property = selectedTokusei.property;
                    var val = selectedTokusei.val;
                    result[property] = result[property] == null ? val : result[property] + val;
                }));
            }));
            return result;
        }
    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);