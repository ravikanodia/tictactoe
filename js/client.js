var React = require('react');
var ReactDOM = require('react-dom');
var TicTacToeBoard = require('./TicTacToeBoard');

ws = new WebSocket('ws://localhost:9000');

ReactDOM.render(React.createElement(TicTacToeBoard),
  document.getElementById('tic-tac-toe'));
ws.onmessage = data => {
  console.log(data)
};

