import React from 'react';
import formatRating from '../../utils/formatRating';

export default function SellerRating(props) {
    return (
        <p className="seller-rating">{formatRating(props.rating)}</p>
    );
}
