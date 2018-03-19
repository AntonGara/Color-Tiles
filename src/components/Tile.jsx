import React from 'react';
import './Tile.css';

function Tile(props) {
    return (
        <div className="tile">
            <div className='tile__inner'>
                <div className="tile__front" style={{backgroundColor: props.color}}></div>
                <div className="tile__back">?</div>
            </div>
        </div>  
    );
}

export default Tile;