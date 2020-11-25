import React from 'react';
import EVImage from './EVImage';
import EVTitle from './EVTitle';
import EVPrice from './EVPrice';
import EVKeyFeatures from './EVKeyFeatures';

export default function EVIntroCard(props) {
    return (
        <div className="ev-intro-card">
            <EVImage imagePath={props.imagePath} />
            <EVTitle title={props.title} />
            <EVPrice price={props.price} />
            <EVKeyFeatures evFeatures={props.evFeatures} />
        </div>
    );
}
