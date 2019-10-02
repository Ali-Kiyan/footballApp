import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper } from '../misc/firebaseLooper';
import { reverseArray } from '../misc/utility';
import  LeagueTable  from './table';

export class Matches extends Component {

    state = {
        isLoading: true,
        Matches: [],
        filterMatches: [],
        playerFilter: 'All',
        resultFilter: 'All'
    }

    componentDidMount(){
        firebaseMatches.once('value').then(snapshot=>{
            const matches = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                matches: reverseArray(matches),
                filterMatches: reverseArray(matches),

            })
        })
    }

    render() {
        console.log(this.state)
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="left">
                    <div className="match_filters">
                        {/* boxes */}
                    </div>
                </div>
                <div className="right">
                     <LeagueTable />
                </div>
                
            </div>
        );
    }
}

export default Matches;
