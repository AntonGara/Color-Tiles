import React from 'react'
import './Board.css'

function Board (props) {
    return (
        <section className="board"  onTransitionEnd={props.onTransitionEnd} style={{pointerEvents: props.pointerEvents}}>
                {props.content}
        </section>
    )
};

export default Board;