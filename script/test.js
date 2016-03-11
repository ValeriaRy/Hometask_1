function compareArray (array, array2) {
    for (var i = 0; i < array.length; i++) {
        for(var j = 0; j < array.length; j++) {
            if (array[i][j] != array2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

describe ("MAZE", function() {
    
    var testMaze =[
        [0,1,0,0,0],
        [0,1,0,1,0],
        [0,0,0,1,0],
        [1,1,0,1,0],
        [1,1,1,1,0]
        ];
    
    var graphVertices = [
        [1,0,7,8,9],
        [2,0,6,0,10],
        [3,4,5,0,11],
        [0,0,6,0,12],
        [0,0,0,0,13]
        ];
        
    var incorrectMaze = [
        [0,1,0],
        [0,1,0],
        [0,0,1]
        ];
        
    var mazeWithWay = [
        ['GO',1,'GO','GO','GO'],
        ['GO',1,'GO',1,'GO'],
        ['GO','GO','GO',1,'GO'],
        [1,1,0,1,'GO'],
        [1,1,1,1,'GO']
        ];
        
    it("Проверяет начало и конец лабиринта", function() {
        assert.equal(crossChecking(testMaze),"correct maze")
    });
    
    it ("Проверяет, что лабиринт непроходим", function() {
        assert.equal(crossChecking(incorrectMaze), "maze is impassable")
    });
    
    it("Создаёт пустой двумерный массив", function() {
        var k = checkEmptyArray(testMaze); 
        function checkEmptyArray(array) {
            var newArray = createMatrix(array);
            newArray.forEach(function(item, i, arr) {
                if (item != 0){
                    return false;
                }
            })
            return true;
        }
        assert.isTrue(k);
    });
    
    it("Проверяет распространение 'волны' в dfs-алгоритме", function() {
        var incompleteGraph = [
            [1,0,7,8,0],
            [2,0,6,0,0],
            [3,4,5,0,0],
            [0,0,6,0,0],
            [0,0,0,0,0]
            ];
        var newArray = passWave(0, 3, 9, incompleteGraph, testMaze);
        var k = compareArray(incompleteGraph,newArray);
        assert.isTrue(k);
    })
    
    it("Проверяет работу алгоритма поиска в ширину", function() {
        var graph = dfs(createMatrix(testMaze), testMaze);
        var k = compareArray(graphVertices,graph);
        assert.isTrue(k);
    });
    
    it("Проверяет метод, который ищет на графе ближайшего соседа на обратном пути",
    function() {
        var mazeReturn = [
            [0,1,0,0,"GO"],
            [0,1,0,1,0],
            [0,0,0,1,0],
            [1,1,0,1,0],
            [1,1,1,1,0]
            ];
        var graph = next(0, 4, graphVertices, testMaze);
        var k = compareArray(mazeReturn, graph);
        assert.isTrue(k);
    });
    
    it("Проверяет поиск кратчайшего пути по лабиринту",function() {
        var graph = back(graphVertices, testMaze);
        var k = compareArray(mazeWithWay, graph);
        assert.isTrue(k);
    });
});

describe ("VISUAL",function() {
    
    var testData = [
            [1,0,1],
            ['ht',2,0],
            [1, 90,1]
            ];
    var controlData = [
            [1,0,1],
            [1,1,0],
            [1,1,1]
            ];
 
    it ("Проверяет отрисовку границы вокруг лабиринта", function() {
        assert.equal(mazeBorders(5, 0, 6), "bottomCorner");
    });
    
    it("Проверяет преобразование входного массива в двоичное представление", function() {
        var k = compareArray(binaryRepresentation(testData), controlData);
        assert.isTrue(k);
    });

});