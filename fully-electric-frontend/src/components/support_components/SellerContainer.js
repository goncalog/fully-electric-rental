import React from 'react';
import Headline from './Headline';
import CallToActionButton from './CallToActionButton';

export default function SellerContainer(props) {
    return (
        <div className="seller-container" style={{backgroundImage: `url(${props.backgroundImagePath})` }}>
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
