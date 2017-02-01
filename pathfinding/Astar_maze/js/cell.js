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
    }

    draw(color) {
        // draw the cell
        if (color) {
            fill(color);
        } else {
            fill(255);
        }
        stroke(255);
        rect(this._x * cellWidth, this._y * cellHeight, cellWidth - 1, cellHeight - 1);
        // draw the cell's walls
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

}