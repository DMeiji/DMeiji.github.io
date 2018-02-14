(function ($) {
    'use strict';

    // レア度とカスタム強化スロット数のマップ
    var slotNumMapByRare = {
        '6': 3,
        '7': 2,
        '8': 1
    };

    // スキルレベルと効果のマップ
    var skillEffectMap = {
        kougeki: {
            '0': { kisokougeki: 0, chRate: 0 },
            '1': { kisokougeki: 3, chRate: 0 },
            '2': { kisokougeki: 6, chRate: 0 },
            '3': { kisokougeki: 9, chRate: 0 },
            '4': { kisokougeki: 12, chRate: 5 },
            '5': { kisokougeki: 15, chRate: 5 },
            '6': { kisokougeki: 18, chRate: 5 },
            '7': { kisokougeki: 21, chRate: 5 }
        },
        mikiri: {
            '0': { chRate: 0 },
            '1': { chRate: 3 },
            '2': { chRate: 6 },
            '3': { chRate: 10 },
            '4': { chRate: 15 },
            '5': { chRate: 20 },
            '6': { chRate: 25 },
            '7': { chRate: 30 }
        },
        tuugeki: {
            '0': { chRate: 0 },
            '1': { chRate: 15 },
            '2': { chRate: 30 },
            '3': { chRate: 50 }
        },
        konsin: {
            '0': { chRate: 0 },
            '1': { chRate: 10 },
            '2': { chRate: 20 },
            '3': { chRate: 30 }
        },
        tyousen: {
            '0': { kisokougeki: 0, chRate: 0 },
            '1': { kisokougeki: 4, chRate: 3 },
            '2': { kisokougeki: 8, chRate: 6 },
            '3': { kisokougeki: 12, chRate: 9 },
            '4': { kisokougeki: 16, chRate: 12 },
            '5': { kisokougeki: 20, chRate: 15 }
        },
        tyoukai: {
            '0': { chCorrection: 1.25 },
            '1': { chCorrection: 1.30 },
            '2': { chCorrection: 1.35 },
            '3': { chCorrection: 1.40 }
        },
        muzokusei: {
            '0': {
                skillCorrection: 1.0
            },
            '1': {
                skillCorrection: 1.1
            }
        }
    };

    /**
	 * オプションコンテナコントローラ
	 */
    var optionContainerController = {

        __name: 'MhwDmgCalculator.controller.OptionContainerController',

        // 選択中のカスタム強化項目
        _selectedCustomEnhanceItems: {},

        // 選択中の各スキルレベルのマップ
        _selectedSkillLvMap: {
            kougeki: '0',
            mikiri: '0',
            tuugeki: '0',
            konsin: '0',
            tyousen: '0',
            tyoukai: '0',
            muzokusei: '0'
        },

        /**
         * カスタム強化のセレクトボックスをレア度に応じて生成
         */
        createCustomEnhanceItems: function (weaponData) {
            var $customEnhanceItems = this.$find('.customEnhanceItems');
            $customEnhanceItems.empty();
            var slotNum = slotNumMapByRare[weaponData.rare];
            this.view.append($customEnhanceItems, 'CustomEnhanceItems', {
                slotNum: slotNum
            });
            this._selectedCustomEnhanceItems = {};
            for (var i = 0; i < slotNum; i++) {
                this._selectedCustomEnhanceItems[i] = null;
            }
        },

        /**
         * カスタム強化スロットのchangeハンドラ。選択したスロットの情報を更新
         * <p>
         * changeOptionイベントをトリガ
         */
        '.customEnhanceSelect change': function (context, $el) {
            var idx = $el.data('customEnhanceItemIndex');
            var val = $el.val();
            this._selectedCustomEnhanceItems[idx] = val;
            this._triggerChangeOption();
        },

        _triggerChangeOption: function () {
            this.trigger('changeOption', {
                optionData: this.getOptionData()
            });
        },

        /**
         * スキルセレクトボックスのchangeハンドラ。選択したスキルの情報を更新
         * <p>
         * changeOptionイベントをトリガ
         */
        '.skillSelect change': function (context, $el) {
            var skillName = $el.data('skillName');
            var skillLv = $el.val();
            this._selectedSkillLvMap[skillName] = skillLv;
            this._triggerChangeOption();
        },

        _calcOptionData: function () {
            var result = {
                kisokougeki: 0,
                chRate: 0,
                chCorrection: 1.25,
                skillCorrection: 1.0
            };
            // 攻撃
            var kougekiEffect = skillEffectMap.kougeki[this._selectedSkillLvMap.kougeki];
            result.kisokougeki = kougekiEffect.kisokougeki;
            result.chRate = kougekiEffect.chRate;
            // 見切り
            var mikiriEffect = skillEffectMap.mikiri[this._selectedSkillLvMap.mikiri];
            result.chRate += mikiriEffect.chRate;
            // 痛撃
            var tuugekiEffect = skillEffectMap.tuugeki[this._selectedSkillLvMap.tuugeki];
            result.chRate += tuugekiEffect.chRate;
            //　渾身
            var konsinEffect = skillEffectMap.konsin[this._selectedSkillLvMap.konsin];
            result.chRate += konsinEffect.chRate;
            // 挑戦者
            var tyousenEffect = skillEffectMap.tyousen[this._selectedSkillLvMap.tyousen];
            result.kisokougeki += tyousenEffect.kisokougeki;
            result.chRate += tyousenEffect.chRate;
            // 超会心
            var tyoukaiEffect = skillEffectMap.tyoukai[this._selectedSkillLvMap.tyoukai];
            result.chCorrection = tyoukaiEffect.chCorrection;
            // 無属性強化
            var muzokuseiEffect = skillEffectMap.muzokusei[this._selectedSkillLvMap.muzokusei];
            result.skillCorrection = muzokuseiEffect.skillCorrection;

            // カスタム強化スロット
            $.each(this._selectedCustomEnhanceItems, function (itemIdx, enhanceName) {
                if (enhanceName == null || enhanceName === '-') {
                    // カスタム強化セレクトボックスの先頭（'-'）を選択している、または、生成してから変更していない場合は無視する
                    return;
                }
                var effectVal;
                effectVal = enhanceName === 'kisokougeki' ? 5 : 10;
                result[enhanceName] += effectVal;
            });

            return result;
        },

        getOptionData: function () {
            return this._calcOptionData();
        }
    };
    h5.core.expose(optionContainerController);
})(jQuery);