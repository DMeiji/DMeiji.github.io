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
        hurutya: {
            '0': { kisokougeki: 0 },
            '1': { kisokougeki: 5 },
            '2': { kisokougeki: 10 },
            '3': { kisokougeki: 20 }
        },
        tyoukai: {
            '0': { chCorrection: 1.25 },
            '1': { chCorrection: 1.30 },
            '2': { chCorrection: 1.35 },
            '3': { chCorrection: 1.40 }
        },
        muzokusei: {
            '0': { skillCorrection: 1.0 },
            '1': { skillCorrection: 1.1 }
        },
        zokuseikyouka: {
            '0': { zokuseikyouka: 0 },
            '1': { zokuseikyouka: 1 },
            '2': { zokuseikyouka: 2 },
            '3': { zokuseikyouka: 3 },
            '4': { zokuseikyouka: 4 },
            '5': { zokuseikyouka: 5 }
        },
        zokuseikaisin: {
            '0': { attrChCorrection: 1.0 },
            '1': { attrChCorrection: 1.25 }
        }
    };

    var skillNameMap = {
        kougeki: '攻撃',
        mikiri: '見切り',
        tuugeki: '痛撃',
        konsin: '渾身',
        tyousen: '挑戦',
        hurutya: 'ﾌﾙﾁｬｰｼﾞ',
        tyoukai: '超会心',
        muzokusei: '無属性強化',
        zokuseikyouka: '〇属性強化',
        zokuseikaisin: '属性会心'
    };

    var enhanceNameMap = {
        kisokougeki: '+攻撃',
        chRate: '+会心'
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
            hurutya: '0',
            tyoukai: '0',
            muzokusei: '0',
            zokuseikyouka: '0',
            zokuseikaisin: '0'
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

        toggleActiveSkill: function (param) {
            // 選択した武器の無属性フラグから無属性強化スキルの活性/非活性を判定
            var $muzokusei = this.$find('.muzokuseiSkillSelect');
            var $zokuseikyouka = this.$find('.zokuseikyoukaSkillSelect');
            var $zokuseikaisin = this.$find('.zokuseikaisinSkillSelect');
            var isMuzokusei = param.isMuzokusei;
            if (isMuzokusei != null) {
                if (param.isMuzokusei) {
                    // 武器の無属性フラグがtrueの場合、項目を活性化する
                    $muzokusei.prop('disabled', false);
                    // 〇属性強化項目を非活性にする
                    $zokuseikyouka.prop('disabled', true);
                    $zokuseikyouka[0].selectedIndex = 0;
                    this._selectedSkillLvMap['zokuseikyouka'] = '0';// 選択したスキルレベルマップの値を更新
                    // 〇属性強化、属性会心の項目を非活性にする
                    $zokuseikaisin.prop('disabled', true);
                    $zokuseikaisin[0].selectedIndex = 0;
                    this._selectedSkillLvMap['zokuseikaisin'] = '0';// 選択したスキルレベルマップの値を更新
                } else {
                    // 武器の無属性フラグがfalseの場合、項目を非活性にしLvを0にする
                    $muzokusei.prop('disabled', true);
                    $muzokusei[0].selectedIndex = 0;
                    this._selectedSkillLvMap['muzokusei'] = '0';// 選択したスキルレベルマップの値を更新
                    // 〇属性強化項目を活性化する
                    $zokuseikyouka.prop('disabled', false);
                    // 属性会心項目を活性化する
                    $zokuseikaisin.prop('disabled', false);
                }
            }

            // 選択した肉質に応じて痛撃スキルの活性/非活性を判定
            var $tuugeki = this.$find('.tuugekiSkillSelect')
            if (0.45 <= param.nikusitu) {
                // 肉質が0.45以上ならば活性
                $tuugeki.prop('disabled', false);
            } else {
                // 肉質が0.44以下ならば非活性
                $tuugeki.prop('disabled', true);
                $tuugeki[0].selectedIndex = 0;
                this._selectedSkillLvMap['tuugeki'] = '0';// 選択したスキルレベルマップの値を更新
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
                kisokougeki: 15,// 力の爪+力の護符分を加算
                chRate: 0,
                chCorrection: 1.25,
                skillCorrection: 1.0
            };
            // 攻撃
            var kougekiEffect = skillEffectMap.kougeki[this._selectedSkillLvMap.kougeki];
            result.kisokougeki += kougekiEffect.kisokougeki;
            result.chRate += kougekiEffect.chRate;
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
            // フルチャージ
            var hurutyaEffect = skillEffectMap.hurutya[this._selectedSkillLvMap.hurutya];
            result.kisokougeki += hurutyaEffect.kisokougeki;
            // 超会心
            var tyoukaiEffect = skillEffectMap.tyoukai[this._selectedSkillLvMap.tyoukai];
            result.chCorrection = tyoukaiEffect.chCorrection;
            // 無属性強化
            var muzokuseiEffect = skillEffectMap.muzokusei[this._selectedSkillLvMap.muzokusei];
            result.skillCorrection = muzokuseiEffect.skillCorrection;
            // 〇属性強化
            var zokuseikyoukaEffect = skillEffectMap.zokuseikyouka[this._selectedSkillLvMap.zokuseikyouka];
            result.zokuseikyouka = zokuseikyoukaEffect.zokuseikyouka;
            //　属性会心
            var zokuseikaisinEffect = skillEffectMap.zokuseikaisin[this._selectedSkillLvMap.zokuseikaisin];
            result.attrChCorrection = zokuseikaisinEffect.attrChCorrection;

            // カスタム強化スロット
            var cntOfSelectedKisokougeki = 0;
            $.each(this._selectedCustomEnhanceItems, function (itemIdx, enhanceName) {
                if (enhanceName == null || enhanceName === '-') {
                    // カスタム強化セレクトボックスの先頭（'-'）を選択している、または、生成してから変更していない場合は無視する
                    return;
                }
                var effectVal;
                if (enhanceName === 'chRate') {
                    // 会心を指定した場合は、既に選択した会心の数によって強化値が軽減される
                    switch (cntOfSelectedKisokougeki) {
                        case 0:
                            effectVal = 10;
                            break;
                        case 1:
                            effectVal = 5;
                            break;
                        default:
                            // TODO 3つとも会心を強化した場合の3スロット目の強化値は未確認
                            effectVal = 5;
                            break;
                    }
                    result[enhanceName] += effectVal;
                    cntOfSelectedKisokougeki++;
                    return;
                }
                result[enhanceName] += 5;
            });

            return result;
        },

        getOptionData: function () {
            return this._calcOptionData();
        },

        getSelectedSkillsInfo: function () {
            return $.map(this._selectedSkillLvMap, function (lv, skillName) {
                return {
                    skillName: skillNameMap[skillName],
                    lv: lv
                };
            });
        },

        getSelectedCustomEnhance: function () {
            return $.map(this._selectedCustomEnhanceItems, function (enhanceName, idx) {
                return enhanceNameMap[enhanceName];
            });
        }
    };
    h5.core.expose(optionContainerController);
})(jQuery);