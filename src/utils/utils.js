function randomizeArray(lst) {
    for (var i = lst.length - 1; i > 0; i--) {
        var i2 = Math.floor(Math.random() * (i + 1));
        var temp = lst[i];
        lst[i] = lst[i2];
        lst[i2] = temp;
    }
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

function putCycles(grid, NUM_NODES){
    const cycles = {};
    var count = 1;
    for(let i = 0;i < NUM_NODES;i++){
        const {index, visited } = grid[i]
        if(!visited){
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const first = index;
            var currIndex = index;
            const cycle = [];
            cycle.push(currIndex);
            grid[currIndex-1].cycleNum = count;
            grid[currIndex-1].cycleColor = randomColor;
            do {
                grid[currIndex-1].visited = true;
                currIndex = grid[currIndex-1].value;
                cycle.push(currIndex);
                grid[currIndex-1].cycleNum = count;
                grid[currIndex-1].cycleColor = randomColor;
            } while(first !== currIndex);
            cycles[randomColor] = cycle;
            count++;
        }
    }
    return cycles;
}

export function getGrid(NUM_NODES){
    const values = [];
    for (let i = 1; i <= NUM_NODES; i++) {
        values.push(i);
    }
    randomizeArray(values);
    const lst = values.map(
        (value, index) => { 
            return {
                index:index+1, 
                value,
                visited: false,
                cycleNum: 0,
                cycleColor: ""
            }
        }
    );
    
    const cycles = putCycles(lst, NUM_NODES);
    const grid = listToMatrix(lst, Math.sqrt(NUM_NODES));

    return { grid, cycles }
}