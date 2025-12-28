import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <>
            <header className="header">
                <h1 className="title">AQ WEB</h1>
                
                <nav className="Links">
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#education">Education</a></li>
                    <li><a href="#certificates">Certificates</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contactus">Contact Us</a></li>
                </nav>

                <div className="loginbtn">
                    <Link to="/login" className="btn" style={{ textDecoration: "none" }}>Admin Login</Link>
                </div>
                <div className="burger-menu" onClick={openMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </header>
            <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                <div className="close-menu" onClick={closeMenu}>
                    <i className="fas fa-times"></i>
                </div>

                <li><a href="#about" onClick={closeMenu}>About Me</a></li>
                <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
                <li><a href="#education" onClick={closeMenu}>Education</a></li>
                <li><a href="#certificates" onClick={closeMenu}>Certificates</a></li>
                <li><a href="#services" onClick={closeMenu}>Services</a></li>
                <li><a href="#contactus" onClick={closeMenu}>Contact Us</a></li>
                
                <li style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', width: '80%', margin: '1rem 0' }}></li>

                <li>
                    <Link to="/login" className="btn mobile-login-btn" onClick={closeMenu}>Admin Login</Link>
                </li>
            </nav>
        </>
    )
}

export default Header;