(function ($) {
    'use strict';

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'MhwDmgCalculator.logic.PageLogic',

        getWeaponList: function () {
            var dfd = h5.async.deferred();
            var that = this;
            h5.ajax('./data/weaponList.csv').done(function (res) {
                dfd.resolve(that._convertWeaponListToData(res));
            });
            return dfd.promise();
        },

        _convertWeaponListToData: function (res) {
            var list = res.split('\n');
            list.shift();// 先頭の1行はコメントなので除外
            var result = {};
            $.each(list, function (idx, weaponInfoStr) {
                var weaponInfo = weaponInfoStr.split(',');
                var weaponType = weaponInfo[0];// 武器種

                if (result[weaponType] == null) {
                    result[weaponType] = [];
                }
                var power = weaponInfo[2];
                var attr = weaponInfo[3];
                var chRate = weaponInfo[5].trim();
                result[weaponType].push({
                    weaponName: weaponInfo[1],// 武器名
                    power: isNaN(parseInt(power)) ? power : parseInt(power),// 表示攻撃力
                    attr: attr === '' ? 0 : isNaN(parseInt(attr)) ? attr : parseInt(attr),// 属性値
                    rare: weaponInfo[4],// レア度
                    chRate: chRate === '' ? 0 : isNaN(parseInt(chRate)) ? chRate : parseInt(chRate)// 武器の会心率。csvの各行の末尾には改行文字が含まれるのでtrimで除外
                });
            });
            return result;
        },

        getWeaponTypeList: function () {
            var dfd = h5.async.deferred();
            var that = this;
            h5.ajax('./data/weaponType.csv').done(function (res) {
                dfd.resolve(that._convertWeaponTypeToData(res));
            });
            return dfd.promise();
        },

        _convertWeaponTypeToData: function (res) {
            var list = res.split('\n');
            list.shift();// 先頭行はコメントなので除外
            var result = [];
            $.each(list, function (idx, weaponTypeInfoStr) {
                var weaponTypeInfo = weaponTypeInfoStr.split(',');
                result.push({
                    weaponTypeName: weaponTypeInfo[0],
                    weaponTypeId: weaponTypeInfo[1].trim()// csvの各行の末尾には改行文字が含まれるのでtrimで除外
                });
            });
            return result;
        },

        getWeaponTypeCalcInfo: function () {
            return h5.ajax('./data/weaponTypeCalcInfo.json');
        }
    };

    h5.core.expose(pageLogic);
})(jQuery);