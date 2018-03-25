import React, { Component } from 'react';
import './Tile.css';


class Tile extends Component {
    
    state = { isOpen: false }
    
    clickTile = () => {
        if (this.state.isOpen === true) {
            return
        } else {
            let curTile = this
            this.props.clickTile(curTile);
            this.setState({ isOpen: true })
        }   
    }

    render () {
        const tileName = this.state.isOpen ? 'is-open' : ''
        return (
            <div className={'tile ' + tileName} onClick={this.clickTile}>
                <div className='tile__inner'>
                    <div className="tile__front" style={{backgroundColor: this.props.color}}></div>
                    <div className="tile__back">?</div>
                </div>
            </div> 
        )
        
    }
}

export default Tile;