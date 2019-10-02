import React from 'react';
import { Zoom } from 'react-reveal';
import Jersey from '../../../Resources/images/jersey.jpg';
import { blue } from '@material-ui/core/colors';

const PromotionAnimation = () => {
    return (
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div className="">
                        <span>Win a </span>
                        <span>Jersey </span>
                    </div>
                </Zoom>
            </div>
            <div className="right"> 
                <Zoom>
                    <div style={{background: `url(${Jersey}) no-repeat`}}></div>
                </Zoom>
            </div>
        </div>
    );
};

export default PromotionAnimation;