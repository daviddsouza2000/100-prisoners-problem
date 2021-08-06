import React from 'react';

import './Node.css';

export default function Node({ index, value, cycleNum, cycleColor }) {
    const nodeStyle = {
        //outlineColor: "#" + cycleColor,
        backgroundColor: "#" + cycleColor
    }
    return (
        <div 
            id={`node-${index}-${value}`} 
            className="node"
            style={nodeStyle}>
            {/* {index}:{value} */}
            {value}
        </div>
    )
}
