/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TicTacToeGameBoard module
 */
define(['gamestate'], function (GameState) {
    /**
     * The view model for the main content view template
     */
    function TicTacToeGameBoard(pBoardSize, pFirstPlayerId, pSecondPlayerId) {
        var self = this;
        self.gameState = new GameState(pBoardSize, pFirstPlayerId, pSecondPlayerId);
        self.handleMove = function (pXPos, pYPos, pPlayerId) {
            return self.gameState.changeState(pXPos, pYPos, pPlayerId);
        };
        self.getNextTurnPlayerSymbol = function () {
            return self.gameState.getNexTurnPlayerSymbol();
        };
        self.isGameOver = function () {
            return self.gameState.isGameOver();
        };
        self.getMoveHistory = function () {
            return self.gameState.moveHistory;
        };
    }


    return TicTacToeGameBoard;
});
