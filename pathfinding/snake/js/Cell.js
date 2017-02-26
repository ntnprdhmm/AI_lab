class Cell {

    constructor(i, j, height, width, type='empty') {
        this.i = i;
        this.j = j;
        this.height = height;
        this.width = width;
        this.type = type;
    }

    draw() {
        switch(this.type) {
            case 'wall':
                stroke(0);
                fill(0);
                break;
            case 'snake head':
                stroke(0);
                fill(0, 0, 255);
                break;
            default: // empty
                stroke(220);
                fill(255);
                break;
        }
        rect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    }

    isEmpty() {
        return this.type === 'empty';
    }

}
