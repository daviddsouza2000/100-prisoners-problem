import React, { useState, useEffect } from 'react';
import Node from './Node/Node';

import { getGrid } from '../utils/utils';

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
                                const {index, value, cycleNum, cycleColor} = node;
                                
                                return (
                                    <Node
                                        key={nodeIdx}
                                        index={index}
                                        value={value}
                                        cycleNum={cycleNum}
                                        cycleColor={cycleColor}></Node>
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
    return getGrid(NUM_NODES);
};