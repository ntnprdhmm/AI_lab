class Cell {

    constructor(x, y) {
        // position of this Cell on the maze grid
        this._x = x;
        this._y = y;
        // available directions (all closed by default)
        this._top = false;
        this._right = false;
        this._bot = false;
        this._left = false;
        // A* attriutes
        this._neightbors = [];
        this._previous = null;
        this._f = 0;
        this._g = 0;
        this._h = 0;
    }

    addNeighbors(grid) {
        const x = this._x;
        const y = this._y;

        if (this._right && x < cols-1) {
            this._neightbors.push(grid[x+1][y]);
        }
        if (this._left && x > 0) {
            this._neightbors.push(grid[x-1][y]);
        }
        if (this._bot && y < rows-1) {
            this._neightbors.push(grid[x][y+1]);
        }
        if (this._top && y > 0) {
            this._neightbors.push(grid[x][y-1]);
        }
    }

    drawPoint(color) {
        if (color) {
            fill(color)
        } else {
            fill(0);
        }
        strokeWeight(1);
        stroke(255);
        ellipse(
            this._x * cellWidth + cellWidth / 2,
            this._y * cellHeight + cellHeight / 2,
            cellWidth / 2,
            cellHeight / 2
        );
    }

    draw(color) {
        // draw the cell
        if (color) {
            fill(color);
        } else {
            fill(255);
        }
        strokeWeight(1);
        stroke(255);
        rect(this._x * cellWidth, this._y * cellHeight, cellWidth - 1, cellHeight - 1);
        // draw the cell's walls
        strokeWeight(4);
        stroke(0);
        if (!this._top) {
            line(
                this._x * cellWidth, 
                this._y * cellHeight, 
                this._x * cellHeight + cellWidth, 
                this._y * cellHeight
            );
        }
        if (!this._bot) {
            line(
                this._x * cellWidth, 
                this._y * cellHeight + cellHeight, 
                this._x * cellWidth + cellWidth, 
                this._y * cellHeight + cellHeight
            );
        }
        if (!this._right) {
            line(
                this._x * cellHeight + cellWidth,
                this._y * cellHeight,
                this._x * cellWidth + cellWidth,
                this._y * cellHeight + cellHeight
            );
        }
        if (!this._left) {
            line(
                this._x * cellWidth,
                this._y * cellHeight,
                this._x * cellWidth,
                this._y * cellHeight + cellHeight
            );
        }
    }

    // getters and setters

    get f() {
        return this._f;
    }

    get g() {
        return this._g;
    }

    get h() {
        return this._h;
    }

    get previous() {
        return this._previous;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get top() {
        return this._top;
    }

    get right() {
        return this._right;
    }

    get bot() {
        return this._bot;
    }
    
    get left() {
        return this._left;
    }

    set top(v) {
        this._top = v;
    }

    set right(v) {
        this._right = v;
    }

    set bot(v) {
        this._bot = v;
    }

    set left(v) {
        this._left = v;
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

}