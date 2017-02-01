const cols = 10;
const rows = 10;

let cellWidth;
let cellHeight;

let maze;
let start;
let end;

function setup() {
	// create the canvas
    let canvas = createCanvas(400, 400);
	canvas.parent('maze');

	// calculate the size of each cell
	cellWidth = (width-1) / cols;
	cellHeight = (height-1) / rows;

	// generate the maze
	const mazePattern = generateMaze(cols, rows);
	console.log(displayMaze(mazePattern));
	maze = buildMaze(mazePattern);

	start = maze[0][0];
	end = maze[cols-1][rows-1];
}

// draw is a loop, so we don't need a while loop for the algorithm
function draw() {
	
	background(0);
	
	// draw each cell of the maze grid
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			maze[r][c].draw();
		}
	}

	start.draw(color(0,230,118));
	end.draw(color(68,138,255));

	noLoop();

}