import React from 'react';
import DropDown from '../support_components/DropDown';

export default function Filters(props) {
    function handleClick(property) {
        props.onClick(property);
    }

    function handleTextChange(property, type, text) {
        props.onTextChange(property, type, text);
    }

    function handleOptionChange(property, i) {
        props.onOptionChange(property, i);
    }

    return (
        <div className="filters">
            <DropDown 
                property={props.make.property}
                title={props.make.title}
                onClick={handleClick}
                options={props.make.options}
                visibility={props.visibility.make}
                onOptionChange={handleOptionChange}
            />
            <DropDown
                type="minMax" 
                property={props.price.property}
                title={props.price.title}
                onClick={handleClick}
                visibility={props.visibility.price}
                min={props.price.min}
                max={props.price.max}
                onTextChange={handleTextChange}
            />
            <DropDown
                type="minMax" 
                property={props.mileage.property}
                title={props.mileage.title}
                onClick={handleClick}
                visibility={props.visibility.mileage}
                min={props.mileage.min}
                max={props.mileage.max}
                onTextChange={handleTextChange}
            />
            <DropDown
                type="minMax" 
                property={props.range.property}
                title={props.range.title}
                onClick={handleClick}
                visibility={props.visibility.range}
                min={props.range.min}
                max={props.range.max}
                onTextChange={handleTextChange}
            />
            <DropDown 
                property={props.extras.property}
                title={props.extras.title}
                onClick={handleClick}
                options={props.extras.options}
                visibility={props.visibility.extras}
                onOptionChange={handleOptionChange}
            />
            <DropDown
                type="option"
                property={props.sort.property}
                title={props.sort.title}
                onClick={handleClick} 
                options={props.sort.options}
                visibility={props.visibility.sort}
                onOptionChange={handleOptionChange}
            />
        </div>
    );
}
