/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TicTacToeGameState module
 */
define(['cell', 'gamemove', 'knockout'], function (Cell, TicTacToeMove, ko) {
    /**
     * The view model for the main content view template
     */
    function TicTacToeGameState(pBoardSize, pFirstPlayerId, pSecondPlayerId) {
        var self = this;
        self.boardSize = pBoardSize;
        self.firstPlayerId = pFirstPlayerId;
        self.secondPlayerId = pSecondPlayerId;
        self.gameBoard = self.initializeGameBoard(self.boardSize);
        self.moveCount = ko.observable(0);
        self.moveHistory = ko.observableArray();
    }
    TicTacToeGameState.prototype.initializeGameBoard = function (pBoardSize) {
        var gameBoard = new Array(pBoardSize);
        for (var i = 0; i < pBoardSize; i++) {
            gameBoard[i] = new Array(pBoardSize);
        }
        for (var i = 0; i < pBoardSize; i++) {
            for (var j = 0; j < pBoardSize; j++) {
                gameBoard[i][j] = ko.observable(new Cell(i, j, ''));
            }
        }
        return ko.observable(gameBoard);
    };

    TicTacToeGameState.prototype.getNexTurnPlayerSymbol = function () {
        var self = this;
        if (self.moveCount() % 2 === 0) {
            return self.firstPlayerId;
        } else {
            return self.secondPlayerId;
        }
    };

    TicTacToeGameState.prototype.isValidState = function (x, y, playerSymbol) {
        var self = this;
        if (x >= self.boardSize || y >= self.boardSize) {
            return false;
        }
        if (playerSymbol !== self.getNexTurnPlayerSymbol()) {
            return false;
        }
        if (self.getCellState(x, y) == null || self.getCellState(x, y) == '') {
            return true;
        } else {
            return false;
        }
    };

    TicTacToeGameState.prototype.changeState = function (x, y, playerSymbol) {
        var self = this;
        if (self.isValidState(x, y, playerSymbol)) {
            self.setCellState(x, y, playerSymbol);
            return true;
        } else {
            return false;
        }
    };

    TicTacToeGameState.prototype.getCellState = function (x, y) {
        var self = this;
        return self.gameBoard()[x][y]().value;
    };

    TicTacToeGameState.prototype.setCellState = function (x, y, playerSymbol) {
        var self = this;
        self.gameBoard()[x][y](new Cell(x, y, playerSymbol));
        self.moveCount(self.moveCount() + 1);
        self.moveHistory.push(new TicTacToeMove(x, y, playerSymbol));
        console.log(x, y, playerSymbol);
    };

    TicTacToeGameState.prototype.isGameOver = function () {
        var self = this;
        return (self.checkRows() || self.checkColumns() || self.checkDiagonals());
    };

    TicTacToeGameState.prototype.checkDiagonals = function () {
        var self = this;
        return (self.checkD1() || self.checkD2());
    };
    TicTacToeGameState.prototype.checkD1 = function () {
        var self = this;
        var firstEntry = self.getCellState(0, 0);
        var checkNeeded = firstEntry.length > 0;
        if (checkNeeded) {
            var matched = true;
            for (var i = 1; i < self.boardSize && matched; i++) {
                matched = self.getCellState(i, i) === self.getCellState(i - 1, i - 1);
            }
            if (matched) {
                return firstEntry;
            }
        }
        return false;
    };
    TicTacToeGameState.prototype.checkD2 = function () {
        var self = this;
        var firstEntry = self.getCellState(0,self.boardSize -1);
        var checkNeeded = firstEntry.length > 0;
        if (checkNeeded) {
            var matched = true;
            for (var i = 1; i < self.boardSize && matched; i++) {
                matched = self.getCellState(i, self.boardSize - 1 - i) === self.getCellState(i - 1, self.boardSize - i);
            }
            if (matched) {
                return firstEntry;
            }
        }
        return false;
    };



    TicTacToeGameState.prototype.checkRows = function () {
        var self = this;
        for (var i = 0; i < self.boardSize; i++) {
            var firstEntry = self.getCellState(i, 0);
            var checkNecessary = firstEntry.length > 0;
            if (checkNecessary) {
                var matched = true;
                for (var j = 1; (j < self.boardSize) && matched; j++) {
                    matched = self.getCellState(i, j - 1) === self.getCellState(i, j);
                }
                if (matched)
                    return firstEntry;
            }
        }
        return false;
    };

    TicTacToeGameState.prototype.checkColumns = function () {
        var self = this;
        for (var j = 0; j < self.boardSize; j++) {
            var firstEntry = self.getCellState(0, j);
            var checkNecessary = firstEntry.length > 0;
            if (checkNecessary) {
                var matched = true;
                for (var i = 1; (i < self.boardSize) && matched; i++) {
                    matched = self.getCellState(i - 1, j) === self.getCellState(i, j);
                }
                if (matched)
                    return firstEntry;
            }
        }
        return false;
    };

    return TicTacToeGameState;
});
    