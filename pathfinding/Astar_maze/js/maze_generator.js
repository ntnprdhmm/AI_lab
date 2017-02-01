// =====================
// generator algorithm from http://rosettacode.org/wiki/Maze_generation#JavaScript
// =====================

function generateMaze(x,y) {
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
	    verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
	    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	    path = [here],
	    unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
}

function displayMaze(m) {
	var text = [];
	for (var j = 0; j < m.x*2+1; j++) {
		var line = [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= '+';
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= ' ';
					else
						line[k]= '-';
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= ' ';
					else
						line[k]= '|';
				else
					line[k]= ' ';
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		if (m.x*2-1 == j) line[4*m.y]= ' ';
		text.push(line.join('')+'\r\n');
	}
	return text.join('');
}

// ===============
// Custom function to build a javascript maze grid from the pattern generated with generateMaze
// ===============

/**
 * Return a javascript 2D array : the maze grid. Each cell is a Cell object
 */
function buildMaze(m) {
    // create the maze grid
    let maze = new Array(m.x);
    for (let i = 0; i < m.x; i++) {
        maze[i] = new Array(m.y);
        // init the grid in the same time
        for (let j = 0; j < m.y; j++) {
            maze[i][j] = new Cell(i, j);
        }
    }

    // open the horizontal walls (set the maze[c][r] cell's right attr to true, and maze[c+1][r] cell's left attr to true)
    for (let r = 0; r < m.y; r++) {
       for (let c in m.horiz[r]) {
           c = parseInt(c);
           maze[c][r].right = true;
           if (c < m.x - 1) {
               maze[c+1][r].left = true;
           }
       }
    }

    // open the verical walls (set the maze[c][r] cell's bot  attr to true, and maze[c][r+1] cell's top bot attr to true)
    for (let r = 0; r < m.y; r++) {
       for (let c in m.verti[r]) {
           c = parseInt(c);
           maze[c][r].bot = true;
           if (r < m.y - 1) {
               maze[c][r+1].top = true;
           }
       }
    }

    // Open the entrance [0, 0] top, and the exit [x-1, y-1] right
    maze[0][0].top = true;
    maze[m.x - 1][m.y - 1].right = true;
	
    return maze;
}