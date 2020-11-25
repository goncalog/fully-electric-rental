import React from 'react';

export default function EVAdditionalFeatures(props) {
    return (
        <div className={`additional-features${props.sectionVisibility ? "" : " hidden"}`}>
            {props.evFeatures.map((evFeature, i) => {
                return (
                    <p className="additional-feature" key={i}>
                        {`- ${evFeature.name}${evFeature.value ? `: ${evFeature.value}`: ""}`}
                    </p>
                );
            })}
        </div>
    );
}
