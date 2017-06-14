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

class TicTacToeStatus extends React.Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'tic-tac-toe-status',
      },
      React.createElement(
        'div',
        {
          className: 'tic-tac-toe-state',
        },
        this.props.stateMessage),
      React.createElement(
        'div',
        {
          className: 'tic-tac-toe-identity',
        },
        this.props.identityMessage),
      React.createElement(
        'div',
        {
          className: 'tic-tac-toe-spectators',
        },
        this.props.spectatorsMessage)
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

  getStateMessage() {
    return "Next player: " + this.state.nextPlayer;
  }

  getSpectatorsMessage() {
    return "No spectators";
  }

  getIdentityMessage() {
    return "You exist in the universe";
  }

  render() {
    return React.createElement(
      'div',
      {
        className: 'tic-tac-toe',
      },
      React.createElement(
        'div',
        {
          className: 'tic-tac-toe-board'
        },
        _.map(this.state.squares, (value, index) => {
          return React.createElement(
              TicTacToeSquare,
              {
                key: index,
                value: this.state.squares[index],
                onclick: () => {
                  console.log('click ' + index);
                  this.props.play(index);
                }
              }
            );
        })
      ),
      React.createElement(
        TicTacToeStatus,
        {
          stateMessage: this.getStateMessage(),
          identityMessage: this.getIdentityMessage(),
          spectatorsMessage: this.getSpectatorsMessage()
        })
    );
  }
};

module.exports = TicTacToeBoard;
