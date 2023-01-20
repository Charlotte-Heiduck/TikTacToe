
class Game {
    constructor(s = undefined) {
        if (s) {
            this.fields = s.split("").map(c => parseInt(c));
        } else {
            this.fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.width = 3;
        this.height = 3;
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
        
    }

    generateIndices() {
        const rowIndices = [];
        const columnIndices = [];
        const diagIndices = [];

        diagIndices.push(0);
        diagIndices.push(this.width);
        // rowIndecies
        for(let i = 0; i < this.width; i++){
            rowIndices.push(i);
        }
        for( i = 0; i < this.height; i++){
            rowIndices.push(this.rowIndices[i] += this.width);
        }
        // columIndecies
        for(let j = 1; j < this.height; j += this.width) {
            columnIndices.push(j);
        }
        for( j = 0; j < this.width; j++){
            columnIndices.push(this.columnIndices[j] += 1);
        }
        //columIndecies

        // second attempt rowIndecies
        for(let a = 0; a < this.width; i++){}



    }

    checkSymbols() {

    }
}