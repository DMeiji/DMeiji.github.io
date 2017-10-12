(function ($) {
    'use strict';

    // =========================
    // 定数
    // =========================

    // =========================
    // 静的変数
    // =========================
    var manager = h5.core.data.createManager('ResultListManager', 'MaterialListTool.manager');
    var skillsListModel = manager.createModel({
        name: 'SkillsListModel',
        schema: {
            id: { id: true },
            facetSkills: {
                type: 'any[]'
            }
        }
    });
    var facetNameMap = MajoryodanSkillList.const.facetNameMap;

    // =========================
    // 関数
    // =========================

    // =========================
    // 画面コントローラ
    // =========================
    var pageController = {

        __name: 'MajoryodanSkillList.controller.PageController',

        _logic: MajoryodanSkillList.logic.PageLogic,

        _$selectedSkillsLen: null,
        _facetSkillsDataMap: {},
        _skillsListDataItem: null,
        _selectedSkillsListDataItem: null,

        __init: function () {
            this._$selectedSkillsLen = this.$find('.selectedSkillsLen');
            this._updateSelectedSkillsLen(0);
        },

        _updateSelectedSkillsLen: function (val) {
            var v = val != null ? val : this._getSelectedSkills().length;
            this._$selectedSkillsLen.text(v);
        },

        _getSelectedSkills: function () {
            return this._selectedSkillsListDataItem.get('facetSkills');
        },

        __ready: function () {
            // 選択スキルリスト用データアイテムを生成してバインド
            this._selectedSkillsListDataItem = skillsListModel.create({
                id: 'selectedSkillsListItem'
            });
            h5.core.view.bind('.resultContainer', this._selectedSkillsListDataItem);

            // スキルデータを取得
            this._logic.getSkillsData().then(this.own(function (res) {
                // スキルリスト用データアイテムを生成してバインド
                this._skillsListDataItem = skillsListModel.create({
                    id: 'skillsListItem'
                });
                this._convertCsvToSkillsDataAry(res);
                h5.core.view.bind('.facetSkillsContainer', this._skillsListDataItem);
            }));
        },

        _convertCsvToSkillsDataAry: function (csvData) {
            var facetSkillsObsAry = this._skillsListDataItem.get('facetSkills');

            var skillSortId = 0;
            var facetSkillsAry = csvData.split('@@');
            facetSkillsAry.shift();// 先頭要素は空文字なので除去
            facetSkillsAry.forEach(this.own(function (facetSkillsStr) {
                var skillsAry = facetSkillsStr.split(/\r\n|\n/).slice(0, -1);// 末尾要素は空文字なので除去
                var facetName = skillsAry[0];

                this._facetSkillsDataMap[facetName] = {};

                skillsAry = skillsAry.slice(1);
                var skills = [];
                skillsAry.forEach(this.own(function (skillStr) {
                    var skillInfo = skillStr.split(',');
                    var skillId = skillInfo[0];
                    var skillName = skillInfo[1];
                    var skillDesc = skillInfo[2];
                    skills.push({
                        facetName: facetName,
                        skillId: skillId,
                        skillName: skillName,
                        skillDesc: skillDesc
                    });
                    // スキル情報をキャッシュ
                    this._facetSkillsDataMap[facetName][skillId] = {
                        skillName: skillName,
                        skillDesc: skillDesc,
                        sortId: skillSortId
                    };
                    skillSortId++;
                }));
                facetSkillsObsAry.push({
                    facetName: facetNameMap[facetName],
                    skills: skills
                });
            }));
        },

        '.toggleFacetSkills click': function (context, $el) {
            $el.next().toggleClass('hide');// スキルリストの表示/非表示切り替え
            this._toggleCollapseIcon($el);
        },

        _toggleCollapseIcon: function ($e) {
            var $rightIcon = $e.find('.glyphicon-triangle-right');
            $rightIcon.toggleClass('hide');
            var $bottomIcon = $e.find('.glyphicon-triangle-bottom');
            $bottomIcon.toggleClass('hide');
        },

        '.selectSkillCb change': function (context, $el) {
            var skillId = $el.data('skillId');
            var facetName = $el.data('facetName');
            var isChecked = $el.prop('checked');
            this._updateSelectedSkillList(isChecked, skillId, facetName);
            this._updateSelectedSkillsLen();
        },

        _updateSelectedSkillList: function (isChecked, sId, fName) {
            isChecked ? this._addSelectedSkill(sId, fName) : this._removeSelectedSkill(sId, fName);
        },

        _addSelectedSkill: function (sId, fName) {
            var sInfo = this._facetSkillsDataMap[fName][sId];
            var selectedSkills = this._getSelectedSkills();
            selectedSkills.push({
                facetName: fName,
                facetKanaName: facetNameMap[fName],
                skillId: sId,
                skillName: sInfo.skillName,
                skillDesc: sInfo.skillDesc,
                sortId: sInfo.sortId
            });
        },

        _removeSelectedSkill: function (sId, fName) {
            var selectedSkills = this._getSelectedSkills();
            for (var i = 0, len = selectedSkills.length; i < len; i++) {
                var selectedSkill = selectedSkills.get(i);
                if (selectedSkill.skillId === sId && selectedSkill.facetName === fName) {
                    selectedSkills.splice(i, 1);
                    break;
                }
            }
        },

        '.unselectSkillBtn click': function (context, $el) {
            var sId = $el.data('skillId');
            var fName = $el.data('facetName');
            this._removeSelectedSkill(sId, fName);
            this._removeSelectedSkillCheck(sId, fName);
            this._updateSelectedSkillsLen();
        },

        _removeSelectedSkillCheck: function (sId, fName) {
            var $selectSkillCb = this._findSelectSkillCb(sId, fName);
            $selectSkillCb.prop('checked', false);
        },

        _findSelectSkillCb: function (sId, fName) {
            var selector = '.selectSkillCb[data-skill-id="' + sId + '"]';
            selector += '[data-facet-name="' + fName + '"]';
            return this.$find(selector);
        },

        '.allOpenBtn click': function () {
            this.$find('.facetSkillsListContainer').removeClass('hide');
        },

        '.allCloseBtn click': function () {
            this.$find('.facetSkillsListContainer').addClass('hide');
        },

        '.resetBtn click': function () {
            this._removeAllSelectedSkill();// 選択スキルをすべて解除
            this._removeAllSelectedSkillCheck();// スキル選択Cbのチェックをすべて外す
            this._updateSelectedSkillsLen();
        },

        _removeAllSelectedSkill: function () {
            var selectedSkills = this._getSelectedSkills();
            selectedSkills.splice(0, selectedSkills.length);
        },

        _removeAllSelectedSkillCheck: function () {
            this.$find('.selectSkillCb').prop('checked', false);
        },

        '#import change': function (context, $el) {
            var files = $el[0].files;
            if (files.length === 0) {
                return;
            }
            var file = files[0];
            var reader = new FileReader();

            reader.onload = this.own(function (ev) {
                var data = ev.target.result;
                var dataAry = JSON.parse(data);

                this._removeAllSelectedSkill();// 選択スキルをすべて解除
                this._removeAllSelectedSkillCheck();// スキル選択Cbのチェックをすべて外す
                this._loadSelectedSkillsData(dataAry);
                this._updateSelectedSkillsLen();
                $el.val(null);
            });

            reader.readAsText(file);
        },

        _loadSelectedSkillsData: function (dataAry) {
            var selectedSkills = this._getSelectedSkills();
            dataAry.forEach(this.own(function (data) {
                selectedSkills.push(data);// 選択スキル用データアイテムを更新

                // スキル選択Cbを更新
                var $selectSkillCb = this._findSelectSkillCb(data.skillId, data.facetName);
                $selectSkillCb.prop('checked', true);
            }));
        },

        '.exportLink click': function (context, $el) {
            var selectedSkillsAry = this._getSelectedSkills().toArray();
            var content = JSON.stringify(selectedSkillsAry, null, 1);
            var type = 'application/json';
            this._export(content, type, $el);
        },

        _export: function (content, type, $link) {
            var blob = new Blob([content], {
                type: type
            });
            window.URL = window.URL || window.webkitURL;
            if (window.navigator.msSaveBlob) {
            var fileName = $link.attr('download');
                window.navigator.msSaveBlob(blob, fileName);
                return;
            }
            $link.attr('href', window.URL.createObjectURL(blob));
        },

        '.skillSortBtn click': function () {
            this._getSelectedSkills().sort(function (a, b) {
                return a.sortId - b.sortId;
            });
        },

        '.exportToMDLink click': function (context, $el) {
            var mdData = this._convertSelectedSkillsToMD();
            this._export(mdData, 'text/plain', $el);
        },

        _convertSelectedSkillsToMD: function (selectedSkills) {
            var selectedSkillsAry = this._getSelectedSkills().toArray();
            var result = 'ファセット|スキル|説明\n---------|----------|---------\n';
            selectedSkillsAry.forEach(function (sInfo) {
                var fKanaName = sInfo.facetKanaName;
                var sName = sInfo.skillName;
                var sDesc = sInfo.skillDesc;
                result += fKanaName + '|' + sName + '|' + sDesc + '\n';
            });
            return result;
        }
    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);