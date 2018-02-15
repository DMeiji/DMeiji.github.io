(function ($) {
    'use strict';

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'MhwDmgCalculator.controller.PageController',

        __templates: ['./ejs/index.ejs'],

        _logic: MhwDmgCalculator.logic.PageLogic,

        _dmgInfoContainerController: MhwDmgCalculator.controller.DmgInfoContainerController,
        _optionContainerController: MhwDmgCalculator.controller.OptionContainerController,

        __meta: {
            _dmgInfoContainerController: {
                rootElement: '.dmgInfoRootContainer'
            },
            _optionContainerController: {
                rootElement: '.optionContainer'
            }
        },

        _isSelectedWeapon: false,// 武器が選択されているかどうかのフラグ
        _weaponData: null,// 武器データ
        _weaponTypeDataList: null,// セレクトボックスに反映する武器種データ。配列
        _weaponDataList: [],// セレクトボックスに反映する武器データ。obsAry
        _selectedWeaponTypeId: null,// 選択している武器種のID
        _selectedWeaponData: null,// 選択している武器のデータ

        __init: function () {
            this._weaponDataList = h5.core.data.createObservableArray();
            // 武器情報を取得・変換してキャッシュ
            var weaponListPromise = this._logic.getWeaponList().done(this.own(function (weaponData) {
                this._weaponData = weaponData;
            }));
            // 武器種情報を取得・変換してキャッシュ
            var weaponTypeListPromise = this._logic.getWeaponTypeList().done(this.own(function (weaponTypeDataList) {
                this._weaponTypeDataList = weaponTypeDataList;
            }));
            // 計算に使用する武器種ごとの固定情報（武器係数・モーション値）を取得してキャッシュ
            var weaponTypeCalcInfoPromise = this._logic.getWeaponTypeCalcInfo().done(this.own(function (weaponTypeCalcInfo) {
                this._weaponTypeCalcInfo = weaponTypeCalcInfo;
            }));
            return $.when(weaponListPromise, weaponTypeListPromise, weaponTypeCalcInfoPromise);
        },

        __ready: function () {
            this.view.bind('.selectWeaponContainer', {
                weaponTypeList: this._weaponTypeDataList,
                weaponList: this._weaponDataList
            });
            this._dmgInfoContainerController.init({
                weaponTypeCalcInfo: this._weaponTypeCalcInfo
            });
        },

        /**
         * 武器種リストのchangeハンドラ。選択した武器種に応じて武器リストを更新
         */
        '.weaponTypeList change': function (context, $el) {
            var weaponTypeId = this._selectedWeaponTypeId = $el.val();
            var selectedWeaponTypeDataList = this._getWeaponTypeDataList(weaponTypeId);
            this._weaponDataList.copyFrom(selectedWeaponTypeDataList);
            this._isSelectedWeapon = false;// 武器種を選択したら武器選択状態は解除される
        },

        _getWeaponTypeDataList: function (weaponTypeId) {
            if (this._weaponData[weaponTypeId] != null) {
                var weaponDataByTypeAry = this._weaponData[weaponTypeId];
                return $.map(weaponDataByTypeAry, function (data, idx) {
                    var weaponNameStr = data.weaponName + ' | ' + data.power + ' | ';
                    weaponNameStr += (data.attr === 0 ? '-' : data.attr) + ' | ' + (data.chRate === '' ? '0' : data.chRate) + '%';
                    return {
                        weaponName: weaponNameStr
                    };
                });
            }
            // 武器種リストの先頭（空白項目）を選択した場合は武器リストを空にするので空配列を返す
            return [];
        },

        /**
         * 武器リストのchangeハンドラ。選択した武器に応じてdmg情報を更新
         */
        '.weaponList change': function (context, $el) {
            var selectedIdx = $el[0].selectedIndex;
            if (selectedIdx === 0) {
                // FIXME
                // 先頭の項目（表記説明の項目）を選択した場合はdmg情報をクリア
                this._isSelectedWeapon = false;
                return;
            }
            var val = $el.val();
            var weaponName = val.split('|')[0].slice(0, -1);// 選択した武器名
            var weaponData = this._selectedWeaponData = this._getWeaponData(weaponName);// 選択した武器のデータ

            this._optionContainerController.createCustomEnhanceItems(weaponData);// カスタム強化枠を再生成
            this._optionContainerController.toggleActiveSkill(weaponData);// オプションコンテナのスキル活性・非活性を整理
            var optionData = this._optionContainerController.getOptionData();// オプションコンテナからオプション情報を取得
            this._dmgInfoContainerController.updateDmgInfo(weaponData, this._selectedWeaponTypeId, optionData);


            this._isSelectedWeapon = true;
        },

        _getWeaponData: function (weaponName) {
            var weaponDataList = this._weaponData[this._selectedWeaponTypeId];
            var result = null;
            $.each(weaponDataList, function (idx, weaponData) {
                if (weaponData.weaponName === weaponName) {
                    result = weaponData;
                    return false;
                }
            });
            return result;
        },

        '{rootElement} changeSharpness': function (context) {
            if (!this._isSelectedWeapon) {
                // 武器が選択されていなければ何もしない
                return;
            }
            var optionData = this._optionContainerController.getOptionData();// オプションコンテナからオプション情報を取得
            this._dmgInfoContainerController.updateDmgInfo(this._selectedWeaponData, this._selectedWeaponTypeId, optionData);
        },

        '{rootElement} changeOption': function (context) {
            if (!this._isSelectedWeapon) {
                // 武器が選択されていなければ何もしない
                return;
            }
            var optionData = context.evArg.optionData;
            this._dmgInfoContainerController.updateDmgInfo(this._selectedWeaponData, this._selectedWeaponTypeId, optionData);
        },

        '.outputButton click': function () {
            if (!this._isSelectedWeapon) {
                // 武器が選択されていない場合は何もしない
                return;
            }
            var item = this._dmgInfoContainerController.getDmgInfoDataItem();
            var $tr = $('<tr></tr>');
            $tr.append('<td class="labelCell" width=180>' + this._selectedWeaponData.weaponName + '</td>');
            $tr.append('<td class="labelCell" width=120>' + item.get('oneHitPhysicalAndAttrDmg') + '</td>');
            $tr.append('<td class="labelCell" width=150>' + item.get('oneChHitPhysicalAndAttrDmg') + '</td>');
            $tr.append('<td class="labelCell" width=152>' + item.get('tenHitTotalPhysicalAndAttrDmg') + '</td>');
            this.$find('.memoBody').prepend($tr);
        },

        '.clearButton click': function() {
            this.$find('.memoBody').empty();
        },

        '.funButton click': function() {
            alert('昔はお前みたいなハンターだった。膝に矢を受けてしまってな…');
        }
    };

    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);