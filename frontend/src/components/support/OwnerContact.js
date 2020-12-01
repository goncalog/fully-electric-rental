import React from 'react';
import OwnerName from './OwnerName';
import OwnerRating from './OwnerRating';
import CallToActionButton from './CallToActionButton';
import { useHistory } from 'react-router-dom';

export default function OwnerContact(props) {
    let history = useHistory();

    function onContactOwnerClick() {
        history.push({
            pathname: `/owner/${props.id}/contact`,
            state: { contact: props.contact }, 
        });
    }

    return (
        <div className="owner-contact">
            <OwnerName name={props.name} />
            <OwnerRating rating={props.rating} />
            <CallToActionButton 
                callToActionText={props.callToActionText}
                onButtonClick={onContactOwnerClick} 
            />
        </div>
    );
}
