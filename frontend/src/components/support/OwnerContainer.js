import React from 'react';
import Headline from './Headline';
import CallToActionButton from './CallToActionButton';

export default function OwnerContainer(props) {
    return (
        <div className="owner-container" style={{backgroundImage: `url(${props.backgroundImagePath})` }}>
            <Headline 
                mainHeadline={props.mainHeadline} 
                secondaryHeadline={props.secondaryHeadline} 
            />
            <CallToActionButton 
                callToActionText={props.callToActionText} 
                onButtonClick={props.onButtonClick} 
            />
        </div>
    );
}
