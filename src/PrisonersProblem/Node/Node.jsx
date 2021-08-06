import React from 'react';

import './Node.css';

export default function Node({ index, value, cycleNum, cycleColor }) {
    const nodeStyle = {
        backgroundColor: "#" + cycleColor,
        // opacity: 0.3
    }
    return (
        <div 
            id={`node-${index}`} 
            className="node"
            style={nodeStyle}>
            {/* {index}:{value} */}
            {value}
        </div>
    )
}
