import React from 'react';
import './WinScreen.css';

function WinScreen(props) {
    return (
        <div className="winScreen">
            <h2 className="winScreen__title">You win!</h2>
            <span className="winScreen__description">You've finished the game in {props.winRound} rounds!</span>
            <div className="winScreen__restartBtn" onClick={props.onClick}>Play again!</div>
        </div>  
    );
}

export default WinScreen;