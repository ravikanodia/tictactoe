var WebSocketServer = require("websocketserver");
var TicTacToe = require("./TicTacToe");

var server = new WebSocketServer("all", 9000);

var game = TicTacToe();

var connectionList = [];
var connections = {
  players: Array(2).fill(null),
  spectators: []
};

function updateClients() {
  var msg = game.getState();
  server.sendMessage("all", msg);
}

server.on("connection", id => {
  if (connections.players.indexOf(null) != -1) {
    connections.players[connections.players.indexOf(null)] = id;
  } else {
    connections.spectators.push(id);
  }
  console.log(`incoming connection id ${id}`);
});

server.on("message", (data, id) => {
  var mes = server.unmaskMessage(data);
  var str = server.convertToString(mes.message);
  console.log(str);
  var playerIndex = connections.players.indexOf(id);
  if (playerIndex == -1) {
    console.log(`spectators such as connection ${id} are not allowed to play`);
  }
  if (mes.id != id) {
    console.log(`connection ${id} is trying to send a message with id ${id}`);
  }
  mes.player = playerIndex;
  game.play(mes);
  updateClients();
});

server.on("closedconnection", function(id) {
  if (connections.players[0] == id) {
    console.log(`Player one (connection id ${id}) has left`);
    connections.players[0]= null;
  } else if (connections.players[1] == id) {
    console.log(`Player two (connection id ${id}) has left`);
    connections.players[1] = null;
  } else {
    console.log(`Spectator ${id} has left`);
    connection.spectators =
      _.filter(connection.spectators, spectatorId => spectatorId != id);
  }
});
