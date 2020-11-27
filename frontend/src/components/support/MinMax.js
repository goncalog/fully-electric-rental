import React from 'react';
import Input from './Input';

export default function MinMax(props) {
    function handleTextChange(type, text) {
        props.onTextChange(type, text);
    }

    return (
        <div className="min-max">
            <Input 
                className="min"
                property="min"
                placeholder="Min" 
                text={props.min}
                onTextChange={handleTextChange}
            />
            <Input 
                className="max"
                property="max"
                placeholder="Max" 
                text={props.max}
                onTextChange={handleTextChange}
            />
        </div>
    );
}
