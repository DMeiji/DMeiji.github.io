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
            this._$selectedSkillsLen.text(val);
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
                        skillDesc: skillDesc
                    };
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
            this._updateSelectedSkillsLen(this._getSelectedSkillsLen());
        },

        _updateSelectedSkillList: function (isChecked, sId, fName) {
            isChecked ? this._addSelectedSkill(sId, fName) : this._removeSelectedSkill(sId, fName);

        },

        _getSelectedSkillsLen: function () {
            return this._getSelectedSkills().length;
        },

        _addSelectedSkill: function (sId, fName) {
            var sInfo = this._facetSkillsDataMap[fName][sId];
            var selectedSkills = this._getSelectedSkills();
            selectedSkills.push({
                facetName: fName,
                facetKanaName: facetNameMap[fName],
                skillId: sId,
                skillName: sInfo.skillName,
                skillDesc: sInfo.skillDesc
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
            this._updateSelectedSkillsLen(this._getSelectedSkillsLen());
        },

        _removeSelectedSkillCheck: function (sId, fName) {
            var selector = '.selectSkillCb[data-skill-id="' + sId + '"]';
            selector += '[data-facet-name="' + fName + '"]';
            this.$find(selector).prop('checked', false);
        },

        '.allOpenBtn click': function () {
            this.$find('.facetSkillsListContainer').removeClass('hide');
        },

        '.allCloseBtn click': function () {
            this.$find('.facetSkillsListContainer').addClass('hide');
        },

        '.allUnselectBtn click': function () {
            var obsAry = this._getSelectedSkills();
            obsAry.splice(0, obsAry.length);
            this.$find('.selectSkillCb').prop('checked', false);
            this._updateSelectedSkillsLen(this._getSelectedSkillsLen());
        },

        _getSelectedSkills: function () {
            return this._selectedSkillsListDataItem.get('facetSkills');
        }
    };

    // ===============
    // 外部公開
    // ===============
    $(function () {
        window.c = h5.core.controller('body', pageController);
    });

})(jQuery);