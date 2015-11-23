// Game State:  What is current "state" of the game?
  // Data structure to hold information
  // Check if game is complete

// Display: How should the game's state be shown to the users?
  // Prompting the user: alerts?
  // Show who's turn it is?
  // Show game state: table, tr, td

// Interaction:  How will the user communicate with the game?
  // event listeners to capture click events
  // Identify which block they wanted


// -------------**********--------------



function TicTacToeGame(){

  this.gameState = [
    'a','b','c',   // 0,1,2
    'd','e','f',   // 3,4,5
    'g','h','i'    // 6,7,8
  ];

  this.currentPlayer = 1;

}

// Ability to make a move
TicTacToeGame.prototype.makeMove = function(cellNumber){
  this.gameState[cellNumber] = this.currentPlayer;
  this.currentPlayer = this.currentPlayer%2 + 1;
};


TicTacToeGame.prototype.$el = $('<table>');

// Ability to generate HTML to display the gameState
TicTacToeGame.prototype.render = function(){

  this.$el.empty();
  var cell;
  var row;
  var cellNumber = 0;

  for (var rowIdx = 0; rowIdx < 3; rowIdx++) {  // Create each row...
    row = $('<tr>');
    for (var colIdx = 0; colIdx < 3; colIdx++) { // create each colum...
      cell = $('<td>');
      cell.addClass('cell');
      cell.data('cell-number', cellNumber); // Places cell number hidden in html
      cell.addClass('player-' + this.gameState[cellNumber]);

      row.append(cell); // append col to the row

      cellNumber++;
    }
    this.$el.append(row)  // append row to the table
  }

};


TicTacToeGame.prototype.renderGameComplete = function(winner){
  $('#game-board').empty();
  var winnerMessage = $('<h1>').text("Great Job Player " + winner);
  winnerMessage.hide();
  $('#game-board').append(winnerMessage);
  winnerMessage.fadeIn(5000);
  setTimeout(function(){
    $('#game-board').empty();
    var game = new TicTacToeGame(); // Create a game object
    game.render(); // render the game
    $('#game-board').append(game.$el); // append display to dom
    game.addEventListers();
  },6000);
};


TicTacToeGame.prototype.addEventListers = function(){
  var scope = this;
  this.$el.on('click', 'td', function(){
    var cellNumber = $(this).data('cell-number');  // obtain cell number...
    scope.makeMove(cellNumber); // make move
    scope.render(); // render
    var winner = scope.checkGameStatus();
    if (winner){
      scope.renderGameComplete(winner);
    }
  });
};


TicTacToeGame.prototype.checkGameStatus = function(){

  var winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var combo = winningCombinations[i];
    if(
      this.gameState[combo[0]] == this.gameState[combo[1]]
        &&
      this.gameState[combo[1]] == this.gameState[combo[2]]
    ){
      return this.gameState[combo[0]]; // If winner... return player number
    }
  }

  return false; // game is not won yet

};



var game = new TicTacToeGame(); // Create a game object
game.render(); // render the game

$(function(){ // Make sure the documnet is ready
  $('#game-board').append(game.$el); // append display to dom
  game.addEventListers();
})



// -------------**********--------------
