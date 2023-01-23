const e = require('express');
const express = require('express')
const app = express()
const expressWs = require('express-ws')(app);
const port = 3000
const Game = require("./game.js");
const bodyParser = require('body-parser');
const uuid = require("uuid").v4;

const waitingPlayers = [];
const games = new Map();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.ws('/lobby', function (ws, req) {
  console.log("connection created");

  if (waitingPlayers.length > 0) {
    // spieler verbinden  
    const id = uuid();
    const game = new Game();
    games.set(id, game);
    const ws2 = waitingPlayers.shift();
    ws.send(JSON.stringify({ gameId: id, player: 1 }));
    ws2.send(JSON.stringify({ gameId: id, player: 2 }));
  } else {
    // spieler in der warteschlange
    waitingPlayers.push(ws)
  }

  ws.on('message', function (msg) {
    ws.send(msg);

  });
});

app.ws('/playfield/:id/:player', function (ws, req) {
  console.log("playfield: connection created");
  const game = games.get(req.params.id);
  game.setWs(req.params.player, ws);
  ws.on('message', function (msg) {
    ws.send(msg);
    console.log("ws recieved", msg);
  });
});

app.get('/playfield/:id/:player', function (req, res) {
  const game = games.get(req.params.id);
  console.log("GET playfield")
  console.log ("game.playerInTurn:", game.playerInTurn);
  console.log ("current player:", req.params.player);
  res.render('playfield', { game, result: false, player:req.params.player});
});

app.get('/lobby', function (req, res) {
  res.render('lobby', {});
});

function informOtherPlayer(game, player){
  const otherPlayer = player ^3;
  const ws = game.getWs(otherPlayer);
  ws.send("game update");
}

app.post('/playfield/:id/:player', function (req, res) {
  const game = games.get(req.params.id);
  const player = parseInt(req.params.player);
  game.onClick(req.body.index, player);
  let result = game.winCheck(player);
  informOtherPlayer (game, player);
  console.log ("POST playfield");
  console.log ("game.playerInTurn:", game.playerInTurn);
  console.log ("current player:", req.params.player);
  res.render('playfield', { game, result,player:req.params.player });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
