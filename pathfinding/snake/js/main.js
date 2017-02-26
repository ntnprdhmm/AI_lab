let board;

function setup() {
    // slow the frame rate
    frameRate(10);
    // instantiate the board
    board = new Board();
    // create the canvas and put it into the #maze div on the html page
    let canvas = createCanvas(board.width, board.height);
	canvas.parent('snake');
}

function draw() {
    board.draw();
    board.moveSnake();
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        board.updateSnakeDirection('up');
    } else if (keyCode == RIGHT_ARROW) {
        board.updateSnakeDirection('right');
    } else if (keyCode == DOWN_ARROW) {
        board.updateSnakeDirection('down');
    } else if (keyCode == LEFT_ARROW) {
        board.updateSnakeDirection('left');
    }
}
