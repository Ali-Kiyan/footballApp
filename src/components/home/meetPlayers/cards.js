import React, { Component } from 'react';
import { easePolyOut }from 'd3-ease';
import { Animate } from 'react-move';
import MODRIC from '../../../Resources/images/players/MODRIC.jpg';
import BALE from '../../../Resources/images/players/BALE.jpg';
import PlayerCard from '../../misc/playerCard';

export class HomeCards extends Component {

    state = {
        cards: [
            {
                bottom: 90,
                left: 300,
            },
            {
                bottom: 60,
                left: 200
            },
            {
                bottom: 30,
                left: 100
            },
            {
                bottom: 0,
                left: 0
            }
        ]
    }
    showAnimateCards = () => (
        this.state.cards.map( (card, i) =>(
            <Animate
                key={i}
                show={this.props.show}
                start={{
                    left: 0,
                    bottom: 0
                }}
                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: { duration: 500, ease: easePolyOut }
                }}
            >
                {({ left, bottom }) => {
                    return (
                        <div style={{
                            position: 'absolute',
                            left,
                            bottom
                        }}> { i === 3 || i === 1  ? 
                            <PlayerCard 
                                number="10"
                                name="Luka"
                                lastname="Modrić"
                                bck={MODRIC}
                            /> :
                              <PlayerCard 
                                number="11"
                                name="Gareth"
                                lastname="Bale"
                                bck={BALE}
                            /> 
                        }
                        </div>
                    )
                }}
            </Animate>
        ))
    )
    render() {
        return (
            <div>
                {this.showAnimateCards()}
            </div>
        );
    }
}

export default HomeCards;
