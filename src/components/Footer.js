import React from 'react';
import './css/Footer.css';

const Footer = () => {
    const now = new Date();
    const year = now.getFullYear();

    return (
        <footer className='footer-container'>
            <span className='copyright-symbol'>&#169; {year} BGRemover. All rights reserved</span>
        </footer>
    );
}

export default Footer;