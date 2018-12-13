(function ($) {
    'use strict';

    var manager = h5.core.data.createManager('GESkillManager');
    var skillModel = manager.createModel({
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
    var countModel = manager.createModel({
        name: 'GECountModel',
        schema: {
            id: {
                id: true
            },
            countMelee: null,
            countGun: null,
            countShield: null,
            countEnhancePart: null,
            countControllerUnit: null
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

        _countItem: null,

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

            this._countItem = countModel.create({
                id: 'CountItem',
                countMelee: 0,
                countGun: 0,
                countShield: 0,
                countEnhancePart: 0,
                countControllerUnit: 0
            });
            this.view.bind('.count-data-row', {
                countItem: this._countItem
            });

            this._appendSelectSkillRow();
        },

        /**
         * スキル選択行を追加
         */
        _appendSelectSkillRow: function () {
            // スキル選択行要素をテンプレートから生成して追加
            var skillRowHTML = this.view.get('SelectSkillDataRow', {
                skillDataArray: this._skillDataArray
            });
            this._$selectSkillList.append(skillRowHTML);

            // 生成した行にデータアイテムをバインド
            var item = this._createSkillDataItem();
            this.view.bind(skillRowHTML, {
                item: item
            });
            this._skillDataItems.push(item);// データアイテムを配列にキャッシュ
        },

        /**
         * スキルデータアイテムを生成して返す
         */
        _createSkillDataItem: function () {
            var item = skillModel.create({
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

            this._deleteSkillRow($skillRow);

            this.trigger('updateSkillDataItem', {
                skillDataItems: this._skillDataItems
            });
        },

        _deleteSkillRow: function ($skillRow) {
            var rowIdx = this._getSkillRowIndex($skillRow);//　削除対象のスキル行のindex
            this._skillDataItems.splice(rowIdx, 1);// 削除対象のスキル行にバインドしたデータアイテムを除去

            $skillRow.remove();//　削除太陽のスキル行要素を削除

            this._updateSkillCount();
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

            this._updateSkillCount();

            this.trigger('updateSkillDataItem', {
                skillDataItems: this._skillDataItems
            });
        },

        /**
         * スキルカウントを更新
         */
        _updateSkillCount: function () {
            var newData = {
                countMelee: 0,
                countGun: 0,
                countShield: 0,
                countEnhancePart: 0,
                countControllerUnit: 0
            };
            $.each(this._skillDataItems, function (idx, skillDataItem) {
                var item = skillDataItem.get();
                if (item.name === '' || item.name == null) {
                    // ラベル選択肢であれば計算対象外とみなす
                    return;
                }

                var calcCount = function (valStr) {
                    var val = parseInt(valStr);
                    return isNaN(val) ? 0 : (val < 0) ? 0 : 1;
                }

                newData.countMelee += calcCount(item.melee);
                newData.countGun += calcCount(item.gun);
                newData.countShield += calcCount(item.shield);
                newData.countEnhancePart += calcCount(item.enhancePart);
                newData.countControllerUnit += calcCount(item.controllerUnit);
            });
            $.each(newData, this.own(function (key, val) {
                this._countItem.set(key, val);
            }));
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
        },

        '.create-file-btn click': function (context, $el) {
            this.$find('.download-btn').remove();// 既にダウンロードボタンが存在する場合は除去

            var skillDataArray = $.map(this._skillDataItems, function (skillDataItem) {
                return skillDataItem.get();
            });
            var jsonStr = JSON.stringify(skillDataArray);
            var blob = new Blob([jsonStr], {
                type: 'text/json'
            });
            window.URL = window.URL || window.webkitURL;

            var downloadBtnHTML = '<button class="btn btn-default btn-xs download-btn">';
            downloadBtnHTML += '<a id="download-link" href="#" target="_blank" download="GE_Skill.json">Download</a>';
            downloadBtnHTML += '</button>';
            var $btn = $(downloadBtnHTML);
            $btn.find('a').attr('href', window.URL.createObjectURL(blob));
            $el.after($btn);
        },

        '#download-link click': function (context, $el) {
            $el.parent('.download-btn').remove();// ダウンロードリンクが押されたら、ダウンロードボタンを除去
        },

        '.import-btn click': function () {
            // インポートボタンが押下されたら、非表示にしているinput[type=file]にclickイベントを発火
            this.$find('.input-file').click();
        },

        '.input-file change': function (context, $el) {
            var file = context.event.target.files[0];
            var reader = new FileReader();

            reader.onload = this.own(function () {
                var dataArray = JSON.parse(reader.result);

                this._deleteAllSkillRow();// スキル行を全削除
                $.each(dataArray, this.own(function (idx, data) {
                    this._appendSelectSkillRow();
                    var $row = this.$find('.select-skill-data-row').eq(idx);
                    var item = this._skillDataItems[idx];
                    var name = data.name;
                    var melee = data.melee;
                    var gun = data.gun;
                    var shield = data.shield;
                    var enhancePart = data.enhancePart;
                    var controllerUnit = data.controllerUnit;
                    var bikou = data.bikou;

                    $row.find('.select-skill').val(name);
                    $row.find('.input-melee-skill-lv').val(melee);
                    $row.find('.input-gun-skill-lv').val(gun);
                    $row.find('.input-shield-skill-lv').val(shield);
                    $row.find('.input-enhance-part-skill-lv').val(enhancePart);
                    $row.find('.input-controller-unit-skill-lv').val(controllerUnit);
                    $row.find('.input-bikou-skill-lv').val(bikou);

                    this._updateActiveSkillBySkillName($row, name);

                    item.set('name', name);
                    item.set('melee', melee);
                    item.set('gun', gun);
                    item.set('shield', shield);
                    item.set('enhancePart', enhancePart);
                    item.set('controllerUnit', controllerUnit);
                    item.set('bikou', bikou);
                }));

                this.trigger('updateSkillDataItem', {
                    skillDataItems: this._skillDataItems
                });

                this._updateSkillCount();

                $el.val(null);// 同一ファイルを読み込めるよう、要素の値を初期化
            });

            reader.readAsText(file);
        },

        _deleteAllSkillRow: function () {
            var $skillRows = this.$find('.select-skill-data-row');
            $.each($skillRows, this.own(function (idx, rowElem) {
                var $row = $(rowElem);
                this._deleteSkillRow($row);
            }));
            this.trigger('updateSkillDataItem', {
                skillDataItems: this._skillDataItems
            });
        }
    };
    h5.core.expose(selectSkillContainerController);
})(jQuery);