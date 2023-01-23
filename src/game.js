

class Game {
    constructor(s = undefined) {
        if (s) {
            this.fields = s.split("").map(c => parseInt(c));
        } else {
            this.fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.width = 3;
        this.height = 3;
        this.playerWebsockets={
            1:undefined, 2:undefined
        }
        this.playerInTurn = 1;
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
    onClick(indexPost, player) {

        this.changeSymbol(parseInt(indexPost), player);
        this.playerInTurn ^= 3;
        console.log ("playerInTurn = ", this.playerInTurn);
    }

    changeSymbol(indexNew, playerInTurn){ 
        this.fields[indexNew] = playerInTurn;
    }

    setField(index, symbol) {
        if (this.fields[index] == 0) {
            this.fields[index] = symbol;
            return true;
        }
        else {
            return false;
        }
    }

    winCheck(player) {
        // prüfe zeilen
        const rowIndices = [0, 3, 6];
        for (let i = 0; i < rowIndices.length; ++i) {
            const index = rowIndices[i];
            // prüfe...
            for (let a = index; a < index + 3; ++a) {
                if (this.fields[a] != player) {
                    break;
                } else if (a == index + 2) {
                    return true;
                }
            }
        }
        // prüfe spalten
        const columnIndices = [0, 1, 2];
        for (let j = 0; j < columnIndices.length; ++j) {
            const index = columnIndices[j];
            // prüfe Zellen in Spalten
            for (let b = index; b < index + 9; b += 3) {
                if (this.fields[b] != player) {
                    break;
                } else if (b == index + 6) {
                    return true;
                }
            }
        }
        // prüfe diagonalen
        // links oben nach rechts unten
        for (let c = 0; c <= 8; c += 4) {
            if (this.fields[c] != player) {
                break;
            }
            else if (c == 8) {
                return true;
            }
        }

        // rechts oben nach links unten
        for (let d = 2; d <= 6; d += 2) {
            if (this.fields[d] != player) {
                break;
            }
            else if (d == 6) {
                return true
            }
        }
        return false;
    
    }

    getSymbol(index) {
        if (this.fields[index] == 1){
            return "X"
    
        }
        else if (this.fields[index] == 2){
            return "O"
        }
        else {
            return " "
        }
    } 
}


    module.exports = Game;