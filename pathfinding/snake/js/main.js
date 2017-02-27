let board;

/**
 *  P5.js function
 *  Prepare the canvas
 */
function setup() {
    // slow the frame rate
    frameRate(10);
    // instantiate the board
    board = new Board();
    // create the canvas and put it into the #maze div on the html page
    let canvas = createCanvas(board.width, board.height);
	canvas.parent('snake');
}

/**
 *  P5.js function
 *  The game loop
 */
function draw() {
    background(51, 51, 51);
    board.draw();
    board.setSnakePosition();
}

/**
 *  P5.js function
 *  Handle the keyboard events
 */
function keyPressed() {
    // when an arrow key is pressed, update the snake position
    if (keyCode == UP_ARROW) {
        board.setSnakeDirection('up');
    } else if (keyCode == RIGHT_ARROW) {
        board.setSnakeDirection('right');
    } else if (keyCode == DOWN_ARROW) {
        board.setSnakeDirection('down');
    } else if (keyCode == LEFT_ARROW) {
        board.setSnakeDirection('left');
    }
}
