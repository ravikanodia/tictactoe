var React = require('react');
var _ = require('underscore');

class TicTacToeSquare extends React.Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'tic-tac-toe-square',
        onClick: this.props.onclick
      },
      this.props.value
    );
  }
}

class TicTacToeBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: 'X'
    };
  }

  render() {
    return React.createElement(
      'div',
      {
        className: 'tic-tac-toe-board',
      },
      _.map(this.state.squares, (value, index) =>
        {
          return React.createElement(
            TicTacToeSquare,
            {
              key: index,
              value: this.state.squares[index],
              onclick: () => console.log('click ' + index)
            }
          );
        }));
  }
};

module.exports = TicTacToeBoard;
