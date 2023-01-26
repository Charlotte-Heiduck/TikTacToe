// libraries and references
const e = require('express');
const express = require('express')
const app = express();
const expressWs = require('express-ws')(app);
const port = 3000
const Game = require("./game.js");
const bodyParser = require('body-parser');
const uuid = require("uuid").v4;

// storing the active games and players
const waitingPlayers = [];
const games = new Map();

// EJS magic
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// lobby and its functions
app.ws('/lobby', function (ws, req) {
  console.log("connection created");

  // triggered when player wants to search for a game
  if (waitingPlayers.length > 0) {
    // if there is another player already waiting
    // the server creates a new game and connects both player to it 
    const id = uuid();
    const game = new Game();
    // creates the game with the generated ID and Game object
    games.set(id, game);
    const ws2 = waitingPlayers.shift();
    // redirect both players to the game url
    // gives them their player number
    ws.send(JSON.stringify({ gameId: id, player: 1 }));
    ws2.send(JSON.stringify({ gameId: id, player: 2 }));
  } else {
    // puts the player in the waiting list
    waitingPlayers.push(ws);
  }
});

app.ws('/playfield/:id/:player', function (ws, req) {
  const game = games.get(req.params.id);
  game.setWs(req.params.player, ws);
});



app.get('/playfield/:id/:player', function (req, res) {
  const game = games.get(req.params.id);
  if(game){
    res.render('playfield', { game, result: false, player:req.params.player});
  }
  else{
    res.redirect("/lobby");
  }
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
  informOtherPlayer (game, player);
  res.render('playfield', { game, player:req.params.player });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
