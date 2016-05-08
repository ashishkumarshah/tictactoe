/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TicTacToePlayer module
 */
define(['gameengine','knockout'], function (GameEngine,ko) {
    /**
     * The view model for the main content view template
     */
    function TicTacToePlayer() {
        var self = this;

        self.playerId = null;
        self.turn = ko.observable(false);
        self.getPlayerId = function () {
            return self.playerId;
        };
        self.setPlayerId = function (pPlayerId) {
            self.playerId = pPlayerId;
        };

        self.handleRegistrationSuccess = function (pPlayerId) {
            self.setPlayerId(pPlayerId);
        };

        self.handleTurnNotification = function () {
            self.turn(true);
            console.log("Player " + self.playerId + "'s turn");
        };

        self.playTurn = function (x, y) {
            if (self.turn()) {
                self.turn(false);
                return self.gameEngine.handlePlayerMove(x, y, self.getPlayerId());
            } else {
                return false;
            }          
        };

        self.requestToPlay = function () {
            self.gameEngine = GameEngine.getInstance();
            self.gameEngine.requestToPlay(self.handleRegistrationSuccess, null, self.handleTurnNotification);
        };
        
        self.requestToPlay();
    }

    return TicTacToePlayer;
});
