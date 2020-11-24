import React from 'react';

export default function CallToActionButton(props) {
    const callToActionText = props.callToActionText;

    return (
        <button className='callToActionButton' onClick={props.onButtonClick}>{callToActionText}</button>
    );
}
