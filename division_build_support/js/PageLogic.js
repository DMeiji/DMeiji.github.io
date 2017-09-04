(function ($) {
    'use strict';

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'division_build_support.logic.PageLogic',

        getArmorTalentData: function () {
            var dfd = h5.async.deferred();

            var mask = h5.ajax('./csv/armor_talent-mask.csv');
            var body = h5.ajax('./csv/armor_talent-body.csv');
            var backpack = h5.ajax('./csv/armor_talent-backpack.csv');
            var glove = h5.ajax('./csv/armor_talent-glove.csv');
            var knee = h5.ajax('./csv/armor_talent-knee.csv');
            var holster = h5.ajax('./csv/armor_talent-holster.csv');

            $.when(mask, body, backpack, glove, knee, holster).then(
                function (maskRes, bodyRes, backpackRes, gloveRes, kneeRes, holsterRes) {
                    dfd.resolve({
                        body: bodyRes[0],
                        backpack: backpackRes[0],
                        mask: maskRes[0],
                        glove: gloveRes[0],
                        knee: kneeRes[0],
                        holster: holsterRes[0]
                    });
                },
                function () {
                    throw new Error('error: getArmorTalentData');
                }
            );

            return dfd.promise();
        },

        getMainTokuseiData: function () {
            var dfd = h5.async.deferred();

            var mask = h5.ajax('./csv/main_tokusei-mask.csv');
            var body = h5.ajax('./csv/main_tokusei-body.csv');
            var backpack = h5.ajax('./csv/main_tokusei-backpack.csv');
            var glove = h5.ajax('./csv/main_tokusei-glove.csv');
            var knee = h5.ajax('./csv/main_tokusei-knee.csv');
            var holster = h5.ajax('./csv/main_tokusei-holster.csv');

            $.when(mask, body, backpack, glove, knee, holster).then(
                function (maskRes, bodyRes, backpackRes, gloveRes, kneeRes, holsterRes) {
                    dfd.resolve({
                        body: bodyRes[0],
                        backpack: backpackRes[0],
                        mask: maskRes[0],
                        glove: gloveRes[0],
                        knee: kneeRes[0],
                        holster: holsterRes[0]
                    });
                },
                function () {
                    throw new Error('error: getArmorTalentData');
                }
            );

            return dfd.promise();
        },

        getSubTokuseiData: function () {
            var dfd = h5.async.deferred();

            var mask = h5.ajax('./csv/sub_tokusei-mask.csv');
            var body = h5.ajax('./csv/sub_tokusei-body.csv');
            var backpack = h5.ajax('./csv/sub_tokusei-backpack.csv');
            var knee = h5.ajax('./csv/sub_tokusei-knee.csv');

            $.when(mask, body, backpack, knee).then(
                function (maskRes, bodyRes, backpackRes, kneeRes) {
                    dfd.resolve({
                        body: bodyRes[0],
                        backpack: backpackRes[0],
                        mask: maskRes[0],
                        knee: kneeRes[0]
                    });
                },
                function () {
                    throw new Error('error: getArmorTalentData');
                }
            );

            return dfd.promise();
        },

        getSetBounusData: function () {
            return h5.ajax('./csv/armor_talent-setbounus.csv');
        }
    };

    h5.core.expose(pageLogic);

})(jQuery);