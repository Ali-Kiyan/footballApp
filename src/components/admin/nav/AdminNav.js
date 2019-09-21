import React from 'react';
import { Link } from 'react-router-dom'

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
    const renderItems = () => (
        links.map( link => (
            <Link key={link.title} to={link.linkTo}>   </Link>
        ))
    )
    return (
        <div>
            { renderItems() }
        </div>
    );
};

export default AdminNav;