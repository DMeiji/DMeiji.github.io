(function ($) {
    'use strict';

    var consts = MhwSkillBuildExpectation.consts;
    var BASE_KISO_KOUGEKI = 100;

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'MhwSkillBuildExpectation.logic.PageLogic',

        getSkillEffectData: function () {
            return h5.ajax('./data/skillEffect.json');
        },

        convertSkillsInfoToChartData: function (skillsInfo, skillEffectData) {
            var sumSkillEffect = this._calcSumSkillEffect(skillsInfo, skillEffectData);// 各スキル効果の合計を算出
            var dmgExpectation = this._calcDmgExpectation(sumSkillEffect);
            return dmgExpectation;
        },

        _calcSumSkillEffect: function (skillsInfo, skillEffectData) {
            var result = {
                kisokougeki: 0,
                chRate: 0,
                chCorrection: 1.25,
                skillCorrection: 1
            };
            $.each(skillsInfo, function (idx, skillNameAndLv) {
                // skillNameAndLvは kougeki1 のようにスキル名+Lvの文字列
                var skillName = skillNameAndLv.slice(0, -1);
                var skillLv = skillNameAndLv.slice(-1);
                var skillEffect = skillEffectData[skillName][skillLv];
                $.each(skillEffect, function (effectName, effectVal) {
                    // effectName の例：kisokougeki
                    if (effectName === 'chCorrection' || effectName === 'skillCorrection') {
                        if (result[effectName] < effectVal) {
                            result[effectName] = effectVal;
                        }
                        return;
                    }
                    result[effectName] += effectVal;
                });
            });
            return result;
        },

        _calcDmgExpectation: function (sumSkillEffect) {
            var baseDmg = this._calcBaseDmg(sumSkillEffect.kisokougeki, sumSkillEffect.skillCorrection);
            var result = [];
            var that = this;
            $.each(consts.CH_RATE_ARY, function (idx, chRate) {
                var ch = chRate + sumSkillEffect.chRate;
                ch = 100 < ch ? 100 : ch;
                var cr = sumSkillEffect.chCorrection;
                var expectation = that._calcExpectation(baseDmg, ch, cr);
                result.push(expectation);
            });
            return result;
        },

        /**
         * 基礎dmgを算出
         * <p>
         * (基礎攻撃力 + 補正基礎攻撃力) * スキル・アイテム補正
         */
        _calcBaseDmg: function (kisokougeki, skillCorrection) {
            return (BASE_KISO_KOUGEKI + kisokougeki) * skillCorrection;
        },

        /**
         * dmg期待値を算出。ch...会心率,cr...会心補正
         * <p>
         * 基礎dmg * (1 - ch + ch*cr)
         */
        _calcExpectation: function (baseDmg, chRate, chCorrection) {
            var ch = Math.abs(chRate) / 100;
            var cr = chRate < 0 ? 0.75 : chCorrection;
            var calcResult = baseDmg * (1 - ch + ch * cr);
            return Math.round(calcResult * 100) / 100;
        },

        convertSkillsInfoToSkillsStr: function (skillsInfo) {
            var result = '';
            $.each(skillsInfo, function (idx, skillNameAndLv) {
                var skillName = consts.SKILL_NAME_MAP[skillNameAndLv.slice(0, -1)];
                var skillLv = skillNameAndLv.slice(-1);
                result += skillName + 'Lv' + skillLv;
                if (idx !== skillsInfo.length - 1) {
                    result += '／';
                }
            });
            return result;
        }
    };

    h5.core.expose(pageLogic);
})(jQuery);