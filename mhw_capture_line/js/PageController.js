(function ($) {
    'use strict';

    var MULTI_CORRECTION_VAL = 2.7;

    var manager = h5.core.data.createManager('MonsterInfoManager');
    var model = manager.createModel({
        name: 'MonsterInfoModel',
        schema: {
            id: {
                id: true
            },
            base: {
                defaultValue: '-'
            },
            multiCorrection: {
                defaultValue: MULTI_CORRECTION_VAL
            },
            captureLine: {
                defaultValue: '-'
            },
            requiredTotalDmg: {
                defaultValue: '-'
            },
            requiredKaryokuYouinDmgForOne: {
                defaultValue: '-'
            }
        }
    });

    /**
	 * ページコントローラ
	 */
    var pageController = {

        __name: 'sandbox.MhwCaptureLine.PageController',

        __templates: ['tmpl/index.ejs'],

        _monstersInfo: null,
        _$targetsList: null,
        _$rekisenHosei: null,
        _$hiKaryokuYouinNum: null,
        _$hiKaryokuYouinDmg: null,

        __init: function () {
            this._monstersInfo = MhwCaptureLine.MonstersInfo;
            this.view.append(this.rootElement, 'CaptureLineContents', {
                targetInfoList: this._monstersInfo
            });
        },

        __ready: function () {
            this._item = model.create({
                id: 'MonsterInfoItem',
            });
            this.view.bind(this.rootElement, this._item);

            this._$targetsList = this.$find('.targets-list');
            this._$rekisenHosei = this.$find('.rekisen-hosei');
            this._$hiKaryokuYouinNum = this.$find('.hi-karyoku-youin-num');
            this._$hiKaryokuYouinDmg = this.$find('.hi-karyoku-youin-dmg');

            this._updateDmg();
        },

        _updateDmg: function () {
            var targetName = this._$targetsList.val();
            var targetInfo = this._getTargetInfo(targetName);

            var base = targetInfo.base;// 基準値
            var captureLine = targetInfo.captureLine;// 捕獲ライン[%]

            var requiredTotalDmg = this._calcRequiredTotalDmg(targetInfo);// 必要合計dmg
            var requiredKaryokuYouinDmgForOne = this._calcRequiredKaryokuYouinDmgForOne(requiredTotalDmg);

            // 表示上の基準値、捕獲ラインを更新
            this._item.set({
                base: base,
                captureLine: captureLine * 100,
                requiredTotalDmg: requiredTotalDmg,
                requiredKaryokuYouinDmgForOne: requiredKaryokuYouinDmgForOne
            });
        },

        _getTargetInfo: function (targetName) {
            var result = null;
            $.each(this._monstersInfo, function (idx, info) {
                if (info.name === targetName) {
                    result = info;
                    return false;
                }
            });
            return result;
        },

        _calcRequiredTotalDmg: function (info) {
            var rekisenHosei = parseFloat(this._$rekisenHosei.val());
            return info.base * MULTI_CORRECTION_VAL * (1 - info.captureLine) * rekisenHosei;
        },

        _calcRequiredKaryokuYouinDmgForOne: function (requiredTotalDmg) {
            var hiKaryokuYouinNum = this._$hiKaryokuYouinNum.val();
            var hiKaryokuYouinDmg = this._$hiKaryokuYouinDmg.val();
            var result = (requiredTotalDmg - hiKaryokuYouinDmg) / (4 - hiKaryokuYouinNum);
            return result;
        },

        '.rekisen-hosei change': function (context, $el) {
            this._updateDmg();
        },

        '.targets-list change': function (context, $el) {
            var val = $el.val();
            if (val === 'none') {
                // TODO 
            }
        }
    };

    $(function () {
        // MEMO
        // デバッグ時に開発者ツールからコントローラへのアクセスを容易にするために
        // グローバルスコープにコントローラを公開している
        // 開発終了前に修正すること
        window.c = h5.core.controller('.root-container', pageController);
        // h5.core.controller('body', pageController);
    });

})(jQuery);