import React, { useEffect } from 'react';
import CallToActionButton from '../support/CallToActionButton';
import EV from './EV';
import '../../css/OwnerEV.css';

export default function OwnerEV(props) {
    const handleUpdateButtonClick = () => {
        props.history.push(`${props.match.url}/update`);
    } 

    const handleDeleteButtonClick = () => {
        let url = (process.env.NODE_ENV === 'production') 
            ? `/content${props.match.url}/delete`
            : `${process.env.REACT_APP_SERVER_URL}/content${props.match.url}/delete`;
        
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                console.log('Success:', data);
                // Go to Owner Page
                props.history.push(`/owner/${data.userId}/evs`);
            })            
            .catch((error) => {
                console.error('Error:', error);
                alert(`Error: ${error}`);
            });
    } 

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="owner-ev">
            <div className="callToActionButton-container">
                <CallToActionButton 
                    callToActionText="Update" 
                    onButtonClick={handleUpdateButtonClick} 
                />
                <CallToActionButton
                    callToActionText="Delete" 
                    onButtonClick={handleDeleteButtonClick} 
                />
            </div>
            <EV {...props} />         
        </div>
    );
}
