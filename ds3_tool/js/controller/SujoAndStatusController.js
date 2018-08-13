(function ($) {
    'use strict';

    var STATUS_LIST = [
        'seimeiryoku',
        'syutyuryoku',
        'jikyuryoku',
        'tairyoku',
        'kinryoku',
        'giryo',
        'riryoku',
        'sinkou',
        'un'
    ];

    var OPTIMAL_SUJO_CLASS = 'optimal-sujo';

    var manager = h5.core.data.createManager('SujoAndStatusManager');
    var sujoAndStatusModel = manager.createModel({
        name: 'SujoAndStatusModel',
        schema: {
            id: {
                id: true
            },
            sujo: null,
            level: null,
            seimeiryoku: null,
            syutyuryoku: null,
            jikyuryoku: null,
            tairyoku: null,
            kinryoku: null,
            giryo: null,
            riryoku: null,
            sinkou: null,
            un: null
        }
    });

    var syokitiData = (function () {
        var obsAry = h5.core.data.createObservableArray();
        var data = ds3tool.data.syokiti;
        $.each(data, function (idx, sujoData) {
            var dataItem = sujoAndStatusModel.create({
                id: 'syokiData' + idx,
                sujo: sujoData[0],
                level: sujoData[1],
                seimeiryoku: sujoData[2],
                syutyuryoku: sujoData[3],
                jikyuryoku: sujoData[4],
                tairyoku: sujoData[5],
                kinryoku: sujoData[6],
                giryo: sujoData[7],
                riryoku: sujoData[8],
                sinkou: sujoData[9],
                un: sujoData[10]
            });
            obsAry.push(dataItem);
        });
        return {
            syokitiList: obsAry
        };
    })();

    var mokuhyotiData = (function () {
        var dataItem = sujoAndStatusModel.create({
            id: "mokuhyotiItem",
            sujo: '',
            level: 0,
            seimeiryoku: 0,
            syutyuryoku: 0,
            jikyuryoku: 0,
            tairyoku: 0,
            kinryoku: 0,
            giryo: 0,
            riryoku: 0,
            sinkou: 0,
            un: 0
        });
        return {
            mokuhyoti: dataItem
        };
    })();

    var hituyotiData = (function () {
        var obsAry = h5.core.data.createObservableArray();
        var data = ds3tool.data.hituyoti;
        $.each(data, function (idx, sujoData) {
            var dataItem = sujoAndStatusModel.create({
                id: 'hituyoData' + idx,
                sujo: sujoData[0],
                level: sujoData[1],
                seimeiryoku: sujoData[2],
                syutyuryoku: sujoData[3],
                jikyuryoku: sujoData[4],
                tairyoku: sujoData[5],
                kinryoku: sujoData[6],
                giryo: sujoData[7],
                riryoku: sujoData[8],
                sinkou: sujoData[9],
                un: sujoData[10]
            });
            obsAry.push(dataItem);
        });
        return {
            hituyotiList: obsAry
        };
    })();

    var sujoAndStatusController = {

        __name: 'ds3tool.controller.SujoAndStatusController',

        _syokitiDataItemList: syokitiData.syokitiList,
        _mokuhyotiDataItem: mokuhyotiData.mokuhyoti,
        _hituyotiDataItemList: hituyotiData.hituyotiList,

        /**
         * 初期化処理
         * 
         * @param param 画面の初期表示に必要な情報
         */
        init: function () {
            this.view.append(this.rootElement, 'sujou-and-status');
            this.view.bind('.sujo-and-syokiti-table', syokitiData);
            this.view.bind('.mokuhyoti-table', mokuhyotiData);
            this.view.bind('.sujo-and-hituyoti-table', hituyotiData);
            this._calcHituyoti();// 必要値の更新
            this._highlightOptimalSujo();// 最適素性をハイライト
        },

        // 目標値のchangeハンドラで、mokuhyotiDataを更新
        '.mokuhyoti-input-cell change': function (context, $el) {
            var val = parseInt($el.val());// 入力値
            var name = $el[0].name;// 変更した項目名
            this._mokuhyotiDataItem.set(name, val);// 変更した目標値の値をデータアイテムに反映
            this._calcHituyoti();// 必要値の更新
            this._highlightOptimalSujo();// 最適素性をハイライト
        },

        // 必要値の計算
        _calcHituyoti: function () {
            // 素性ごとに、目標値-初期値で、必要値を求める
            for (var i = 0, len = this._hituyotiDataItemList.length; i < len; i++) {
                var sujoSyokitiDataItem = this._syokitiDataItemList.get(i);//　素性の初期値データアイテム
                var sujoHituyotiDataItem = this._hituyotiDataItemList.get(i);// 素性の必要値データアイテム
                var newHituyoLv = 0;
                $.each(STATUS_LIST, this.own(function (idx, statusName) {
                    var syokiti = sujoSyokitiDataItem.get(statusName);
                    var mokuhyoti = this._mokuhyotiDataItem.get(statusName);
                    var newHituyoti = mokuhyoti - syokiti;
                    if (newHituyoti < 0) {
                        newHituyoti = 0;
                    }
                    sujoHituyotiDataItem.set(statusName, newHituyoti);
                    newHituyoLv += newHituyoti;
                }));
                sujoHituyotiDataItem.set('level', newHituyoLv);
            }
        },

        // 最適な素性をハイライト
        _highlightOptimalSujo: function () {
            this.$find('.' + OPTIMAL_SUJO_CLASS).removeClass(OPTIMAL_SUJO_CLASS);

            var hituyoLvList = [];// 各素性の必要Lvの配列
            var len = len = this._hituyotiDataItemList.length;
            for (var i = 0; i < len; i++) {
                var hituyotiDataItem = this._hituyotiDataItemList.get(i);
                hituyoLvList.push(hituyotiDataItem.get('level'));
            }
            var minLv = Math.min.apply(null, hituyoLvList);// 必要Lvの最小値
            var hituyoMinLvSujoIndexList = [];// 必要Lvが最小値の素性のindexの配列
            for (i = 0; i < len; i++) {
                var hituyotiDataItem = this._hituyotiDataItemList.get(i);
                if (hituyotiDataItem.get('level') === minLv) {
                    hituyoMinLvSujoIndexList.push(i);
                }
            }
            var $trs = this.$find('.sujo-and-hituyoti-table tbody tr');
            $.each(hituyoMinLvSujoIndexList, function (idx, sujoIdx) {
                var $tr = $trs.eq(sujoIdx);
                $tr.addClass(OPTIMAL_SUJO_CLASS);
            });
        }
    };

    h5.core.expose(sujoAndStatusController);
})(jQuery);