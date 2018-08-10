(function ($) {
    'use strict';

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
        },

        // 目標値のchangeハンドラで、mokuhyotiDataを更新
        '.mokuhyoti-input-cell change': function (context, $el) {
            var val = $el.val();// 入力値
            var name = $el[0].name;// 変更した項目名
            this._mokuhyotiDataItem.set(name, val);// 変更した目標値の値をデータアイテムに反映
            this._calcHituyoti();// 必要値の更新
        },

        // TODO: 必要値の計算
        _calcHituyoti: function () {
            var mokuhyotiData = this._mokuhyotiDataItem.get();
            $.each(mokuhyotiData, this.own(function (key, value) {
                $.each(this._hituyotiDataItemList, function (idx, sujoHituyotiDataItem) {

                });
            }));
        }
    };

    h5.core.expose(sujoAndStatusController);
})(jQuery);