/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TicTacToeCell module
 */
define([], function () {
    /**
     * The view model for the main content view template
     */
    function TicTacToeCell(i,j,val) {
        var self = this;
        self.x = i;
        self.y = j;
        self.value = val;
    }
    
    return TicTacToeCell;
});
