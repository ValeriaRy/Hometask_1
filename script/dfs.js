var x, y;
var startX = 0;
var startY = 0;

function crossChecking(array) {
    if ((array[startXY][startY] == 1) || (array[array.length-1][array.length-1] == 1)) {
		
        return "maze is impassable";
    } else {
		
        return "correct maze";
    }
}
    
function passWave(x, y, k, visited, maze) {
    if (visited[x][y] == k-1) {
        if ((x < maze.length-1) && (visited[x+1][y] == 0) && (maze[x+1][y] == 0)) {
            visited[x+1][y] = k;
        }
		
        if ((x > 0) && (visited[x-1][y] == 0) && (maze[x-1][y] == 0)) {
            visited[x-1][y] = k;
        }
		
        if ((y < maze.length-1) && (visited[x][y+1] == 0) && (maze[x][y+1] == 0)){
            visited[x][y+1] = k;
        }
		
        if ((y > 0) && (visited[x][y-1] == 0) && (maze[x][y-1] == 0)) {
            visited[x][y-1] = k;
        }
    }
    return visited;
}
      
function dfs(array, mazeArray) {
    array[startX][startY] = 1;
    var k = 1;
    while (k < mazeArray.length * mazeArray.length) {
        k++;
        for (x = 0; x < mazeArray.length; x++){
            for(y = 0; y < mazeArray.length; y++){
                array = passWave(x, y, k, array, mazeArray);
            }
        }
    } 
	
    return array;
}
      
function next(a, b, array, mazeArray) {
    for (var i = 0; i < mazeArray.length; i++ ) {
        for (var j = 0; j < mazeArray.length; j++) {
            if ((array[a][b] - array[i][j] == 1) && ((a == i) || (b == j))){
                mazeArray[a][b] = 'GO'; 
                x = i;
                y = j;
				
                return mazeArray;
            }
        }
    }
}

/*для отсечения тупиков*/
function back(array, mazeArray) {
    x = mazeArray.length-1;
    y = mazeArray.length-1;
    var stepNumber = array[mazeArray.length-1][mazeArray.length-1];
    for (var step = 1; step < stepNumber; step++) {
        mazeArray = next(x, y, array, mazeArray);
    }
    mazeArray[startX][startY] = 'GO';
	
    return mazeArray;
}
     
function createMatrix(mazeArray) {
    var array = new Array(mazeArray.length);
    for(var i = 0; i < array.length; i++) {
        array[i] = new Array(mazeArray.length);
        for(var n = 0; n < array[i].length; n++) {
            array[i][n] = 0;
        }
    }
	
    return array;
}