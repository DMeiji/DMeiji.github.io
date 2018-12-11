(function ($) {
    'use strict';

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'GESkillManager.logic.PageLogic',

        getSkillData: function () {
            return h5.ajax('./data/skill.csv');
        },

        /**
         * スキルデータ(csv文字列)をキーをスキルのname、値をスキル情報とするマップに変換
         * 
         * @param {String} csvStr
         * @returns スキルデータ(マップ)
         */
        convertCsvSkillDataToMap: function (csvStr) {
            var ary = csvStr.split('\n');// csv文字列を配列化

            // 先頭と末尾はデータと関係がないので除外
            ary.pop();
            ary.shift();

            var result = {};
            $.each(ary, function (idx, dataStr) {
                var dataAry = dataStr.split(',');

                var name = dataAry[0];
                var minus = dataAry[5];
                minus = minus.charCodeAt() === 13 ? '' : minus;
                result[name] = {
                    name: name,
                    kanaName: dataAry[1],
                    max: dataAry[2],
                    min: dataAry[3],
                    plus: dataAry[4],
                    minus: minus
                };
            });

            return result;
        },

        /**
         * スキルデータ(文字列)をスキルごとのオブジェクトを要素とする配列に変換
         * 
         * @param {String} csvStr
         * @returns スキルデータ(配列)
         */
        convertCsvSkillDataToArray: function (csvStr) {
            var ary = csvStr.split('\n');// csv文字列を配列化

            // 先頭と末尾はデータと関係がないので除外
            ary.pop();
            ary.shift();

            var result = [];
            $.each(ary, function (idx, dataStr) {
                var dataAry = dataStr.split(',');
                result.push({
                    name: dataAry[0],
                    kanaName: dataAry[1],
                    max: dataAry[2],
                    min: dataAry[3],
                    plus: dataAry[4],
                    minus: dataAry[5]
                });
            });

            return result;
        }
    };

    h5.core.expose(pageLogic);
})(jQuery);