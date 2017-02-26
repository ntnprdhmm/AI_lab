class Snake {

    constructor(coordinates) {
        this.positions = [{
            i: coordinates.i,
            j: coordinates.j
        }];
        this.size = 1;
        this.direction = (coordinates.i < 5) ? 'left' : 'right';
    }

    kill() {
        this.positions = [this.positions[0]];
    }

    /**
     *  Return the position of the last part of the snake (it will be removed of the board because the snake is moving)
     */
    getTailPosition() {
        return this.positions[this.size - 1];
    }

    /**
     *  Return the next position of the Snake, depending of his current direction
     */
    getNextPosition() {
        let nextPosition = {
            i: this.positions[0].i,
            j: this.positions[0].j,
        }
        switch (this.direction) {
            case 'up':
                nextPosition.j--;
                break;
            case 'right':
                nextPosition.i++;
                break;
            case 'left':
                nextPosition.i--;
                break;
            case 'down':
                nextPosition.j++;
                break;
        }
        return nextPosition;
    }

}
