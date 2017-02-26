class Board {

    constructor() {
        // define properties
        this.width = 600;
        this.height = 500;
        this.cellWidth = 20;
        this.cellHeight = 20;
        this.cols = this.width / this.cellWidth;
        this.rows = this.height / this.cellHeight;
        // init the board array
        this.board = [];
        for (let j = 0; j < this.rows; j++) {
            let row = [];
            for (let i = 0; i < this.cols; i++) {
                row.push(new Cell(i, j, this.cellHeight, this.cellWidth));
            }
            this.board.push(row);
        }
    }

    draw() {
        // set
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.board[j][i].draw((i == 0 || i == this.cols-1 || j == 0 || j == this.rows-1) ? color(0) : null);
            }
        }
    }

}
