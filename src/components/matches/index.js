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

    showPlayed = (played) => {
        const list = this.state.matches.filter((match) => {
            return match.final === played
        } )
        this.setState({
            filterMatches: list
        })
    }

    render() {
        const state = this.state;
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">Show Match</div>
                                <div className="cont">
                                    <div className={`option`} 
                                    onClick={()=>this.showPlayed('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option`}
                                    onClick={()=>this.showPlayed('Yes')}
                                    >
                                        Played
                                    </div>
                                    <div className={`option`}
                                    onClick={()=>this.showPlayed('No')}
                                    >
                                        Not Played
                                    </div>
                                </div>


                            </div>
                            <div className=""></div>
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
