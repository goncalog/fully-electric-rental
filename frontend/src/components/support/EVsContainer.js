import React from 'react';
import EVIntroCard from './EVIntroCard';
import { Link } from 'react-router-dom';

export default function EVsContainer(props) {
    return (
        <div className="evs-container">
            {props.evs.map((ev, index) => {
                const evFeatures = ev.evFeatures.map((item) => {
                    const feature = { name: item.name, value: item.value.toString() };
                    return feature;
                });
                
                return (
                    <Link 
                        className="ev-link" 
                        to={(props.match.params.id)
                                ? `/owner/${props.match.params.id}/ev/${ev.id}` 
                                : `/ev/${ev.id}`} 
                        key={index}
                    >
                        <EVIntroCard 
                            imagePath={ev.imageUrls[0]} 
                            title={ev.title} 
                            price={ev.price.toString()} 
                            evFeatures={evFeatures}
                            key={index} 
                        />
                    </Link> 
                );
            })}
        </div>
    );
}
