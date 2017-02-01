const cols = 10;
const rows = 10;

let cellWidth;
let cellHeight;

let maze;
let start;
let end;

let openSet = [];   // need to be evaluated
let closedSet = []; // already evaluated
let finalPath;		// path found

function setup() {
	// create the canvas and put it into the #maze div on the html page
    let canvas = createCanvas(400, 400);
	canvas.parent('maze');

	// calculate the size of each cell
	cellWidth = (width-1) / cols;
	cellHeight = (height-1) / rows;

	// generate the maze
	const mazePattern = generateMaze(cols, rows);
	maze = buildMaze(mazePattern);

	// search neighbors
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            maze[i][j].addNeighbors(maze);
        }
    }

	start = maze[0][0];
	end = maze[cols-1][rows-1];

	openSet.push(start);
}

function removeFromArray(arr, toRemove) {
    return arr.filter(e => e != toRemove);
}

/**
 * Calculate the distance between two points
 */
function heuristic(a, b) {
    // use the P5.js dist function
    return abs(a.x - b.x) + abs(a.y - b.y);
}

// draw is a loop, so we don't need a while loop for the algorithm
function draw() {
	
	background(0);

	if (openSet.length > 0) {
        
		// search the cell with the lowest F value
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        let current = openSet[lowestIndex];

		// check if the current Cell is the maze exit
        if (current === end) {
            // find the path
            finalPath = [];
            let temp = current;
            finalPath.push(temp);
            while (temp.previous) {
                temp = temp.previous;
                finalPath.push(temp);
            }
            
            noLoop();
            console.log("DONE !!");
        }

		// tell the algorithm this Cell has been evaluated
        openSet = removeFromArray(openSet, current);
        closedSet.push(current);

		for (let i = 0; i < current._neightbors.length; i++) {
            let neighbor = current._neightbors[i];
            let newPath = false; 

            if (!closedSet.includes(neighbor)) {
                // + 1 because every neighbor is at a distance of 1
                let tempG = current.g + 1;

                if (openSet.includes(neighbor)) {
                    // check if we've reach this Spot with a better path
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true; // found a better new path
                    }
                } else {
                    // else we have discovered a new Spot
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                    newPath = true; // first path to this new Spot (it's his best G for he moment)
                }

                // calculate if it's a new path
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }

    } else {
        noLoop();
        console.log('No solution');
    }
	
	// draw each cell of the maze grid
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			maze[r][c].draw();
		}
	}

	if (finalPath) {
        for (let i = 0; i < finalPath.length; i++) {
			finalPath[i].drawPoint(color(100, 181, 246));
        }
    } else {
		for (let i = 0; i < closedSet.length; i++) {
        	closedSet[i].draw(color(229, 115, 115));
		}
	}

	start.drawPoint(color(0,0,0));
	end.drawPoint(color(0,0,0));

}