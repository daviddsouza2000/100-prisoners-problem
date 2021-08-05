import React from 'react';

import './Node.css';

export default function Node({ index, value, cycleNum }) {
    return (
        <div 
            id={`node-${index}-${value}`} 
            className="node">
            {index}:{value}
        </div>
    )
}
