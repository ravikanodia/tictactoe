var React = require('react');
var ReactDOM = require('react-dom');
var TicTacToeBoard = require('./TicTacToeBoard');

ws = new WebSocket('ws://localhost:9000');


var board = React.createElement(
  TicTacToeBoard,
  {
    socket: ws/*,
    play: (squareIndex) => {
      console.log(`playing square ${squareIndex}`);
      ws.send(JSON.stringify({square: squareIndex}));
    }*/
  });


/*ws.onmessage = event => {
  console.log(JSON.parse(event.data));
//  return;
  var gameData = JSON.parse(event.data);
  if (!gameData.hasOwnProperty('nextPlayer')) {
    return;
  }

  board.handleUpdate({
    squares: gameData.squares,
    nextPlayerSymbol: gameData.nextPlayerSymbol,
    winner: gameData.winner,
    nextPlayer: gameData.nextPlayer
  });

  console.log(`client got message data ${JSON.stringify(gameData)}`);
};
*/

ReactDOM.render(board, document.getElementById('tic-tac-toe'));

