let board;

function setup() {
    // instantiate the board
    board = new Board();
    // create the canvas and put it into the #maze div on the html page
    let canvas = createCanvas(board.width, board.height);
	canvas.parent('snake');
}

function draw() {
    background(0)
    board.draw();
    noLoop()
}
