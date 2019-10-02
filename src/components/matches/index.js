import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper } from '../misc/firebaseLooper';
import { reverseArray } from '../misc/utility';
import  LeagueTable  from './table';
import MatchesList from './matchesList';

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
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filter">
                        </div>
                        <MatchesList matches={state.filterMatches} />
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>
                </div>    
            </div>
        );
    }
}

export default Matches;
