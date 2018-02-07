(function ($) {
    'use strict';

    /**
	 * フィルタコンテナコントローラ
	 */
    var filterContainerController = {

        __name: 'MhwSkillSelector.controller.FilterContainerController',

        initFilterContainer: function (filterSkillMap) {
            this.view.append('.filterContainerContent', 'SkillFilterTable', {
                filterSkillMap: filterSkillMap
            });
        }
    };
    h5.core.expose(filterContainerController);
})(jQuery);