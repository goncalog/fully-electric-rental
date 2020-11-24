import React from 'react';

export default function EVImage(props) {
    return (
        <div className="ev-image-container">
            <img className="ev-image" src={props.imagePath} alt="Electric Vehicle"></img>
        </div>
    );
}
