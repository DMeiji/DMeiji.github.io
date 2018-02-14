(function ($) {
    'use strict';

    var TUME_GOHU_KISOKOUGEKI = 15;// 力の爪、護符による基礎攻撃力上昇値
    var NIKUSITU = 0.8;// 肉質。0.8固定とする

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
            oneHitAttrDmg: { defaultValue: '-' }
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

        __ready: function () {
            this._dmgInfoDataItem = model.create({
                id: '000'
            });
            this.view.bind(this.rootElement, this._dmgInfoDataItem);
            this._sharpness = parseFloat(this.$find('.selectSharpness').val());
        },

        init: function(param) {
            this._weaponTypeCalcInfo = param.weaponTypeCalcInfo;
        },

        updateDmgInfo: function (weaponData, selectedWeaponTypeId, optionData) {
            var item = this._dmgInfoDataItem;
            item.set('power', weaponData.power);// 表示攻撃力を更新

            // 武器自体の会心率とオプションコンテナの選択情報から最終的な会心率で更新
            var newChRate = weaponData.chRate + optionData.chRate;
            item.set('chRate', newChRate);

            // 会心補正を、最終会心率がマイナスの場合は0.75に、プラスの場合はオプションコンテナの情報の値で更新
            // TODO マイナス会心時に超会心は発動しないことの確認が必要
            var newChCorrection = newChRate < 0 ? 0.75 : optionData.chCorrection;
            item.set('chCorrection', newChCorrection);

            var calcResult = this._calcDmg(weaponData, selectedWeaponTypeId, optionData);
            item.set('oneHitDmg', calcResult.oneHitDmg);// 単発dmgを更新
            item.set('oneChHitDmg', calcResult.oneChHitDmg);// 単発会心dmgを更新
            item.set('tenHitTotalDmg', calcResult.tenHitTotalDmg);// 会心を考慮した10回攻撃の合計dmgを更新
        },

        _calcDmg: function (weaponData, weaponTypeId, optionData) {
            var bukikeisu = this._weaponTypeCalcInfo[weaponTypeId].bukikeisu;// 武器係数
            var motionVal = this._weaponTypeCalcInfo[weaponTypeId].motionVal;// モーション値
            var kisokougeki = weaponData.power / bukikeisu + optionData.kisokougeki;// 基礎攻撃力
            var sharpness = this._sharpness;// 切れ味補正
            var chCorrection = this._dmgInfoDataItem.get('chCorrection');// 会心補正
            var chRate = this._dmgInfoDataItem.get('chRate') / 100;// 会心率

            var oneHitDmg = (kisokougeki * motionVal * sharpness * 1 * optionData.skillCorrection * NIKUSITU).toFixed(2);
            var oneChHitDmg = (kisokougeki * motionVal * sharpness * chCorrection * optionData.skillCorrection * NIKUSITU).toFixed(2);
            var tenHitTotalDmg = (10 * (1 - Math.abs(chRate)) * oneHitDmg + 10 * Math.abs(chRate) * oneChHitDmg).toFixed(2);
            return {
                oneHitDmg: oneHitDmg,
                oneChHitDmg: oneChHitDmg,
                tenHitTotalDmg: tenHitTotalDmg
            }
        },

        '.selectSharpness change': function(context, $el) {
            this._sharpness = $el.val();
            this.trigger('changeSharpness');
        }
    };
    h5.core.expose(dmgInfoContainerController);
})(jQuery);