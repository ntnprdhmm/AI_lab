class Board {

    constructor() {
        // define properties
        this.width = windowWidth < 800 ? windowWidth : 800;
        this.height = windowHeight - 200;
        this.cellWidth = windowWidth < 350 ? 20 : 30;
        this.cellHeight = this.cellWidth;
        while (this.width % this.cellWidth) {
            this.width--;
        }
        while (this.height % this.cellHeight) {
            this.height--;
        }
        this.cols = parseInt(this.width / this.cellWidth);
        this.rows = parseInt(this.height / this.cellHeight);
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
        this.snake = new Snake(this.randomEmptyCell(), this.cols);
        this.board[this.snake.positions[0].j][this.snake.positions[0].i].type = "snake head";
        // generate food on the map
        this.food = this.randomEmptyCell();
        this.board[this.food.j][this.food.i].type = "food";
        setScore(this.snake.size);
    }

    /**
     *  Draw the grid on the screen
     */
    draw() {
        // draw each cell of the grid
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.board[j][i].draw();
            }
        }
    }

    /**
     *  Set the snake direction
     *  @param direction : the new snake direction
     */
    setSnakeDirection(direction) {
        this.snake.direction = direction;
    }

    /**
     *  Move the snake to his next position
     */
    setSnakePosition() {
        // calculate the new position (depending of the direction)
        let nextPosition = this.snake.getNextPosition();
        // if the direction is not valid, kill the snake
        if (!this.isValidMove(nextPosition.i, nextPosition.j)) {
            // remove each part of the snake's tail
            for (let part of this.snake.kill()) {
                this.board[part.j][part.i].empty();
            }
            stopLoop("You killed your snake :'(");
        } else {
            // if it's food, pick it !
            if (this.board[nextPosition.j][nextPosition.i].type == 'food') {
                this.eatFood();
                setScore(this.snake.size);
            } else {
                // remove the tail on the board
                let tail = this.snake.getTailEndPosition();
                this.board[tail.j][tail.i].empty();
                // shift the positions to the right and update the snake head
                this.snake.move(nextPosition);
                this.board[nextPosition.j][nextPosition.i].type = 'snake';
            }
        }
    }

    /**
     * When the snake eat the food
     */
    eatFood() {
        this.snake.eat(this.food.i, this.food.j);
        // remove the food of the board
        this.board[this.food.j][this.food.i].type = "snake";
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
                i: Board.getRandomIntInclusive(1, this.cols),
                j: Board.getRandomIntInclusive(1, this.rows)
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
        return Math.floor(Math.random() * (max - min)) + min;
    }

}
