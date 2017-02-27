let board;
let score_el = document.getElementById('score');
let playerButton_el = document.getElementById('btn-player');
let popup_el = document.getElementsByClassName('popup')[0];
let popupMessage_el = popup_el.getElementsByClassName('popup-message')[0];
let play = false;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

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
    if (play) {
        board.draw();
        board.setSnakePosition();
    } else {
        noLoop();
    }
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

// ********
// OTHER FUNCTIONS
// ********

playerButton_el.addEventListener('click', _ => {
    console.log('new game');
    board = new Board();
    popup_el.style.display = 'none';
    play = true;
    loop();
});

/**
 *  Stop the game and show the popup
 */
function stopLoop(message) {
    console.log('game stopped');
    noLoop();
    play = false;
    popupMessage_el.innerHTML = message;
    popup_el.style.display = 'block';
}

/**
 *  Update the score on the page
 *  @param score : the new score
 */
function setScore(score) {
    score_el.innerHTML = score;
}
