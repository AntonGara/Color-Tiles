import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import Tile from './components/Tile';
import WinScreen from './components/WinScreen';

const colors = ['#f34235','#9b26af','#feea3a','#8ac249','#6639b6','#2095f2','#fe9700','#009587','#f34235','#9b26af','#feea3a','#8ac249','#6639b6','#2095f2','#fe9700','#009587']
const compareRandom = function () {return Math.random() - 0.5;} 
const initialState = {
    rounds: 0,
    tiles: [],
    activeTiles: [],
    readyToOpenNextTile: true,
    matches: 0
};

class App extends Component {
   
    componentWillMount () {
        this.start()
    }

    start = () => {
        colors.sort(compareRandom)
        this.setState(initialState);
    }

    clickTile = (curTile) => {
        this.setState({
            counter: this.state.counter + 1,
            activeTiles: [...this.state.activeTiles, curTile],
            readyToOpenNextTile: false
        })
    }

    openTile = () => {
        this.setState({ readyToOpenNextTile: true })
        if (this.state.activeTiles.length === 2) {
            const firstTile = this.state.activeTiles[0]
            const secondTile = this.state.activeTiles[1]
            if (firstTile.props.id === secondTile.props.id) {
                this.setState({ matches: this.state.matches + 1})   
            } else {
                firstTile.state.isOpen = this.setState({ isOpen: false})
                secondTile.state.isOpen = this.setState({ isOpen: false})
            }
            this.setState({
                rounds: this.state.rounds + 1,
                activeTiles: []
            })
        }
    }

    render() {
        let tiles = colors.map((color, index) => {
            return (
                <Tile key={index} color={color} id={color} clickTile={this.clickTile} />
            )
          });
        
        return (
            <div className="App">
                <Header 
                    title="Color Tiles" 
                    roundsTitle="Rounds:"
                    roundsValue={this.state.rounds}
                />
                <Board 
                    onTransitionEnd={this.openTile} 
                    pointerEvents={this.state.readyToOpenNextTile ? 'auto' : 'none'}
                    content={ this.state.matches === 8 ? <WinScreen winRound={this.state.rounds} onClick={this.start}/> : tiles }
                />
            </div>
        );
    }
}

export default App;

