var COLOR_CELL_SHOW_WAY = "#7FFFD4";

function mazeBorders(a, b, n) {
    if ((a == 0) && (b == n-1)) {
		
        return "upperCorner";
    }
	
    if((a == 0) && (b != 0) && (b < n-1)) {
		
        return "topBorder";
    }
	
    if((b == n-1) && (a > 0)) {
		
        return "rightBorder";
    }
	
    if ((b > 0) && (b < n-1) && (a == n-1)) {
		
        return "bottomBorder";
    }
	
    if((b == 0) && (a == n-1)) {
		
        return "bottomCorner";
    }
	
    if((b == 0) && (a < n-1)) {
		
        return "leftBorder";
    }
}

function verifyExistence(array) {
    var removeTable = document.getElementById("maze");
    if (removeTable) {
        removeTable.parentNode.removeChild(removeTable);
    }
    createTable(array);
}

function createTable(array) {
    var myTable = document.createElement("table");
    myTable.id = "maze";
    for (var i = 0; i < array.length; i++) {
        var newRow = myTable.insertRow(i);
        newRow.id = "str-" + i;
        cellСreation(newRow, array, i);
    }
    drawnMaze.appendChild(myTable);
}

function cellСreation(thisRow, array, i) {
    for (var j = 0; j < array.length; j++) {
        var newCell = thisRow.insertCell(j);
        newCell.id = "col-" + i + '-' + j;
        newCell.innerHTML = array[i][j];
        newCell.className = mazeBorders(i, j, array.length);
        if ((array[i][j] == 1) || (array[i][j] == undefined)) {
            newCell.style.background = "black";
            newCell.innerHTML = 1;
        } else if (array[i][j] == "GO") {
            newCell.style.background = COLOR_CELL_SHOW_WAY;
            newCell.innerHTML = 0;
        }
    }
}

function binaryRepresentation(matrix) {
    var numbArray = [];
    for (var i = 0; i < matrix.length; i++) {
        numbArray[i] = matrix[i].map(function(elem) {
            if (elem == "0") {
                return 0;
            } else {
                return 1;
            }
        });
    }
	
    return numbArray;
}

/*чтение из textarea*/
function readMatrix (strText) {
    var arrayStr = strText.split('\n', strText.length);
    var matrixArray = [];
    for (var j = 0; j < arrayStr.length; j++){
        var array = arrayStr[j].split(' ', arrayStr[j].length);
        matrixArray[j] = array;
    }
	
    return binaryRepresentation(matrixArray);
}

function setData() {
    var str = document.getElementById("inputMatrix").value;
    var maze = readMatrix(str);
    verifyExistence(maze);
    mazeBorders(maze);
    var errorMessage = crossChecking(maze);
    var txt = document.getElementById("text");
    txt.textContent = errorMessage;
}
        
function getWay() {
    var str = document.getElementById("inputMatrix").value;
    var maze = readMatrix(str);
    var correctMaze = crossChecking(maze);
    if (correctMaze == "correct maze"){
        var visited = dfs(createMatrix(maze), maze);
        maze = back(visited,maze);
        verifyExistence(maze);
    }
}
