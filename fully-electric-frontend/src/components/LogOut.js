import React from 'react';

export default function LogOut(props) {
    let url = (process.env.NODE_ENV === 'production') 
            ? '/content/seller/logout' 
            : `${process.env.REACT_APP_SERVER_URL}/content/seller/logout`;

    fetch(url, {
        method: 'POST',
        credentials: 'include',
    })
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            console.log('Success:', data);
            // Inform AppRouter that login status changed
            props.onAuth(undefined);
            // Go to Home Page
            props.history.push('/');
        })            
        .catch((error) => {
            console.error('Error:', error);
            alert(`Error: ${error}`);
        });

    return (
        <div>Logging Out...</div>
    );
}
