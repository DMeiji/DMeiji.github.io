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
            tenHitTotalAttrDmg: { defaultValue: '-' },
            oneHitPhysicalAndAttrDmg: { defaultValue: '-' },
            oneChHitPhysicalAndAttrDmg: { defaultValue: '-' },
            tenHitTotalPhysicalAndAttrDmg: { defaultValue: '-' }
        }
    });

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

            var attrVal = weaponData.attr / 10;// 属性値
            item.set('attrVal', attrVal);// 属性値（＝素材属性値を10で割った値）

            var calcResult = this._calcDmg(weaponData, selectedWeaponTypeId, optionData);
            item.set('oneHitDmg', calcResult.oneHitDmg);// 単発dmgを更新
            item.set('oneChHitDmg', calcResult.oneChHitDmg);// 単発会心dmgを更新
            item.set('tenHitTotalDmg', calcResult.tenHitTotalDmg);// 会心を考慮した10回攻撃の合計dmgを更新
            item.set('oneHitAttrDmg', calcResult.oneHitAttrDmg);// 属性単発dmg
            item.set('tenHitTotalAttrDmg', calcResult.tenHitTotalAttrDmg);// 属性単発dmg*10
            item.set('oneHitPhysicalAndAttrDmg', calcResult.oneHitPhysicalAndAttrDmg);
            item.set('oneChHitPhysicalAndAttrDmg', calcResult.oneChHitPhysicalAndAttrDmg);
            item.set('tenHitTotalPhysicalAndAttrDmg', calcResult.tenHitTotalPhysicalAndAttrDmg);
        },

        _calcDmg: function (weaponData, weaponTypeId, optionData) {
            // FIXME 剣士とガンナーのdmg計算を分ける

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
            // 属性値 * 切れ味補正 * 武器補正(＝1) * 会心補正(属性会心がなければ1) * 軽減率
            var attrSharpness = sharpness === 1.20 ? 1.0625 : 1.0;// 切れ味補正(属性)
            var oneHitAttrDmg = (weaponData.attr / 10 * attrSharpness * 1 * 1 * ATTR_NIKUSITU).toFixed(2);
            var tenHitTotalAttrDmg = (oneHitAttrDmg * 10).toFixed(2);
            // 剣士物理+属性dmg
            var oneHitPhysicalAndAttrDmg = (parseFloat(oneHitDmg) + parseFloat(oneHitAttrDmg)).toFixed(2);
            var oneChHitPhysicalAndAttrDmg = (parseFloat(oneChHitDmg) + parseFloat(oneHitAttrDmg)).toFixed(2);
            var tenHitTotalPhysicalAndAttrDmg = (parseFloat(tenHitTotalDmg) + parseFloat(tenHitTotalAttrDmg)).toFixed(2);

            return {
                oneHitDmg: oneHitDmg,
                oneChHitDmg: oneChHitDmg,
                tenHitTotalDmg: tenHitTotalDmg,
                oneHitAttrDmg: oneHitAttrDmg,
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