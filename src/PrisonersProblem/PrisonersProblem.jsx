import React, { useState, useEffect, useReducer } from 'react';
import Node from './Node/Node';

import { getGrid } from '../utils/utils';

import './PrisonersProblem.css';

const NUM_NODES = 100;
const initialState = { showColors: true };

function reducer(state, action) {
    switch (action.type) {
        case 'on':
            return { showColors: true };
        case 'off':
            return { showColors: false };
        default:
            return { showColors: false };
    }
}

export default function PrisonersProblem() {
    const [grid, setGrid] = useState([]);
    const [cycles, setCycles] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const { grid, cycles } = getInitialGrid();
        setGrid(grid);
        setCycles(cycles);
        console.log(cycles);
    }, []);

    return (
        <> 
            <div>
                {Object.entries(cycles).map(([key, value]) =>
                <div style={{color:"#"+key}}>{key} : {value.length}</div>
                )}
            </div>
            <button onClick={() => dispatch({type: 'off'})}>Off</button>
            <button onClick={() => dispatch({type: 'on'})}>On</button>
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
                                        cycleColor={state.showColors ? cycleColor : 'ffffff'}></Node>
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
    const { grid, cycles } = getGrid(NUM_NODES);
    return { grid, cycles };
};