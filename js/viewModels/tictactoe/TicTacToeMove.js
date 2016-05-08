/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TicTacToePlayer module
 */
define([], function () {
    /**
     * The view model for the main content view template
     */
    function TicTacToeMove(x,y,pPlayerSymbol) {
        var self = this;
        self.x = x;
        self.y = y;
        self.playerSymbol = pPlayerSymbol;
    }
    
    return TicTacToeMove;
});
