import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MadridLogo } from '../misc/icons'

class Header extends Component {
    render() {
        return (
           <AppBar position="fixed"
           style={{
               backgroundColor: "rgb(66, 65, 65)", 
               boxShadow: 'none',
               padding: '10px 0',
               borderBottom: '2px solid #00285e'
           }}
           >
               <Toolbar style={{display: "flex"}}>
                   <div style={{
                       flexGrow: 1
                   }}> 
                        <div className="header-logo">
                            <MadridLogo link={true} linkTo="/" width="3.1rem" height="70px"/>
                        </div>
                   </div>
                   <Link to="/team">
                        <Button color="inherit">The Team</Button>
                   </Link>
                   <Link to="/matches">
                        <Button color="inherit">Matches</Button>
                   </Link>
               </Toolbar>
           </AppBar>
        );
    }
}

export default Header;