import React from 'react';
import SellerName from './SellerName';
import SellerRating from './SellerRating';
import CallToActionButton from './CallToActionButton';
import { useHistory } from 'react-router-dom';

export default function SellerContact(props) {
    let history = useHistory();

    function onContactSellerClick() {
        history.push({
            pathname: `/seller/${props.id}/contact`,
            state: { contact: props.contact }, 
        });
    }

    return (
        <div className="seller-contact">
            <SellerName name={props.name} />
            <SellerRating rating={props.rating} />
            <CallToActionButton 
                callToActionText={props.callToActionText}
                onButtonClick={onContactSellerClick} 
            />
        </div>
    );
}
