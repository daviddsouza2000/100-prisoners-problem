import React, { useState, useEffect } from 'react';
import Node from './Node/Node';

import './PrisonersProblem.css';

const NUM_NODES = 100;

export default function PrisonersProblem() {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const newGrid = getInitialGrid();
        setGrid(newGrid);
    }, []);

    return (
        <>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {index, value} = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        index={index}
                                        value={value}></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

const getInitialGrid = () => {
    const values = [];
    for (let i = 1; i <= NUM_NODES; i++) {
        values.push(i);
    }
    randomizeArray(values);
    const grid = values.map(
        (value, index) => { 
            return {
                index:index+1, 
                value
            }
        }
    );
    return listToMatrix(grid, Math.sqrt(NUM_NODES));
};

const randomizeArray = (lst) => {
    for (var i = lst.length - 1; i > 0; i--) {
        var i2 = Math.floor(Math.random() * (i + 1));
        var temp = lst[i];
        lst[i] = lst[i2];
        lst[i2] = temp;
    }
}

const listToMatrix = (list, elementsPerSubArray) => {
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