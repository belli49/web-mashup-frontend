import React from "react";
import './NavBar.css';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor() {
        super();

        this.state = {

        }
    }
    
    render () {
        return (
            <div className="NavBar">
                <nav className="NavWrapper">
                    <div className='Icon'>
                        <Link to='/'>
                          <img height={"50px"} src={require('./../logo.png')} />
                        </Link>
                    </div>
                    <div className='Navigation'>
                        <ul className="NavLinks">
                            <li>
                                <Link to='/' className="blink">
                                    <div className="NavButton">
                                        <a className="blink">Home</a>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className="blink">
                                    <div className="NavButton">
                                        <a className="blink">About Us</a>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className="blink">
                                    <div className="NavButton">
                                        <a className="blink">Contact Us</a>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
