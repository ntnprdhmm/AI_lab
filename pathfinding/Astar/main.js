const cols = 50;
const rows = 50;
let spotWidth, spotHeight;

let openSet = [];   // need to be evaluated
let closedSet = []; // already evaluated
let grid = new Array(cols);
let path;
let start;
let end;

function setup() {
    createCanvas(400, 400);
    
    spotWidth = width / cols;
    spotHeight = height / rows;

    // create the Grid
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    // init the Grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }
    // search neighbors
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
    // set start and end points
    start = grid[0][0];         // top left corner
    end = grid[cols-1][rows-1]; // bottom right corner
    // start and end can't be a wall
    start.isWall = false;
    end.isWall = false;

    openSet.push(start);
}

// draw is a loop, so we don't need a while loop for the algorithm
function draw() {

    if (openSet.length > 0) {
        // search the Spot with the lowest F value
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        let current = openSet[lowestIndex];
        // check if the current Spot is the goal
        if (current === end) {
            // find the path
            path = [];
            let temp = current;
            path.push(temp);
            while (temp.previous) {
                temp = temp.previous;
                path.push(temp);
            }
            
            noLoop();
            console.log("DONE !!");
        }
        // tell the algorithm this Spot has been evaluated
        openSet = removeFromArray(openSet, current);
        closedSet.push(current);
        for (let i = 0; i < current._neightbors.length; i++) {
            let neighbor = current._neightbors[i];
            let newPath = false; 

            if (!closedSet.includes(neighbor) && !neighbor.isWall) {
                // + 1 because everything is at a distance of 1
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

    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    if (path) {
        for (let i = 0; i < path.length; i++) {
            path[i].show(color(0, 0, 255));
        }
    }

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

class Spot {

    constructor(i, j) {
        // coordinate on the Grid (usefull to draw the Spot)
        this._x = i;
        this._y = j;
        this._neightbors = [];
        this._previous = null;
        // because f(n)=g(n)+h(n)
        this._f = 0;
        this._g = 0;
        this._h = 0;
        // is this Spot an a wall (obstacle) ?
        this._isWall = false;
        if (random(1) < 0.3) {
            this._isWall = true;
        }
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get f() {
        return this._f;
    }

    get g() {
        return this._g;
    }

    get h() {
        return this._h;
    }

    get isWall() {
        return this._isWall;
    }

    get previous() {
        return this._previous;
    }

    set f(newF) {
        this._f = newF;
    }

    set g(newG) {
        this._g = newG;
    }

    set h(newH) {
        this._h = newH;
    }

    set previous(newPrevious) {
        this._previous = newPrevious;
    }

    set isWall(newIsWall) {
        this._isWall = newIsWall;
    }

    addNeighbors(grid) {
        const x = this._x;
        const y = this._y;
        // row neighbors
        if (x < cols-1) {
            this._neightbors.push(grid[x+1][y]);
        }
        if (x > 0) {
            this._neightbors.push(grid[x-1][y]);
        }
        if (y < rows-1) {
            this._neightbors.push(grid[x][y+1]);
        }
        if (y > 0) {
            this._neightbors.push(grid[x][y-1]);
        }
        // diagonal neighbors
        if (x > 0 && y > 0) {
            this._neightbors.push(grid[x-1][y-1]);
        }
        if (x > 0 && y < rows-1) {
            this._neightbors.push(grid[x-1][y+1]);
        }
        if (x < cols-1 && y > 0) {
            this._neightbors.push(grid[x+1][y-1]);
        }
        if (x < cols-1 && y < rows-1) {
            this._neightbors.push(grid[x+1][y+1]);
        }
    }

    show(col) {
        if (this._isWall) {
            fill(0);
        } else {
            fill(col);
        }
        noStroke();
        // draw each spot (a rectangle). -1 to show the borders
        rect(this._x * spotWidth, this._y * spotHeight, spotWidth - 1, spotHeight - 1);
    }

}