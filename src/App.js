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
        this.start()
    }
    
    start = () => {
        colors.sort(compareRandom);
        const tiles = colors.map(function(color, index) {return <Tile key={index} color={color}/>;});
        this.setState({ 
            rounds: 0,
            matches: 0,
            tiles: tiles })
    }

    openTile = (e) => {
        const targetTile = e.target.closest('.tile__inner')
        if (!targetTile || (targetTile.classList.contains('is-open')) || targetTile.classList.contains('is-find')) return
        targetTile.classList.add('is-open')
        this.setState({ 
            activeTiles: [...this.state.activeTiles, targetTile],
            readyToOpenNextTile: false 
        }) 
    }

    onTransitionEnd = () => {
        this.setState({ readyToOpenNextTile: true })
        if (this.state.activeTiles.length === 2) {
            const firstTile = this.state.activeTiles[0]
            const secondTile = this.state.activeTiles[1]
            const firstTileColor = this.state.activeTiles[0].firstChild.style.backgroundColor
            const secondTileColor = this.state.activeTiles[1].firstChild.style.backgroundColor
            if (firstTileColor === secondTileColor) {
                firstTile.classList.add('is-find')
                secondTile.classList.add('is-find')
                this.setState({ matches: this.state.matches + 1 })
            } else {
                firstTile.classList.remove('is-open')
                secondTile.classList.remove('is-open')
                this.setState ({ 
                    rounds: this.state.rounds + 1, 
                    activeTiles: [] 
                }) 
            }
        }
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
                    content={ this.state.matches === 8 ? <WinScreen winRound={this.state.rounds} onClick={this.start}/> : this.state.tiles }
                />
            </div>
        );
    }
}

export default App;
