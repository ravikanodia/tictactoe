var React = require('react');
var ReactDOM = require('react-dom');
var TicTacToeBoard = require('./TicTacToeBoard');

ws = new WebSocket('ws://localhost:9000');

ws.onmessage = data => {
  console.log(data)
};

ReactDOM.render(
  React.createElement(
    TicTacToeBoard,
    {
      play: (squareIndex) => {
        console.log(`playing square ${squareIndex}`);
        ws.send(JSON.stringify({square: squareIndex}));
      }
    }
  ),
  document.getElementById('tic-tac-toe'));

