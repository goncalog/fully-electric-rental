import React from 'react';
import formatRating from '../../utils/formatRating';

export default function OwnerRating(props) {
    return (
        <p className="owner-rating">{formatRating(props.rating)}</p>
    );
}
