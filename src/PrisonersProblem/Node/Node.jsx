import React from 'react';

import './Node.css';

export default function Node({ index=0, value=0, cycleNum, cycleColor="ffffff" }) {
    const nodeStyle = {
        outlineColor: "#" + cycleColor,
        backgroundColor: "#" + cycleColor
    }
    return (
        <div 
            id={`node-${index}-${value}`} 
            className="node"
            style={nodeStyle}>
            {index + "\n" + value}
        </div>
    )
}
