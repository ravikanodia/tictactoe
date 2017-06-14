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
      nextPlayerSymbol: 'X'
    };
  }

  getStateMessage() {
    return "Next player: " + this.state.nextPlayerSymbol;
  }

  getSpectatorsMessage() {
    return "No spectators";
  }

  getIdentityMessage() {
    return "You exist in the universe";
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
      console.log("board got message: gameData");
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
          identityMessage: this.getIdentityMessage(),
          spectatorsMessage: this.getSpectatorsMessage()
        })
    );
  }
};

module.exports = TicTacToeBoard;
