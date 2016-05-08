/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * home module
 */
define('PageContainer',
        ['player', 'gameengine', 'knockout'], function (Player, GameEngine, ko) {
    /**
     * The view model for the main content view template
     */
    function PageContainer() {
        var self = this;
        self.player1 = new Player();
        self.player2 = new Player();
        
        self.gameEngine = GameEngine.getInstance();
        self.nextTurn = ko.observable(self.gameEngine.getNextTurnPlayerId());
                
        self.playerTable = {};
        self.playerTable['x'] = self.player1;
        self.playerTable['o'] = self.player2;
        

        
        self.handlePlayerClick = function (pData) {
            var player = self.playerTable[self.nextTurn()];
            player.playTurn(pData.x, pData.y);
            self.nextTurn(self.gameEngine.getNextTurnPlayerId());
        };

    }

    return PageContainer;
});
