import React from 'react';
import { Tag } from '../../misc/tag'
import Blocks from './Blocks'

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
               <Tag bck="rgb(189, 189, 186)" 
                size="50px"
                color="#11"
               >
                   Matches
               </Tag> 
               <Blocks />
               <Tag
                    bck="rgb(189, 189, 186)" 
                    size="22px"
                    color="#111"
                    link
                    linkTo="/matches"
               >
                   See more matches
               </Tag>
            </div>
        </div>
    );
};

export default MatchesHome;