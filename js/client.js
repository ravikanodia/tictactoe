var React = require('react');
var ReactDOM = require('react-dom');
var TicTacToeBoard = require('./TicTacToeBoard');

ws = new WebSocket('ws://localhost:9000');

var board = React.createElement(
  TicTacToeBoard,
  { socket: ws });

ReactDOM.render(board, document.getElementById('tic-tac-toe'));

