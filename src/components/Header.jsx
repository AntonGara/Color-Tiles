import React from 'react'
import './Header.css'

function Header (props) {
    return (
        <header className="header">
            <h1 className="header__title">{props.title}</h1>
            <p className="header__rounds">{props.roundsTitle}<span className="header__value">{props.roundsValue}</span></p>
        </header>
    )
};

export default Header;