import React, { Component } from 'react';
import PlayerCard from '../misc/playerCard';
import { Fade } from 'react-reveal';
import Stripes from '../../Resources/images/stripes.png';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../misc/firebaseLooper';
import { Promise } from 'core-js';
 
export class Team extends Component {

    state = {
        isLoading: true,
        players: []
    }

    componentDidMount(){
        firebasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot);
            let promises = [];
            for ( key in players){
                promises.push(
                    new Promise((resolve, reject)=>{
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                        .then(url=>{
                            players[key].url = url;
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises).then(()=>{
                this.setState({
                    loading: false,
                    players
                })
            })
        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Team;
