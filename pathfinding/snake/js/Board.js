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
                let type = (i == 0 || i == this.cols-1 || j == 0 || j == this.rows-1) ? 'wall' : 'empty';
                row.push(new Cell(i, j, this.cellHeight, this.cellWidth, type));
            }
            this.board.push(row);
        }
        // instantiate the snake
        this.snake = new Snake(this.randomEmptyCell());
        // put the snake on the grid
        this.board[this.snake.positions[0].j][this.snake.positions[0].i].type = "snake head";
    }

    draw() {
        // draw each cell of the grid
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.board[j][i].draw();
            }
        }
    }

    /**
     *  Return a random empty cell of the board
     */
    randomEmptyCell() {
        // loop while the generated cell is not empty
        while (true) {
            const coordinate = {
                i: Board.getRandomIntInclusive(1, this.rows),
                j: Board.getRandomIntInclusive(1, this.cols)
            };
            if (this.board[coordinate.j][coordinate.i].isEmpty()) {
                return coordinate;
            }
        }
    }

    /**
     *  Return a random integer between x : min <= x < max
     */
    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

}
