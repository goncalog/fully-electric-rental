import React from 'react';
import MinMax from './MinMax';
import CheckBox from './CheckBox';
import Option from './Option';

export default function DropDown(props) {
    function handleButtonClick() {
        props.onClick(props.property);
    }

    function handleTextChange(type, text) {
        props.onTextChange(props.property, type, text);
    }

    function handleOptionChange(i) {
        props.onOptionChange(props.property, i);
    }

    return (
        <div className={`dropdown ${props.property}`}>
            <button className="dropdown-button" onClick={handleButtonClick}>{`${props.title} ▾`}</button>
            
            <div className={props.visibility ? "dropdown-content show" : "dropdown-content"}>
                {props.type === 'minMax' 
                    ? <MinMax min={props.min} max={props.max} onTextChange={handleTextChange} />
                    : props.type === 'option'
                        ? <Option options={props.options} onChange={handleOptionChange} />
                        : <CheckBox options={props.options} onChange={handleOptionChange} />
                }
            </div>
        </div>
    );
}
