import React from 'react';
import Benefit from './Benefit';
import CallToActionButton from './CallToActionButton';

export default function BenefitsContainer(props) {
    return (
        <div className="benefits-container">
            <div className="benefits">
                {props.benefits.map((benefit, index) => {
                    return (
                        <Benefit benefitTitle={benefit.title} benefitText={benefit.text} key={index} />
                    );
                })}
            </div>
            
            <div className="callToActionButton-container">
                <CallToActionButton 
                    callToActionText={props.callToActionText} 
                    onButtonClick={props.onButtonClick}     
                /> 
            </div>        
        </div>
    );
}
