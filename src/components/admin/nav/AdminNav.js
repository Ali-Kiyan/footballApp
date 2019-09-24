import React from 'react';
import { Link } from 'react-router-dom'
import { ListItem } from '@material-ui/core';

const AdminNav = () => {
    const links = [
        { 
            "title": "Matches",
            "linkTo": "/admin_matches"
        },
        { 
            "title": "Add Match",
            "linkTo": "/admin_matches/edit_match"
        },
        { 
            "title": "Players",
            "linkTo": "/admin_players"
        },
        { 
            "title": "Players",
            "linkTo": "/admin_players/add_player"
        }
    ]
    const style = {
        color: '#fff',
        fontWeight: "300",
        borderBottom: '1px solide #353535'
    }
    const renderItems = () => (
        links.map( link => (
            <Link key={link.title} to={link.linkTo}> 
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )
    return (
        <div>
            { renderItems() }
        </div>
    );
};

export default AdminNav;