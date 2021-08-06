import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { ArcherContainer, ArcherElement } from 'react-archer';

import { getGrid } from '../utils/utils';

import './PrisonersProblem.css';

const NUM_NODES = 100;

export default function PrisonersProblem() {
    const [grid, setGrid] = useState([]);
    const [cycles, setCycles] = useState([]);

    useEffect(() => {
        const { grid, cycles } = getInitialGrid();
        setGrid(grid);
        setCycles(cycles);
        console.log(cycles);
    }, []);

    return (
        <>
            <div>{cycles.toString()}</div>
            <div className="grid">
                <ArcherContainer>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {index, value, cycleNum, cycleColor} = node;
                                    const relations = [
                                        {
                                            targetId: `archer-${value}`,
                                            targetAnchor: 'middle',
                                            sourceAnchor: 'middle',
                                            style: { strokeColor: 'blue', strokeWidth: 1 },
                                        }
                                    ]
                                    return (
                                        <ArcherElement
                                        key={`archer-${index}`}
                                        id={`archer-${index}`}
                                        relations={relations}>
                                            <Node
                                                key={nodeIdx}
                                                index={index}
                                                value={value}
                                                cycleNum={cycleNum}
                                                cycleColor={cycleColor}></Node>
                                        </ArcherElement>
                                    );
                                })}
                            </div>
                        );
                    })}
                </ArcherContainer>
            </div>
        </>
    )
}

const getInitialGrid = () => {
    const { grid, cycles } = getGrid(NUM_NODES);
    return { grid, cycles };
};