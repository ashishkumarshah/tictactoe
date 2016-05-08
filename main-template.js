/**
 * Example of Require.js boostrap javascript
 */

requirejs.config({
    baseUrl: 'js/',
  // Path mappings for the logical module names
  paths: {
    'knockout': 'libs/knockout/knockout-3.4.0',
    'jquery': 'libs/jquery/jquery-2.1.3.min',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
    'PageContainer': 'viewModels/PageContainer',
    'knockout-amd-helpers' : 'libs/knockout-amd-helpers/knockout-amd-helpers',
    'text': 'libs/text/text',
    //
    'player': 'viewModels/tictactoe/TicTacToePlayer',
    'gamestate': 'viewModels/tictactoe/TicTacToeGameState',
    'gamemove': 'viewModels/tictactoe/TicTacToeMove',
    'gameboard': 'viewModels/tictactoe/TicTacToeGameBoard',
    'gameengine' : 'viewModels/tictactoe/TicTacToeGameEngine',
    'cell': 'viewModels/tictactoe/TicTacToeCell'
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jquery','$']
    }
  }
});


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback.
 *
 * For a listing of which JET component modules are required for each component, see the specific component
 * demo pages in the JET cookbook.
 */
require(['knockout-amd-helpers','PageContainer','knockout','jquery'],
function(koHelpers ,PageContainer, ko,$) {
    
   $(document).ready(function() {
      var pageContainer = new PageContainer();
      ko.applyBindings(pageContainer);
   });
});

