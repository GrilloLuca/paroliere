
var arrayToMatrix = (arr, chunkSize) => 
    arr.map((e, i) => i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null)
    .filter(e => e)

function findNeighbour(dice, d) {

    var column = dice.indexOf(d)%4
    var row = parseInt(dice.indexOf(d)/4)

    var res = []
    var matrix = arrayToMatrix(dice, 4)

    for(var i=-1; i<2; i++) {
        for(var j=-1; j<2; j++) {

            if(matrix[row+i] && matrix[column+j] && matrix[row+i][column+j] != matrix[row][column])
                res.push(matrix[row+i][column+j])

        }
    }

    return res
}