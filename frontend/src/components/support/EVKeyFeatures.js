import React from 'react';
import EVFeature from './EVFeature';

export default function EVKeyFeatures(props) {
    return (
        <div className="ev-key-features">
            {props.evFeatures.map((evFeature, index) => {
                return (
                    <EVFeature name={evFeature.name} value={evFeature.value} key={index} />
                );
            })}
        </div>
    );
}
