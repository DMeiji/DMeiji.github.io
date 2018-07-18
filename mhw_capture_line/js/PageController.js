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
            this._monstersInfo = MhwCaptureLine.MonstersInfo;// モンスターの情報を取得
            // 画面をejsテンプレートから構築
            this.view.append(this.rootElement, 'CaptureLineContents', {
                targetInfoList: this._monstersInfo
            });
        },

        __ready: function () {
            // データアイテムを生成してデータバインド
            this._item = model.create({
                id: 'MonsterInfoItem',
            });
            this.view.bind(this.rootElement, this._item);

            this._$targetsList = this.$find('.targets-list');// ターゲットのセレクト要素をキャッシュ
            this._$rekisenHosei = this.$find('.rekisen-hosei');// 歴戦補正の要素をキャッシュ
            this._$hiKaryokuYouinNum = this.$find('.hi-karyoku-youin-num');// 非火力要員数の要素をキャッシュ
            this._$hiKaryokuYouinDmg = this.$find('.hi-karyoku-youin-dmg');// 非火力要員dmgの要素をキャッシュ

            this._updateDmg();// ダメージを再計算して表示を更新
        },

        /**
         * ダメージを計算して表示を更新
         */
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

        /**
         * キャッシュしているモンスターの情報を取得して返す
         * 
         * @param targetName 対象モンスター名(≠表示名)
         */
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

        /**
         * 必要合計dmgを計算して返す
         * 
         * @param info 対象モンスターの情報
         */
        _calcRequiredTotalDmg: function (info) {
            var rekisenHosei = parseFloat(this._$rekisenHosei.val());
            return info.base * MULTI_CORRECTION_VAL * (1 - info.captureLine) * rekisenHosei;
        },

        /**
         * 火力要員一人あたりの必要dmgを計算して返す
         * 
         * @param requiredTotalDmg 必要合計dmg
         */
        _calcRequiredKaryokuYouinDmgForOne: function (requiredTotalDmg) {
            var hiKaryokuYouinNum = this._$hiKaryokuYouinNum.val();// 非火力要員数
            var hiKaryokuYouinDmg = this._$hiKaryokuYouinDmg.val();// 非火力要員のdmg
            var result = (requiredTotalDmg - hiKaryokuYouinDmg) / (4 - hiKaryokuYouinNum);
            result = Math.ceil(result);// 単数は切り上げとする
            return result;
        },

        /**
         * 歴戦補正のchangeハンドラ<p>
         * dmgを再計算して表示を更新
         */
        '.rekisen-hosei change': function (context, $el) {
            this._updateDmg();
        },

        /**
         * 非火力要員人数のchangeハンドラ<p>
         * dmgを再計算して表示を更新
         */
        '.hi-karyoku-youin-num change': function (context, $el) {
            this._parseInt($el);
            this._updateDmg();
        },

        /**
         * 非火力要員dmgのchangeハンドラ<p>
         * dmgを再計算して表示を更新
         */
        '.hi-karyoku-youin-dmg change': function (context, $el) {
            this._parseInt($el);
            this._updateDmg();
        },

        _parseInt: function ($el) {
            var valStr = $el.val();
            var val = parseInt(valStr);
            if (isNaN(val)) {
                $el.val(0);
                return;
            }
            $el.val(val);
        },

        /**
         * ターゲットのchangeハンドラ<p>
         * dmgを再計算して表示を更新
         */
        '.targets-list change': function (context, $el) {
            this._updateDmg();
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