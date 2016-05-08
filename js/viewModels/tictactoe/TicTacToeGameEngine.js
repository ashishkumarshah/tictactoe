/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TicTacToeGameEngine module
 */
define(['gameboard','knockout'
], function (GameBoard,ko) {
    /**
     * The view model for the main content view template
     */
    function TicTacToeGameEngine() {
        var self = this;
        if (TicTacToeGameEngine.singleInstance) {
            return null;
        }
        self.maxPlayerCount = 2;
        self.currentPlayerCount = 0;
        self.boardSize = 3;
        self.gameReadyHandlers = new Array();
        self.player1RegistrationSuccessfulHandler = null;
        self.player2RegistrationSuccessfulHandler = null;
        self.ticTacToeGame = null;

        self.player1Id = 'x';
        self.player2Id = 'o';
        self.isGameOver = ko.observable(false);

        self.turnNotifyHandlers = {};


        self.requestToPlay = function (pSuccessCallBack, pFailureCallBack, pTurnNotifyCallBack) {
            if (self.currentPlayerCount === 0) {
                self.player1RegistrationSuccessfulHandler = pSuccessCallBack;
                self.turnNotifyHandlers[self.player1Id] = pTurnNotifyCallBack;
                self.currentPlayerCount++;
            } else if (self.currentPlayerCount === 1) {
                self.player2RegistrationSuccessfulHandler = pSuccessCallBack;
                self.turnNotifyHandlers[self.player2Id] = pTurnNotifyCallBack;
                self.currentPlayerCount++;
                self.startGame();
            } else {
                pFailureCallBack();
            }
        };

        self.startGame = function () {
            self.ticTacToeGame = new GameBoard(self.boardSize, self.player1Id, self.player2Id);
            self.player1RegistrationSuccessfulHandler(self.player1Id);
            self.player2RegistrationSuccessfulHandler(self.player2Id);
            if (!self.ticTacToeGame.isGameOver())
                self.turnNotifyHandlers[self.player1Id]();
        };

        self.handlePlayerMove = function (x, y, id) {
            var retVal = self.ticTacToeGame.handleMove(x, y, id);
            var isGameOver = self.ticTacToeGame.isGameOver();
            self.isGameOver(isGameOver);
            if (!isGameOver) {
                var next = self.ticTacToeGame.getNextTurnPlayerSymbol();
                self.turnNotifyHandlers[next]();
            } else {
                console.log("game over");
            }
            return retVal;
        };

        self.getNextTurnPlayerId = function () {
            return self.ticTacToeGame.getNextTurnPlayerSymbol();
        };

        self.getMoveHistory = function () {
            return self.ticTacToeGame.getMoveHistory();
        };
    }
    TicTacToeGameEngine.getInstance = function () {
        if (TicTacToeGameEngine.singleInstance == null) {
            TicTacToeGameEngine.singleInstance = new TicTacToeGameEngine();
        }
        return TicTacToeGameEngine.singleInstance;
    };

    return TicTacToeGameEngine;
});
