import React, { useState, useEffect, useReducer, useRef } from 'react';
import Node from './Node/Node';

import { getGrid } from '../utils/utils';

import './PrisonersProblem.css';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const NUM_NODES = 100;
const initialState = { showColors: true };

const ret = [];
for(var i = 1; i<=100;i++) ret.push({length: i, frequency: 0})

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

    // const [data, setData] = useState(() => {
    //     const ret = [];
    //     for(var i = 1; i<=100;i++) ret.push({length: i, frequency: 0})
    //     // return [
    //     //     { year: '1950', population: 2.525 },
    //     //     { year: '1960', population: 3.018 },
    //     //     { year: '1970', population: 3.682 },
    //     //     { year: '1980', population: 4.440 },
    //     //     { year: '1990', population: 5.310 },
    //     //     { year: '2000', population: 6.127 },
    //     //     { year: '2010', population: 6.930 },
    //     // ]
    //     return ret;
    // });

    const data = useRef(ret);

    useEffect(() => {
        const { grid, cycles, maxLength } = getInitialGrid();
        setGrid(grid);
        setCycles(cycles);
        // console.log(cycles);
        // console.log(maxLength);
        data.current[maxLength-1].frequency+=1;
        console.log(data);
    }, []);

    const toggleOpacity = (cycle, dim) => {
        if(dim){
            for(let index of cycle ) document.getElementById(`node-${index}`).style.opacity = 0.3;
        }
        else {
            for(let index of cycle ) document.getElementById(`node-${index}`).style.opacity = 1;
        }
    }

    return (
        <> 
            <div>
                {Object.entries(cycles).map(([key, value]) =>
                <div style={{color:"#"+key}}>
                    <div style={{width: "10px", height: "10px",outline: "1px solid black", backgroundColor: "#"+key, display: "inline-block"}}></div>
                    {key} : {value.length}
                    <button onClick={() => toggleOpacity(value, true)}>Off</button>
                    <button onClick={() => toggleOpacity(value, false)}>On</button>
                </div>
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

            <Paper>
                <Chart
                    data={data.current}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        valueField="frequency"
                        argumentField="length"
                    />
                    <Title text="Frequency of longest cycle length" />
                    <Animation />
                </Chart>
            </Paper>
        </>
    )
}

const getInitialGrid = () => {
    const { grid, cycles, maxLength } = getGrid(NUM_NODES);
    return { grid, cycles, maxLength };
};