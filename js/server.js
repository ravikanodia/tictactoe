var _ = require("underscore");
var WebSocketServer = require("websocketserver");
var TicTacToe = require("./TicTacToe");

var server = new WebSocketServer("all", 9000);

var game = TicTacToe();
// connection index 0 and 1 are the players. Everyone else is spectating.
var connections = [];

function updateClients() {
  _.each(connections, connectionId => updateClient(connectionId));
}

function updateClient(connectionId) {
  server.sendMessage(
    "one",
    JSON.stringify(annotateStateForClient(game.getState(), connectionId)),
    connectionId);
}

function annotateStateForClient(state, clientId) {
  var clientState = _.clone(state);
  clientState.clientIndex = connections.indexOf(clientId);
  return clientState;
}

server.on("connection", id => {
  var index = (connections.indexOf(null) == -1) ?
    connections.length : connections.indexOf(null);
  connections[index] = id;
  console.log(`incoming connection id ${id} assigned to slot ${index}`);
  updateClient(id); 
});

server.on("message", (data, id) => {
  var mes = server.unmaskMessage(data);
  var str = server.convertToString(mes.message);
  console.log(str);
  var playerIndex = connections.indexOf(id);
  var action = JSON.parse(server.convertToString(mes.message));
  action.player = playerIndex;
  game.play(action);
  console.log(mes);
  console.log(data);
  console.log(action);
  updateClients();
});

server.on("closedconnection", function(id) {
  var index = connections.indexOf(id);
  var usertype;
  if (index == -1) {
    usertype = "unknown";
  } else if (_.contains([0, 1], index)) {
    usertype = "player";
  } else {
    usertype == "spectator";
  }

  console.log(`connection ${id} belonging to a ${usertype} in slot ${index} disconnected`);
  connections[index] = null;
});
