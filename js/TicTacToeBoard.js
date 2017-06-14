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
        this.props.identityMessage)
    );
  }
}

class TicTacToeBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      nextPlayerSymbol: 'X'
    };
  }

  getStateMessage() {
    if (this.state.winner !== null) {
      return `Winner: ${this.state.winner}`;
    } else {
      return `Next to play: ${this.state.nextPlayerSymbol}`;
    }
  }

  getIdentityMessage() {
    if (this.state.clientIndex == 0) {
      return "You are X";
    } else if (this.state.clientIndex == 1) {
      return "You are O";
    } else {
      return "You are a spectator";
    }
  }

  handleUpdate(update) {
    this.setState(update);
  }

  play(squareIndex) {
    console.log(`playing square ${squareIndex}`);
    this.props.socket.send(JSON.stringify({square: squareIndex}));
  }

  render() {
    this.props.socket.onmessage = event => {
      var gameData = JSON.parse(event.data);
      console.log(`board got message: ${JSON.stringify(gameData)}`);
      if (!gameData.hasOwnProperty('nextPlayer')) {
        console.log("skipping");
        return;
      }
      this.handleUpdate(gameData);
    }
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
              onclick: () => { this.play(index); }
            },
          );
        })
      ),
      React.createElement(
        TicTacToeStatus,
        {
          stateMessage: this.getStateMessage(),
          identityMessage: this.getIdentityMessage()
        })
    );
  }
};

module.exports = TicTacToeBoard;
