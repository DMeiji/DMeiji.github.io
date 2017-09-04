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
            // 部位名
            partName: null,
            // 当該部位の防具タレント一覧
            talentList: null,
            // 選択したタレントの説明文
            talentDesc: null,
            // 銃器ステータス値
            firearms: null,
            // スタミナステータス値
            stamina: null,
            // 電子機器ステータス値
            electron: null,
            // 特性一覧
            tokuseiList: null,
            // 選択した特性のマップ
            selectedTokusei: null
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
            var ma = h5.core.data.createManager('hoge');
            var mo = ma.createModel({
                name: 'hogeModel',
                schema: {
                    id: { id: true },
                    hoge: null
                }
            });
            var item = mo.create({
                id: 'xxx',
                hoge: 'yyy'
            });
            console.log(item);

            var armorTalentDataPromise = this._logic.getArmorTalentData();// 防具タレントデータ取得
            var mainTokuseiDataPromise = this._logic.getMainTokuseiData();// メイン特性データ取得
            var subTokuseiDataPromise = this._logic.getSubTokuseiData();// サブ特性データ取得

            $.when(armorTalentDataPromise, mainTokuseiDataPromise, subTokuseiDataPromise).then(this.own(
                function (armorTalentRes, mainTokuseiRes, subTokuseiRes) {
                    // 取得したデータを画面表示用に変換してバインド
                    // this._armorTalentData = this._convertResToArmorTalentData(armorTalentRes);
                    // h5.core.view.bind('.armorTalentContainer', {
                    //     armorItems: this._armorTalentData
                    // });

                    this._armorItemsData = this._convertToArmorItemsData(armorTalentRes, mainTokuseiRes, subTokuseiRes);
                    h5.core.view.bind('.armorTalentContainer', {
                        armorItems: this._armorItemsData
                    });
                },
                function () {
                    errAlert();
                }
            ));

            // // 防具タレントのデータを取得
            // this._logic.getArmorTalentData().done(this.own(function (armorTalentDataRes) {
            //     // 取得したデータを画面表示用に変換してバインド
            //     this._armorTalentData = this._convertResToArmorTalentData(armorTalentDataRes);
            //     h5.core.view.bind('.armorTalentContainer', {
            //         armorItems: this._armorTalentData
            //     });
            // }));

            // セットボーナスのデータを取得
            this._logic.getSetBounusData().done(this.own(function (setBounusDataRes) {
                // 取得したデータを画面表示用に変換してバインド
                this._setBounusData = this._convertResToSetBounusData(setBounusDataRes);
                h5.core.view.bind('.setBounusContainer', {
                    setBounusList: this._setBounusList
                });
            }));
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
                    firearms: ARMOR_STATUS.MAX,// 銃器ステータス値。初期は選択状態なのでMAX値を設定
                    stamina: ARMOR_STATUS.MIN,// スタミナステータス値。初期は非選択状態なのでMIN値を設定
                    electron: ARMOR_STATUS.MIN,// 電子機器ステータス値。初期は非選択状態なのでMIN値を設定
                    tokuseiList: tokuseiList,// 特性一覧
                    selectedTokusei: null// 選択した特性のマップ
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
            strAry.forEach(this.own(function (str) {
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
            strAry.forEach(this.own(function (str) {
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
            label += ' ' + min + '-' + max;
            return label;
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