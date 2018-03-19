import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Tile from './components/Tile';
import WinScreen from './components/WinScreen';

const colors = ['#f34235','#9b26af','#feea3a','#8ac249','#6639b6','#2095f2','#fe9700','#009587','#f34235','#9b26af','#feea3a','#8ac249','#6639b6','#2095f2','#fe9700','#009587']
const compareRandom = function () {return Math.random() - 0.5;} 

class App extends Component {
  
    state = {
        rounds: 0,
        activeTiles: [],
        matches: 0,
        readyToOpenNextTile: true,
        tiles: []
    }

    componentWillMount () {
        colors.sort(compareRandom);
        const tiles = colors.map(function(color, index) {return <Tile key={index} color={color}/>;});
        this.setState({ tiles: tiles })
    }

    openTile = event => {
        const targetTile = event.target.closest('.tile__inner')
        if (!targetTile || targetTile.classList.contains('is-open')) return
        if (!targetTile || targetTile.classList.contains('is-find')) return
        targetTile.classList.add('is-open')
        this.setState({ 
            activeTiles: [...this.state.activeTiles, targetTile],
            readyToOpenNextTile: false 
        }) 
    }

    onTransitionEnd = () => {
        this.setState({ readyToOpenNextTile: true })
        if (this.state.activeTiles.length >= 2) {
            if (this.state.activeTiles[0].firstChild.style.backgroundColor === this.state.activeTiles[1].firstChild.style.backgroundColor) {
                this.state.activeTiles[0].classList.add('is-find')
                this.state.activeTiles[1].classList.add('is-find')
                this.setState({ matches: this.state.matches + 1 })
            } 
            this.state.activeTiles[0].classList.remove('is-open')
            this.state.activeTiles[1].classList.remove('is-open')
            this.setState ({ rounds: this.state.rounds + 1, activeTiles: [] }) 
        }
    }

    restart = () => {
        colors.sort(compareRandom);
        const tiles = colors.map(function(color, index) {return <Tile key={index} color={color}/>;});
        this.setState({
            tiles: tiles,
            rounds: 0,
            matches: 0
        })
    }
  
    render() {
        return (
            <div className="App">
                <Header 
                    title="Color Tiles" 
                    roundsTitle="Rounds:"
                    roundsValue={this.state.rounds}
                />
                <Board 
                    onClick={this.openTile} 
                    onTransitionEnd={this.onTransitionEnd} 
                    pointerEvents={this.state.readyToOpenNextTile ? 'auto' : 'none'}
                    content={ this.state.matches === 8 ? <WinScreen winRound={this.state.rounds} onClick={this.restart}/> : this.state.tiles }
                />
            </div>
        );
    }
}

export default App;
