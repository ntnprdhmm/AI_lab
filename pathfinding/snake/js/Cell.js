class Cell {

    constructor(i, j, height, width, type='empty') {
        this.i = i;
        this.j = j;
        this.height = height;
        this.width = width;
        this.type = type;
    }

    /**
     *  Draw the cell on the screen, depending of his type
     */
    draw() {
        stroke(255);
        switch(this.type) {
            case 'wall':
                stroke(0);
                fill(0);
                this.drawRect();
                break;
            case 'snake head':
                fill(0, 0, 255);
                this.drawRect();
                break;
            case 'food':
                fill(0, 255, 0);
                this.drawCircle();
                break;
            default: // empty
                fill(255);
                this.drawRect();
                break;
        }
    }

    /**
     *  Draw a circle centered in the cell
     */
    drawCircle() {
        ellipse(
            this.i * this.width + this.width / 2,
            this.j * this.height + this.height / 2,
            this.width,
            this.height
        );
    }

    /**
     *  Color all the cell
     */
    drawRect() {
        rect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    }

    /**
     *  Set the cell to empty
     */
    empty() {
        this.type = 'empty';
    }

    /**
     *  Check if the snake can move on this cell
     */
    isFreeCell() {
        return this.type === 'empty' || this.type === 'food';
    }

    /**
     *  Check if the cell is empty
     */
    isEmpty() {
        return this.type === 'empty';
    }

}
