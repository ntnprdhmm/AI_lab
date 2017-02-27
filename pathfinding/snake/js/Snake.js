class Snake {

    constructor(coordinates) {
        this.positions = [{
            i: coordinates.i,
            j: coordinates.j
        }];
        this.size = 1;
        this.direction = (coordinates.i < 5) ? 'left' : 'right';
    }

    /**
     *  Kill the snake
     *  => Remove his body (keep only the head in this.positions)
     */
    kill() {
        console.log('You died !');
        let tail = this.positions.slice(1);
        this.size = 1;
        this.positions = [this.positions[0]];
        return tail;
    }

    /**
     *  The snake become bigger of 1 when he eat food
     *  To make it bigger, just push new position at the beggining of this.positions (his new head)
     *  @param i
     *  @param j
     */
    eat(i, j) {
        console.log('Food !');
        this.size++;
        this.positions.unshift({i,j});
    }

    /**
     *  Shift the positions and update the head
     *  @param p : the new head position
     */
    move(p) {
        for (let i = this.size-1; i > 0; i--) {
            this.positions[i] = this.positions[i-1];
        }
        this.positions[0] = p;
    }

    /**
     *  Return the position of the last part of the snake (it will be removed of the board because the snake is moving)
     */
    getTailEndPosition() {
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
