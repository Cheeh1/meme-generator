import React from 'react'
import Logo from '../assets/Logo.png'

function Header () {
    return (
        <nav className="nav-flex">
            <img src={Logo} alt="logo" />
            <p className="nav-txt">React Course - Project 3</p>
        </nav>
    )
}
export default Header