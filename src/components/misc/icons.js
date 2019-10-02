import React from 'react';
import { Link } from 'react-router-dom';
import realmadrid from '../../Resources/images/logos/realmadrid.png';

export const MadridLogo = (props) => {
    const template = <div className="img_cover"
    style={{
        width: props.width,
        height: props.height,
        background: `url(${realmadrid}) no-repeat`
    }}
    ></div>
    if (props.link){
        return (
            <Link to={props.linkTo} className="link_logo">
                {template}
            </Link>
        )
    }else{
        return template
    }
}