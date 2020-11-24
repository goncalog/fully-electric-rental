import React from 'react';
import EVFeatureName from './EVFeatureName';
import EVFeatureValue from './EVFeatureValue';

export default function EVFeature(props) {
    return (
        <div className='ev-feature'>
            <EVFeatureName name={props.name}/>
            <EVFeatureValue value={props.value}/>
        </div>
    );
}
