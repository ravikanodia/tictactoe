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
  that.playerSymbols = ['X', 'O'];
  that.nextPlayer = 0;

  that.getPlayerSymbol = function(index) {
    return that.playerSymbols[index];
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
        var symbol = that.squares[line[0]];
        return symbol &&
          _.every(line, square => that.squares[square] == symbol);
      }
    );
    if (winningLine) {
      return that.squares[winningLine[0]];
    }
    return null;
  };

  that.play = function(playerOrMessage, square) {
    var player;
    if (typeof playerOrMessage == 'object') {
      console.log(`got object with player ${playerOrMessage.player} and square ${playerOrMessage.square}`);
      player = playerOrMessage.player;
      square = playerOrMessage.square;
    } else {
      console.log(`got player ${player} and square ${square}`);
      player = playerOrMessage;
    }
    var symbol = that.getPlayerSymbol(player);
    if (that.getWinner()) {
      console.log(`Player ${player} tried to play in square ${square} but the game is over!`);
    } else if (!_.contains([0, 1], player)) {
      console.log(`Player ${player} does not exist, but attempted to play in square ${square}`);
    } else if (player !== that.nextPlayer) {
      console.log(`Player ${player} attempted to play in square ${square}, but it is not their turn`);
    } else if (!_.contains(_.map(that.squares, (content, index) => index), square)) {
      console.log(_.map(that.squares, (content, index) => index));
      console.log(`Player ${player} attempted to play in non-existent square ${square}`);
    } else if (that.squares[square] !== null) {
      console.log(`Player ${player} attempted to play in square ${square}, but it is already filled`);
    } else {
      that.squares[square] = symbol;
      that.nextPlayer = that.nextPlayer ? 0 : 1;
    }
  };

  that.getState = function() {
    return {
      winner: that.getWinner(),
      squares: that.squares,
      nextPlayer: that.nextPlayer,
      nextPlayerSymbol: that.getPlayerSymbol(that.nextPlayer)
    }
  };

  return that;
};


module.exports = TicTacToe;
