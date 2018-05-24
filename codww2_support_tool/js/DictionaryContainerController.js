(function ($) {
    'use strict';

    /**
	 * インフォコンテナコントローラ
	 */
    var infoContainerController = {

        __name: 'CoDWW2.controller.DictionaryContainerController',

        __ready: function() {
            // プレステージの概要を追加
            var $aboutPrestigeDescArea = this.$find('#aboutPrestige > .descArea'); 
            this.view.append($aboutPrestigeDescArea, 'aboutPrestige');

            // 武器プレステージの説明を追加
            var $weaponPrestigeDescArea = this.$find('#aboutWeaponPrestige .descArea'); 
            this.view.append($weaponPrestigeDescArea, 'aboutWeaponPrestige');

            // 兵士プレステージの説明を追加
            var $soldierPrestigeDescArea = this.$find('#aboutSoldierPrestige .descArea'); 
            this.view.append($soldierPrestigeDescArea, 'aboutSoldierPrestige');

            // 師団プレステージの説明を追加
            var $divisionPrestigeDescArea = this.$find('#aboutDivisionPrestige .descArea'); 
            this.view.append($divisionPrestigeDescArea, 'aboutDivisionPrestige');

            // ゲームモードの概要を追加
            var $aboutGameModeDescArea = this.$find('#aboutGameMode .descArea'); 
            this.view.append($aboutGameModeDescArea, 'aboutGameMode');

            // スコアストリークの概要を追加
            var $aboutScorestreakDescArea = this.$find('#aboutScorestreak .descArea'); 
            this.view.append($aboutScorestreakDescArea, 'aboutScorestreak');
        }
    };
    h5.core.expose(infoContainerController);
})(jQuery);