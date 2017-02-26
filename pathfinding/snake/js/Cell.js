class Cell {

    constructor(i, j, height, width) {
        this.i = i;
        this.j = j;
        this.height = height;
        this.width = width;
    }

    draw(color) {
        stroke(color ? color : 220);
        fill(color ? color : 255);
        rect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    }

}
