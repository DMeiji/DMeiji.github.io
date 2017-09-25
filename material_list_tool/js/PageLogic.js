(function ($) {
    'use strict';

    // =========================
    // 画面ロジック
    // =========================
    var pageLogic = {

        __name: 'MaterialListTool.logic.PageLogic',

        getDescExampleData: function () {
            var possessionData = '素材a 4\n素材b 2\n素材c 5\n素材e 1';
            var materialData = '# 適当なセット1\n## 装備A\n- 素材a 3\n- 素材b 2\n- 素材c 3\n## 装備B\n- 素材a 4\n- 素材b 2\n- 素材e 1\n\n';
            materialData += '# 適当なセット2\n## 装備A\n- 素材a 6\n- 素材b 2\n- 素材c 1\n## 装備B\n- 素材a 3\n- 素材b 5\n- 素材e 2';
            return {
                possessionData: possessionData,
                materialData: materialData
            };
        }
    };

    h5.core.expose(pageLogic);

})(jQuery);