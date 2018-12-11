(function ($) {
    'use strict';

    var manager = h5.core.data.createManager('GESkillManager');
    var model = manager.createModel({
        name: 'GESkillModel',
        schema: {
            id: {
                id: true
            },
            name: null,
            melee: null,
            gun: null,
            shield: null,
            enhancePart: null,
            controllerUnit: null,
            bikou: null
        }
    });

    /**
	 * スキル選択コンテナコントローラ
	 */
    var selectSkillContainerController = {

        __name: 'GESkillManager.controller.SelectSkillContainerController',

        _$selectSkillList: null,

        _skillDataArray: null,
        _skillDataMap: null,
        _skillDataItems: [],
        _skillDataItemSeq: 0,

        /**
         * 初期設定
         * 
         * @param {*} skillDataArray 
         * @param {*} skillDataMap 
         */
        init: function (skillDataArray, skillDataMap) {
            this._$selectSkillList = this.$find('.select-skill-list');

            this._skillDataArray = skillDataArray;
            this._skillDataMap = skillDataMap;

            this._appendSelectSkillRow();
        },

        /**
         * スキル選択行を追加
         */
        _appendSelectSkillRow: function () {
            // スキル選択行要素をテンプレートから生成して追加
            var $skillRow = this.view.get('SelectSkillDataRow', {
                skillDataArray: this._skillDataArray
            });
            this._$selectSkillList.append($skillRow);

            // 生成した行にデータアイテムをバインド
            var item = this._createSkillDataItem();
            this.view.bind($skillRow, {
                item: item
            });
            this._skillDataItems.push(item);// データアイテムを配列にキャッシュ
        },

        /**
         * スキルデータアイテムを生成して返す
         */
        _createSkillDataItem: function () {
            var item = model.create({
                id: 'SkillDataItem' + this._skillDataItemSeq,
                name: null
            });
            this._skillDataItemSeq++;
            return item;
        },

        /**
         * スキル行追加ボタンのclickハンドラ
         * <p>
         * スキル行を追加
         */
        '.add-skill-row-btn click': function (context, $el) {
            this._appendSelectSkillRow();
        },

        /**
         * スキル行削除ボタンのclickハンドラ
         * <p>
         * 選択したスキル行を削除
         */
        '.delete-skill-row-btn click': function (context, $el) {
            var $skillRow = this._getSkillRowElem($el);// 削除対象のスキル行要素

            var rowIdx = this._getSkillRowIndex($skillRow);//　削除対象のスキル行のindex
            this._skillDataItems.splice(rowIdx, 1);// 削除対象のスキル行にバインドしたデータアイテムを除去

            $skillRow.remove();//　削除太陽のスキル行要素を削除

            this.trigger('updateSkillDataItem', {
                skillDataItems: this._skillDataItems
            });
        },

        /**
         * 指定した要素を内包するスキル行要素を返す
         * 
         * @param {*} $el
         * @returns スキル行要素
         */
        _getSkillRowElem: function ($el) {
            return $el.parents('.select-skill-data-row');
        },

        /**
         * 指定したスキル行要素のindexを返す
         */
        _getSkillRowIndex: function ($skillRow) {
            return $skillRow.index('.select-skill-data-row');
        },

        /**
         * 各Lv入力要素のchangeハンドラ
         * <p>
         * データアイテムを更新し、スキル合計表更新イベントを発火
         */
        '.input-lv-cell change': function (context, $el) {
            var $skillRow = this._getSkillRowElem($el);
            var rowIdx = this._getSkillRowIndex($skillRow);
            var propName = $el[0].name;
            var val = $el.val();
            this._updateDataItem(rowIdx, propName, val);
        },

        /**
         * スキル選択要素のchangeハンドラ
         * <p>
         * データアイテムを更新し、スキル合計表更新イベントを発火
         * 
         * @param {*} context 
         * @param {*} $el 
         */
        '.select-skill change': function (context, $el) {
            var $skillRow = this._getSkillRowElem($el);
            var rowIdx = this._getSkillRowIndex($skillRow);
            var propName = 'name';
            var val = $el.val();

            // スキル詳細を更新
            this._updateActiveSkillBySkillName($skillRow, val);

            // データアイテムを更新し、スキル合計表更新イベントを発火
            this._updateDataItem(rowIdx, propName, val);
        },

        /**
         * データアイテムを更新し、スキル合計表更新イベントを発火
         * 
         * @param {*} rowIdx 
         * @param {*} propName 
         * @param {*} val 
         */
        _updateDataItem: function (rowIdx, propName, val) {
            var item = this._skillDataItems[rowIdx];
            item.set(propName, val);
            this.trigger('updateSkillDataItem', {
                skillDataItems: this._skillDataItems
            });
        },

        _updateActiveSkillBySkillName: function ($skillRow, skillName) {
            var $activeSkillNameCell = $skillRow.find('.active-skill-name-cell');
            if (skillName === '') {
                // ラベル選択肢を指定した場合は、発動スキル表示要素を空にして処理を抜ける
                $activeSkillNameCell.empty();
                return;
            }

            var skillData = this._skillDataMap[skillName];

            var plusSkills = skillData.plus;
            plusSkills = plusSkills.split('@');
            var minusSkills = skillData.minus;
            minusSkills = minusSkills === '' ? [] : minusSkills.split('@');

            var resultStr = '';
            $.each(plusSkills, this.own(function (idx, plusSkill) {
                var skillKanaName = this._skillDataMap[plusSkill].kanaName;
                resultStr += '<div> + ' + skillKanaName + '</div>';
            }));
            $.each(minusSkills, this.own(function (idx, minusSkill) {
                var skillKanaName = this._skillDataMap[minusSkill].kanaName;
                resultStr += '<div> - ' + skillKanaName + '</div>';
            }));

            $activeSkillNameCell.empty();
            $activeSkillNameCell.append(resultStr);
        }
    };
    h5.core.expose(selectSkillContainerController);
})(jQuery);