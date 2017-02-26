class Cell {

    constructor(i, j, height, width, type='empty') {
        this.i = i;
        this.j = j;
        this.height = height;
        this.width = width;
        this.type = type;
    }

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

    drawCircle() {
        ellipse(
            this.i * this.width + this.width / 2,
            this.j * this.height + this.height / 2,
            this.width,
            this.height
        );
    }

    drawRect() {
        rect(this.i * this.width, this.j * this.height, this.width - 1, this.height - 1);
    }

    empty() {
        this.type = 'empty';
    }

    isEmpty() {
        return this.type === 'empty';
    }

}
