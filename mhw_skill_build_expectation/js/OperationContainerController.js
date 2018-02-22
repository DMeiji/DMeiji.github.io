(function ($) {
    'use strict';

    var consts = MhwSkillBuildExpectation.consts;

    /**
	 * オペレーションコンテナコントローラ
	 */
    var operationContainerController = {

        __name: 'MhwSkillBuildExpectation.controller.OperationContainerController',

        _$tableBody: null,

        __init: function () {
            this._$tableBody = this.$find('.chartLineInfoTable tbody');
        },

        init: function (skillsStr) {
            this.appendLineInfoRow('編集中', skillsStr, true);
        },

        appendLineInfoRow: function (buildName, skillsStr, isInit) {
            this.view.append(this._$tableBody, 'LineInfoRow', {
                buildName: buildName,
                skillsStr: skillsStr,
                isInit: isInit || false
            });
        },

        updateEditingLineInfoRow: function (skillsStr) {
            var $editingLineRow = this._$tableBody.find('tr:eq(0)');
            $editingLineRow.find('td:eq(1)').text(skillsStr);
        },

        '.addChartLineButton click': function () {
            this.trigger('addChartLine');
        },

        '.removeChartLineButton click': function (context, $el) {
            var $tr = $el.parents('tr');// 削除ボタンを内包するtr要素
            var rowIdx = this._$tableBody.find('tr').index($tr);// tbodyから見た削除ボタンを内包するtr要素のindex
            $tr.remove();// 削除ボタンを内包するtr要素を削除
            this.trigger('removeChartLine', {
                rowIdx: rowIdx
            });
        },

        '.skillResetButton click': function () {
            this.trigger('skillClear');
        }
    };
    h5.core.expose(operationContainerController);
})(jQuery);