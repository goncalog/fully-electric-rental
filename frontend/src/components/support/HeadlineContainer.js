import React from 'react';
import Headline from './Headline';
import CallToActionButton from './CallToActionButton';

export default function HeadlineContainer(props) {
    const backgroundImagePath = props.backgroundImagePath;
    const mainHeadlineText = props.mainHeadline;
    const secondaryHeadlineText = props.secondaryHeadline;
    const callToActionText = props.callToActionText;     

    return (
        <div className="headline-container" style={{backgroundImage: `url(${backgroundImagePath})`}}>
            <Headline mainHeadline={mainHeadlineText} secondaryHeadline={secondaryHeadlineText} />
            <CallToActionButton 
                callToActionText={callToActionText} 
                onButtonClick={props.onButtonClick}
            />
        </div>
    );
}
