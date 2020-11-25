import React from 'react';
import formatPrice from '../../utils/formatPrice';

export default function EVPrice(props) {
    return (
        <p className="price">{formatPrice('uk', props.price)}</p>
    );
}
