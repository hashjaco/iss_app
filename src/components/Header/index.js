import React from 'react'
import iss from '../../assets/iss1.png'
import './index.css'

const Header = props => {
    return (
        <div className="wrapper">
            <img src={iss} alt="iss"/>
        </div>
    )
}

export default Header;