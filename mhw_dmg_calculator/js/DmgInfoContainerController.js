(function ($) {
    'use strict';

    var TUME_GOHU_KISOKOUGEKI = 15;// 力の爪、護符による基礎攻撃力上昇値
    var NIKUSITU = 0.8;// 肉質。0.8固定とする
    var ATTR_NIKUSITU = 0.275;// 属性軽減率

    var manager = h5.core.data.createManager('dmgInfoManager');
    var model = manager.createModel({
        name: 'dmgInfoModel',
        schema: {
            id: { id: true },
            power: { defaultValue: '-' },
            chCorrection: { defaultValue: 1.25 },// 会心補正
            chRate: { defaultValue: 0 },// 会心率
            oneHitDmg: { defaultValue: '-' },
            oneChHitDmg: { defaultValue: '-' },
            tenHitTotalDmg: { defaultValue: '-' },
            attrVal: { defaultValue: '-' },
            oneHitAttrDmg: { defaultValue: '-' },
            oneChHitAttrDmg: { defaultValue: '-' },
            tenHitTotalAttrDmg: { defaultValue: '-' },
            oneHitPhysicalAndAttrDmg: { defaultValue: '-' },
            oneChHitPhysicalAndAttrDmg: { defaultValue: '-' },
            tenHitTotalPhysicalAndAttrDmg: { defaultValue: '-' }
        }
    });

    var calcZokuseikyouka = {
        '0': function (attrVal) { return attrVal },
        '1': function (attrVal) { return attrVal + 3; },
        '2': function (attrVal) { return attrVal + 6; },
        '3': function (attrVal) { return attrVal + 10; },
        '4': function (attrVal) { return attrVal * 1.05 + 10; },
        '5': function (attrVal) { return attrVal * 1.10 + 10; }
    };

    /**
	 * ダメージ情報コンテナコントローラ
	 */
    var dmgInfoContainerController = {

        __name: 'MhwDmgCalculator.controller.DmgInfoContainerController',

        _dmgInfoDataItem: null,// ダメージ情報テーブルにデータバインドするデータアイテム
        _weaponTypeCalcInfo: null,// 計算に使用する武器種ごとの固定情報（武器係数・モーション値）
        _sharpness: null,// 切れ味補正
        _nikusitu: null,// 肉質

        __ready: function () {
            this._dmgInfoDataItem = model.create({
                id: '000'
            });
            this.view.bind(this.rootElement, this._dmgInfoDataItem);
            this._sharpness = parseFloat(this.$find('.selectSharpness').val());
            this._nikusitu = parseFloat(this.$find('.selectNikusitu').val());
        },

        init: function (param) {
            this._weaponTypeCalcInfo = param.weaponTypeCalcInfo;
        },

        updateDmgInfo: function (weaponData, selectedWeaponTypeId, optionData) {
            var item = this._dmgInfoDataItem;
            item.set('power', weaponData.power);// 表示攻撃力を更新

            // 武器自体の会心率とオプションコンテナの選択情報から最終的な会心率で更新
            var newChRate = weaponData.chRate + optionData.chRate;
            newChRate = 100 < newChRate ? 100 : newChRate;// 会心率が100を超える場合は100とする
            item.set('chRate', newChRate);

            // 会心補正を、最終会心率がマイナスの場合は0.75に、プラスの場合はオプションコンテナの情報の値で更新
            // TODO マイナス会心時に超会心は発動しないことの確認が必要
            var newChCorrection = newChRate < 0 ? 0.75 : optionData.chCorrection;
            item.set('chCorrection', newChCorrection);

            var attrValInfo = this._calcAttrValInfo(weaponData.attr, optionData);// 属性値情報
            var attrVal = attrValInfo.attrVal;
            item.set('attrVal', attrVal);
            var $attrVal = this.$find('[data-h5-bind="attrVal"]');
            attrValInfo.isOverLimit ? $attrVal.addClass('overLimitVal') : $attrVal.removeClass('overLimitVal');

            var calcResult = this._calcDmg(weaponData, selectedWeaponTypeId, attrVal, optionData);
            item.set('oneHitDmg', calcResult.oneHitDmg);// 単発dmgを更新
            item.set('oneChHitDmg', calcResult.oneChHitDmg);// 会心dmgを更新
            item.set('tenHitTotalDmg', calcResult.tenHitTotalDmg);// 会心を考慮した10回攻撃の合計dmgを更新
            item.set('oneHitAttrDmg', calcResult.oneHitAttrDmg);// 属性単発dmg
            item.set('oneChHitAttrDmg', calcResult.oneChHitAttrDmg);// 属性会心dmg
            item.set('tenHitTotalAttrDmg', calcResult.tenHitTotalAttrDmg);// 属性単発dmg*10
            item.set('oneHitPhysicalAndAttrDmg', calcResult.oneHitPhysicalAndAttrDmg);
            item.set('oneChHitPhysicalAndAttrDmg', calcResult.oneChHitPhysicalAndAttrDmg);
            item.set('tenHitTotalPhysicalAndAttrDmg', calcResult.tenHitTotalPhysicalAndAttrDmg);
        },

        _calcAttrValInfo: function (attrVal, optionData) {
            var baseAttrVal = attrVal / 10;
            var limitAttrVal = Math.round(baseAttrVal * 1.33 * 100) / 100;
            var calcResultAttrVal = calcZokuseikyouka[optionData.zokuseikyouka](baseAttrVal);
            return {
                attrVal: limitAttrVal <= calcResultAttrVal ? limitAttrVal : calcResultAttrVal,
                isOverLimit: limitAttrVal <= calcResultAttrVal && calcResultAttrVal !== 0
            };
        },

        _calcDmg: function (weaponData, weaponTypeId, attrVal, optionData) {
            if (weaponTypeId === 'yumi') {
                return this._calcGunnerDmg(weaponData, weaponTypeId, attrVal, optionData);
            }
            return this._calcSwordsmanDmg(weaponData, weaponTypeId, attrVal, optionData);
        },

        _calcSwordsmanDmg: function (weaponData, weaponTypeId, attrVal, optionData) {
            var bukikeisu = this._weaponTypeCalcInfo[weaponTypeId].bukikeisu;// 武器係数
            var motionVal = this._weaponTypeCalcInfo[weaponTypeId].motionVal;// モーション値
            var kisokougeki = weaponData.power / bukikeisu + optionData.kisokougeki;// 基礎攻撃力（＝素材攻撃力 / 武器係数）
            var sharpness = this._sharpness;// 切れ味補正
            var nikusitu = this._nikusitu;// 肉質
            var chCorrection = this._dmgInfoDataItem.get('chCorrection');// 会心補正
            var chRate = this._dmgInfoDataItem.get('chRate') / 100;// 会心率

            // 剣士物理dmg計算式
            // 基礎攻撃力 * モーション値 * 切れ味補正 * 会心補正 * アイテム・スキル補正 * 肉質(0.8)
            var oneHitDmg = (kisokougeki * motionVal * sharpness * 1 * optionData.skillCorrection * nikusitu).toFixed(2);
            var oneChHitDmg = (kisokougeki * motionVal * sharpness * chCorrection * optionData.skillCorrection * nikusitu).toFixed(2);
            var tenHitTotalDmg = (10 * (1 - Math.abs(chRate)) * oneHitDmg + 10 * Math.abs(chRate) * oneChHitDmg).toFixed(2);

            // 剣士属性dmg計算式
            // 属性値 * 切れ味補正 * 武器補正(＝1) * 会心補正(1 or 1.25) * 軽減率
            var attrSharpness = sharpness === 1.20 ? 1.0625 : 1.0;// 切れ味補正(属性)
            var oneHitAttrDmg = (attrVal * attrSharpness * 1 * 1 * ATTR_NIKUSITU).toFixed(2);
            var attrChCorrection = optionData.attrChCorrection;
            var oneChHitAttrDmg = (attrVal * attrSharpness * 1 * attrChCorrection * ATTR_NIKUSITU).toFixed(2);
            var tenHitTotalAttrDmg = chRate <= 0 ? (10 * oneHitAttrDmg).toFixed(2) : (10 * (1 - Math.abs(chRate)) * oneHitAttrDmg + 10 * Math.abs(chRate) * oneChHitAttrDmg).toFixed(2);

            // 剣士物理+属性dmg
            var oneHitPhysicalAndAttrDmg = (parseFloat(oneHitDmg) + parseFloat(oneHitAttrDmg)).toFixed(2);
            var oneChHitPhysicalAndAttrDmg = (parseFloat(oneChHitDmg) + parseFloat(oneChHitAttrDmg)).toFixed(2);
            var tenHitTotalPhysicalAndAttrDmg = (parseFloat(tenHitTotalDmg) + parseFloat(tenHitTotalAttrDmg)).toFixed(2);

            return {
                oneHitDmg: oneHitDmg,
                oneChHitDmg: oneChHitDmg,
                tenHitTotalDmg: tenHitTotalDmg,
                oneHitAttrDmg: oneHitAttrDmg,
                oneChHitAttrDmg: oneChHitAttrDmg,
                tenHitTotalAttrDmg: tenHitTotalAttrDmg,
                oneHitPhysicalAndAttrDmg: oneHitPhysicalAndAttrDmg,
                oneChHitPhysicalAndAttrDmg: oneChHitPhysicalAndAttrDmg,
                tenHitTotalPhysicalAndAttrDmg: tenHitTotalPhysicalAndAttrDmg
            };
        },

        _calcGunnerDmg: function (weaponData, weaponTypeId, attrVal, optionData) {
            var bukikeisu = this._weaponTypeCalcInfo[weaponTypeId].bukikeisu;// 武器係数
            var motionVal = this._weaponTypeCalcInfo[weaponTypeId].motionVal;// モーション値
            var kisokougeki = weaponData.power / bukikeisu + optionData.kisokougeki;// 基礎攻撃力（＝素材攻撃力 / 武器係数）
            var nikusitu = this._nikusitu;// 肉質
            var chCorrection = this._dmgInfoDataItem.get('chCorrection');// 会心補正
            var chRate = this._dmgInfoDataItem.get('chRate') / 100;// 会心率

            // ガンナー物理dmg計算式
            // 基礎攻撃力 * モーション値  * 会心補正 * アイテム・スキル補正 * 肉質(0.8)
            var oneHitDmg = (kisokougeki * motionVal * 1 * optionData.skillCorrection * nikusitu).toFixed(2);
            var oneChHitDmg = (kisokougeki * motionVal * chCorrection * optionData.skillCorrection * nikusitu).toFixed(2);
            var tenHitTotalDmg = (10 * (1 - Math.abs(chRate)) * oneHitDmg + 10 * Math.abs(chRate) * oneChHitDmg).toFixed(2);

            // ガンナー属性dmg計算式
            // 属性値 * 武器補正(＝1) * 会心補正(1 or 1.25) * 軽減率
            var oneHitAttrDmg = (attrVal * 1 * 1 * ATTR_NIKUSITU).toFixed(2);
            var oneChHitAttrDmg = (attrVal * 1 * optionData.attrChCorrection * ATTR_NIKUSITU).toFixed(2);
            var tenHitTotalAttrDmg = chRate <= 0 ? (10 * oneHitAttrDmg).toFixed(2) : (10 * (1 - Math.abs(chRate)) * oneHitAttrDmg + 10 * Math.abs(chRate) * oneChHitAttrDmg).toFixed(2);

            // ガンナー物理+属性dmg
            var oneHitPhysicalAndAttrDmg = (parseFloat(oneHitDmg) + parseFloat(oneHitAttrDmg)).toFixed(2);
            var oneChHitPhysicalAndAttrDmg = (parseFloat(oneChHitDmg) + parseFloat(oneChHitAttrDmg)).toFixed(2);
            var tenHitTotalPhysicalAndAttrDmg = (parseFloat(tenHitTotalDmg) + parseFloat(tenHitTotalAttrDmg)).toFixed(2);

            return {
                oneHitDmg: oneHitDmg,
                oneChHitDmg: oneChHitDmg,
                tenHitTotalDmg: tenHitTotalDmg,
                oneHitAttrDmg: oneHitAttrDmg,
                oneChHitAttrDmg: oneChHitAttrDmg,
                tenHitTotalAttrDmg: tenHitTotalAttrDmg,
                oneHitPhysicalAndAttrDmg: oneHitPhysicalAndAttrDmg,
                oneChHitPhysicalAndAttrDmg: oneChHitPhysicalAndAttrDmg,
                tenHitTotalPhysicalAndAttrDmg: tenHitTotalPhysicalAndAttrDmg
            };
        },

        '.selectSharpness change': function (context, $el) {
            this._sharpness = parseFloat($el.val())
            this.trigger('changeSharpness');
        },

        '.selectNikusitu change': function (context, $el) {
            this._nikusitu = parseFloat($el.val());
            this.trigger('changeNikusitu', {
                nikusitu: this._nikusitu
            });
        },

        getDmgInfoDataItem: function () {
            return this._dmgInfoDataItem;
        },

        getNikusitu: function () {
            return this._nikusitu;
        }
    };
    h5.core.expose(dmgInfoContainerController);
})(jQuery);