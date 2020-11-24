import React from 'react';

export default function CheckBox(props) {
    function handleChange(e) {
        props.onChange(e.target.id);
    }

    return (
        <div className="checkbox">
            {props.options.map((item, key) => {
                return (
                    <div key={key}>                            
                        <label for={key}>
                            <input 
                                type="checkbox" 
                                key={key} 
                                id={key} 
                                value={item._id} 
                                checked={item.checked}
                                onChange={handleChange}
                            >
                            </input>
                            {`${item.name ? item.name : item.city}`}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
