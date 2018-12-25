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
            canSetMelee: null,
            canSetGun: null,
            canSetShield: null,
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
            countShield: null
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
                countShield: 0
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

            this._updateDownloadLink();// DLリンクのhref属性を更新
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

            this._updateDownloadLink();// DLリンクのhref属性を更新
        },

        _deleteSkillRow: function ($skillRow) {
            var rowIdx = this._getSkillRowIndex($skillRow);//　削除対象のスキル行のindex
            this._skillDataItems.splice(rowIdx, 1);// 削除対象のスキル行にバインドしたデータアイテムを除去

            $skillRow.remove();//　削除対象のスキル行要素を削除

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
            this._updateDownloadLink();// DLリンクのhref属性を更新
        },

        /**
         * 備考のchangeハンドラ
         * <p>
         * データアイテムを更新
         */
        '.input-bikou-cell change': function (context, $el) {
            var $skillRow = this._getSkillRowElem($el);
            var rowIdx = this._getSkillRowIndex($skillRow);
            var propName = $el[0].name;
            var val = $el.val();
            this._updateDataItem(rowIdx, propName, val);
            this._updateDownloadLink();// DLリンクのhref属性を更新
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
            // this._updateActiveSkillBySkillName($skillRow, val);

            // スキルLv項目の更新
            this._updateSkillLvItemsBySkillName($skillRow, val);

            // データアイテムを更新し、スキル合計表更新イベントを発火
            this._updateDataItem(rowIdx, propName, val);

            this._updateDownloadLink();// DLリンクのhref属性を更新
        },

        _updateSkillLvItemsBySkillName: function ($skillRow, skillName) {
            var $meleeLv = $skillRow.find('.input-melee-skill-lv');
            var $gunLv = $skillRow.find('.input-gun-skill-lv');
            var $shiledLv = $skillRow.find('.input-shield-skill-lv');

            if (skillName === '') {
                $meleeLv.prop('disabled', false);
                $gunLv.prop('disabled', false);
                $shiledLv.prop('disabled', false);
                return;
            }
            var skillData = this._skillDataMap[skillName];
            // 近接Lv項目の活性/非活性切り替え
            $meleeLv.prop('disabled', !skillData.canSetMelee);
            // 銃Lv項目の活性/非活性切り替え
            $gunLv.prop('disabled', !skillData.canSetGun);
            // 盾Lv項目の活性/非活性切り替え
            $shiledLv.prop('disabled', !skillData.canSetShield);
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

            if (propName === 'name') {
                var skillData = this._skillDataMap[val];
                item.set('canSetMelee', skillData.canSetMelee);
                item.set('canSetGun', skillData.canSetGun);
                item.set('canSetShield', skillData.canSetShield);
            }

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
            };
            $.each(this._skillDataItems, function (idx, skillDataItem) {
                var item = skillDataItem.get();
                if (item.name === '' || item.name == null) {
                    // ラベル選択肢であれば計算対象外とみなす
                    return;
                }

                var calcCount = function (valStr, canSet) {
                    if (!canSet) {
                        return 0;
                    }
                    var val = parseInt(valStr);
                    return isNaN(val) ? 0 : (val < 0) ? 0 : 1;
                }

                newData.countMelee += calcCount(item.melee, item.canSetMelee);
                newData.countGun += calcCount(item.gun, item.canSetGun);
                newData.countShield += calcCount(item.shield, item.canSetShield);
            });
            $.each(newData, this.own(function (key, val) {
                this._countItem.set(key, val);
            }));
        },


        // _updateActiveSkillBySkillName: function ($skillRow, skillName) {
        //     var $activeSkillNameCell = $skillRow.find('.active-skill-name-cell');
        //     if (skillName === '') {
        //         // ラベル選択肢を指定した場合は、発動スキル表示要素を空にして処理を抜ける
        //         $activeSkillNameCell.empty();
        //         return;
        //     }
        // 
        //     var skillData = this._skillDataMap[skillName];
        // 
        //     var plusSkills = skillData.plus;
        //     plusSkills = plusSkills.split('@');
        //     var minusSkills = skillData.minus;
        //     minusSkills = minusSkills === '' ? [] : minusSkills.split('@');
        // 
        //     var resultStr = '';
        //     $.each(plusSkills, this.own(function (idx, plusSkill) {
        //         var skillKanaName = this._skillDataMap[plusSkill].kanaName;
        //         resultStr += '<div> + ' + skillKanaName + '</div>';
        //     }));
        //     $.each(minusSkills, this.own(function (idx, minusSkill) {
        //         var skillKanaName = this._skillDataMap[minusSkill].kanaName;
        //         resultStr += '<div> - ' + skillKanaName + '</div>';
        //     }));
        // 
        //     $activeSkillNameCell.empty();
        //     $activeSkillNameCell.append(resultStr);
        // },

        _updateDownloadLink: function () {
            var skillDataArray = $.map(this._skillDataItems, function (skillDataItem) {
                return skillDataItem.get();
            });
            var jsonStr = JSON.stringify(skillDataArray);
            var blob = new Blob([jsonStr], {
                type: 'text/json'
            });
            window.URL = window.URL || window.webkitURL;
            var $link = this.$find('#export-link');
            $link.attr('href', window.URL.createObjectURL(blob));
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
                    if (data.name == null || data.name === '') {
                        // nameがnull(＝ラベル選択肢を保存したケース)の場合、行は追加しない
                        return;
                    }
                    this._appendSelectSkillRow();
                    var $row = this.$find('.select-skill-data-row').eq(this._skillDataItemSeq - 1);
                    var item = this._skillDataItems[this._skillDataItemSeq - 1];
                    var name = data.name;
                    var melee = data.melee;
                    var gun = data.gun;
                    var shield = data.shield;
                    var bikou = data.bikou;
                    var canSetMelee = data.canSetMelee;
                    var canSetGun = data.canSetGun;
                    var canSetShield = data.canSetShield;

                    $row.find('.select-skill').val(name);
                    $row.find('.input-melee-skill-lv').val(melee).prop('disabled', !canSetMelee);
                    $row.find('.input-gun-skill-lv').val(gun).prop('disabled', !canSetGun);
                    $row.find('.input-shield-skill-lv').val(shield).prop('disabled', !canSetShield);
                    $row.find('.input-bikou-cell').text(bikou);

                    // this._updateActiveSkillBySkillName($row, name);

                    item.set('name', name);
                    item.set('melee', melee);
                    item.set('gun', gun);
                    item.set('shield', shield);
                    item.set('bikou', bikou);
                    item.set('canSetMelee', canSetMelee);
                    item.set('canSetGun', canSetGun);
                    item.set('canSetShield', canSetShield);
                }));

                this.trigger('updateSkillDataItem', {
                    skillDataItems: this._skillDataItems
                });

                this._updateSkillCount();

                $el.val(null);// 同一ファイルを読み込めるよう、要素の値を初期化

                this._updateDownloadLink();// DLリンクのhref属性を更新
            });

            reader.readAsText(file);
        },

        _deleteAllSkillRow: function () {
            var $skillRows = this.$find('.select-skill-data-row');
            $.each($skillRows, this.own(function (idx, rowElem) {
                var $row = $(rowElem);
                this._deleteSkillRow($row);
            }));
            this._skillDataItemSeq = 0;
            this.trigger('updateSkillDataItem', {
                skillDataItems: this._skillDataItems
            });
        }
    };
    h5.core.expose(selectSkillContainerController);
})(jQuery);