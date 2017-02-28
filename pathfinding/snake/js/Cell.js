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
        stroke(51, 51, 51);
        switch(this.type) {
            case 'wall':
                fill(250);
                stroke(250);
                this.drawRect();
                break;
            case 'snake':
                fill(245, 0, 87);
                this.drawRect();
                break;
            case 'food':
                fill(30, 136, 229);
                this.drawCircle();
                break;
            default: // empty1
                fill(51, 51, 51);
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
