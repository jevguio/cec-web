// src/App.jsx
import React, { useEffect, useState } from 'react';
import ART from '../../imgs/ART.png';
function NavBar() {
    const [scrolling, setScrolling] = useState(false);
    const [navbar, setNavbar] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // You can adjust this value based on when you want the background to change
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const navOnclickHandler = (val) => {
        setNavbar(val);
    }
    return (
        <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <div className='logo'>

                    {<img src={ART} className='img'></img>}
                    <h1>ART</h1>
                </div>
                <ul>
                    <li><a className={navbar == 'Home' ? 'active' : ''} onClick={() => navOnclickHandler('Home')}>Home</a></li>
                    <li><a className={navbar == 'Game' ? 'active' : ''} onClick={() => navOnclickHandler('Game')}> 
                        <div class="dropdown">
                            <button class="dropbtn">Game
                                <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </a></li>
                    <li><a className={navbar == 'Documentation' ? 'active' : ''} onClick={() => navOnclickHandler('Documentation')}>
                        <div class="dropdown">
                            <button class="dropbtn">Documentation
                                <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                        </a></li>
                    <li><a className={navbar == 'Team' ? 'active' : ''} onClick={() => navOnclickHandler('Team')}>
                        <div class="dropdown">
                            <button class="dropbtn">Team
                                <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                        </a></li>
                    <li>
                        <input type="text" placeholder="Search.."></input>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default NavBar;
