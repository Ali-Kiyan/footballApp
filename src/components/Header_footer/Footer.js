
import React from 'react';
import { MadridLogo } from '../misc/icons'

const Footer = () => {
    return (
        <footer className="bck_dark_gold">
            <div className="footer_logo">
                <MadridLogo 
                    width="3.1rem"
                    height="70px"
                    link
                    linkTo="/"
                /> 
            </div>
            <div className="footer_discl"> Real Madrid 2019. All rights reserved </div>
        </footer>
    );
};

export default Footer;