import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png'
import {Tag} from '../../misc/tag';

export class MeetPlayers extends Component {

    state = {

    }

    render() {
        return (
            <div className="home_meetplayers" style={{
                background: `#fff url(${Stripes})`
            }}>
                <div className="container">
                    <div className="home_meetplayers_wrapper">  
                        <div className="home_card_wrapper">
                            card
                        </div>
                        <div className="home_text_wrapper">
                            <div>
                                <Tag bck="#0e1731" size="100px" color="#fff"
                                add={{
                                    display: 'inline-block',
                                    marginBottom: '20px'
                                }}
                                >
                                    Meet
                                </Tag>
                            </div>
                            <div>
                                <Tag bck="#0e1731" size="100px" color="#fff"
                                add={{
                                    display: 'inline-block',
                                    marginBottom: '30px'
                                }}
                                >
                                    The
                                </Tag>
                            </div>
                            <div>
                                <Tag bck="#0e1731" size="100px" color="#fff"
                                add={{
                                    display: 'inline-block',
                                    marginBottom: '20px'
                                }}
                                >
                                    Players
                                </Tag>
                            </div>
                            <div>
                                <Tag bck="#fff" size="27px" color="#0e1731" link linkTo="the_team"
                                 add={{
                                    display: 'inline-block',
                                    marginBottom: '27px',
                                    border: '1px solid #0e1731'
                                }}>
                                    Meet them here
                                </Tag>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetPlayers;
