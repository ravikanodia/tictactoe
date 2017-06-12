var _ = require('underscore');

var TicTacToe = function() {
  //
  //  0 | 1 | 2
  // ---+---+---
  //  3 | 4 | 5
  // ---+---+---
  //  6 | 7 | 8
  //
  var that = {};

  // squares can be null, 'X', or 'O'
  that.squares = Array(9).fill(null);
  // X is player 1, O is player two
  that.players = ['X', 'O'];
  that.nextPlayer = 'X';

  that.getPlayer = function(index) {
    return that.players[index];
  };

  that.getWinner = function() {
    var lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 5],
      [2, 4, 6]
    ];

    var winningLine = _.find(
      lines,
      line => {
        var symbol = squares[line[0]];
        return symbol &&
          _.every(line, square => squares(square) == symbol);
      }
    );
    if (winningLine) {
      return squares[winningLine[0]];
    }
    return null;
  };

  that.play = function(playerOrMessage, square) {
    var player;
    if (typeof playerOrMessage == 'object') {
      player = playerOrMessage.player;
      square = playerOrMessage.square;
    } else {
      player = playerOrMessage;
    }
    if (that.getWinner()) {
      console.log(`Player ${player} tried to play in square ${square} but the game is over!`);
    } else if (!_.contains(that.players, player)) {
      console.log(`Player ${player} does not exist, but attempted to play in square ${square}`);
    } if (player !== that.nextPlayer) {
      console.log(`Player ${player} attempted to play in square ${square}, but it is not their turn`);
    } else if (!(square in that.squares)) {
      console.log(`Player ${player} attempted to play in non-existent square ${square}`);
    } else if (that.squares[square] !== null) {
      console.log(`Player ${player} attempted to play in square ${square}, but it is already filled`);
    } else {
      that.squares[square] = player;
      that.nextPlayer = _.find(that.players, possible => possible != player);
    }
  };

  that.getState = function() {
    return {
      squares: that.squares,
      nextPlayer: that.nextPlayer
    }
  };

  return that;
};


module.exports = TicTacToe;
