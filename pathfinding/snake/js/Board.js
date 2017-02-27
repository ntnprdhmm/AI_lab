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
        // instantiate the snake and put it on the grid
        this.snake = new Snake(this.randomEmptyCell());
        this.board[this.snake.positions[0].j][this.snake.positions[0].i].type = "snake head";
        // generate food on the map
        this.food = this.randomEmptyCell();
        this.board[this.food.j][this.food.i].type = "food";
    }

    draw() {
        // draw each cell of the grid
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.board[j][i].draw();
            }
        }
    }

    updateSnakeDirection(direction) {
        this.snake.direction = direction;
    }

    moveSnake() {
        // calculate the new position (depending of the direction)
        let nextPosition = this.snake.getNextPosition();
        // if the direction is not valid, kill the snake
        if (!this.isValidMove(nextPosition.i, nextPosition.j)) {
            this.snake.kill();
        } else {
            // if it's food, pick it !
            if (this.board[nextPosition.j][nextPosition.i].type == 'food') {
                this.eatFood();
            }
            // remove the tail on the board
            let tail = this.snake.getTailPosition();
            this.board[tail.j][tail.i].empty();
            // first, shift the positions to the right

            // replace the head position and put it on the board
            this.snake.positions[0] = nextPosition;
            this.board[nextPosition.j][nextPosition.i].type = 'snake head';
        }
    }

    eatFood() {
        this.snake.eat();
        // remove the food of the board
        this.board[this.food.j][this.food.i].empty();
        // generate new food and draw it
        this.food = this.randomEmptyCell();
        this.board[this.food.j][this.food.i].type = 'food';
    }

    /**
     *  Return true if the point is on the board, and the cell is empty
     */
    isValidMove(i, j) {
        return i >= 0 && i < this.cols && j >= 0 && j < this.rows && this.board[j][i].isFreeCell();
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
