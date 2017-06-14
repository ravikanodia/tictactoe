# tictactoe
TicTacToe client and server using websockets

## Setup
After installing node, run

<code>npm install</code>

## Running

<code>node js/server.js</code>

Then open index.html in a browser. (You'll need to open two tabs to play a complete game). Click on squares to play in them. Players beyond the first two connections will be spectators. If a player leaves, the next connection will take their spot.

## Todos and caveats
* Only one game can be played each time the server process is executed. You'll have to kill the server process and run it again to play a new game.
* The client automatically connects to localhost:9000, meaning the players need to be on the same host as the server
* could use a lot of visual polish
* If you make local changes to the client, you'll need to run  <code>browserify js/client.js -o client.js</code>
