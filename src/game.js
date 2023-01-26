class Game {
    constructor(s = undefined) {
        // applying the testing preset on the gamemap
        if (s) {
            this.fields = s.split("").map(c => parseInt(c));
        // if there is no testing preset it sets the gamemap to 0
        } else {
            this.fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        // defines the players | used for the turn system
        this.playerWebsockets={
            1:undefined, 2:undefined
        }
        this.playerInTurn = 1;
        this.winnerBoxes = [];
        this.winner = null;
        this.countdown = null
    }

setWs(player, ws){
    this.playerWebsockets[player] = ws;
}

getWs(player){
    return this.playerWebsockets[player];
}

isNextPlayer(player) {
    return this.playerInTurn == player;
}

// changes the Symbol of a activted box and updates the turn
onClick(indexPost, player) {

    this.changeSymbol(parseInt(indexPost), player);
    this.winCheck(player);
    this.playerInTurn ^= 3;
}

// changes the number in the array based on the current player
changeSymbol(indexNew, playerInTurn){ 
    this.fields[indexNew] = playerInTurn;
}

// changes the Symbol of the index based on the current player
setField(index, symbol) {
    if (this.fields[index] == 0) {
        this.fields[index] = symbol;
        return true;
    }
    else {
        return false;
    }
}

// checks if a player won the game and
// adjusts the variables in the game object
// winner = null / player
// winnerBoxes = winningBoxes[] / winningBoxes[0,1,2]
winCheck(player) {

    // stores the index of the winner Boxes
    let winningBoxes = [];

    // checks the rows
    const rowIndices = [0, 3, 6];
    // goes through every row from top to bottom
    for (let i = 0; i < rowIndices.length; ++i) {
        const index = rowIndices[i];
        // goes through every box in that row from left to right
        for (let a = index; a < index + 3; ++a) {
            if (this.fields[a] != player) {
                winningBoxes = [];
                break;
            }
            else if(this.fields[a] == player){
                winningBoxes.push(a);
            } 
            
            // returns true if all boxes match
            if (a == index + 2) {
                console.log("Winner Boxes: ", winningBoxes);
                this.winnerBoxes = winningBoxes;
                this.winner = player;
                return;
            }
        }
    }
    // checks the columns
    const columnIndices = [0, 1, 2];
    // goes through every column from left to right
    for (let j = 0; j < columnIndices.length; ++j) {
        const index = columnIndices[j];
        // goes through every box in that column from top to bottom
        for (let b = index; b < index + 9; b += 3) {
            if (this.fields[b] != player) {
                winningBoxes = [];
                break;
            }
            else if(this.fields[b] == player){
                winningBoxes.push(b);
            } 

            // returns true if all boxes match
            if (b == index + 6) {
                console.log("Winner Boxes: ", winningBoxes);
                this.winnerBoxes = winningBoxes;
                this.winner = player;
                return;
            }
        }
    }
    // check for the diagonals

    // top left to bottom right
    for (let c = 0; c <= 8; c += 4) {
        if (this.fields[c] != player) {
            winningBoxes = [];
            break;
        }
        else if(this.fields[c] == player){
            winningBoxes.push(c);
        } 
        
        // returns true if all boxes match
        if (c == 8) {
            console.log("Winner Boxes: ", winningBoxes);
            this.winnerBoxes = winningBoxes;
            this.winner = player;
            return;
        }
    }

    // top right to bottom left
    for (let d = 2; d <= 6; d += 2) {
        if (this.fields[d] != player) {
            winningBoxes = [];
            break;        
        }
        else if(this.fields[d] == player){
            winningBoxes.push(d);
        } 
        
        // returns true if all boxes match
        if (d == 6) {
            console.log("Winner Boxes: ", winningBoxes);
            this.winnerBoxes = winningBoxes;
            this.winner = player;
            return;
        }
    }

    // checks if all boxes are filled and no one won yet
    for( let e = 0; e <= 9; e++){
        if(this.fields[e] == 0){
            break
        }
        if(e == 9){
            this.winner = "none";
            return;
        }
    }

    return { result: false };

}

// gets the corrisponding symbol of a player based on the index of the array
getSymbol(index) {
    if (this.fields[index] == 1){
        return "X"

    }
    else if (this.fields[index] == 2){
        return "O"
    }
    else {
        return null
    }
} 

timer(playerInTurn) {
    
}

}
module.exports = Game;