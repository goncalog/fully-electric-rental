import React from 'react';
import HeadlineContainer from '../support/HeadlineContainer';
import BenefitsContainer from '../support/BenefitsContainer';
import SellerContainer from '../support/SellerContainer';
import backgroundHeadlineContainer from '../../media/headline-background.jpg';
import backgroundSellerContainer from '../../media/seller-container-background.jpg';
import '../../css/Home.css';
import { useHistory } from 'react-router-dom';

export default function Home() {
    let history = useHistory();

    function onEvsButtonClick() {
        history.push('/evs');
    }

    function onSellButtonClick() {
        history.push('/seller/signup');
    }
    
    const driverCallToActionText = 'Let\'s DRIVE!';
    const headlineProps = {
        backgroundImagePath: backgroundHeadlineContainer,
        mainHeadline: 'Rent an electric car to drive for Uber, Ola & Bolt', // Electric car and EV have more Google searches than electric vehicle and EVs
        secondaryHeadline: 'We aggregate the best deals from all PCO rental companies',
        callToActionText: driverCallToActionText,
        onButtonClick: onEvsButtonClick,
    }

    const benefitsProps = {
        benefits: [
            { 
                title: 'Best Price',
                text: 'Find the best rental deals available online',
            },
            { 
                title: 'Most Efficient',
                text: 'An electric car will save you thousands in fuel costs!', // Electric car and EV have more Google searches than electric vehicle and EVs
            },
            { 
                title: 'Great Quality',
                text: 'Rent only from the PCO car hire companies with the best ratings',
            },
        ],
        callToActionText: driverCallToActionText,
        onButtonClick: onEvsButtonClick,
    }

    const sellerProps = {
        backgroundImagePath: backgroundSellerContainer,
        mainHeadline: 'Rent more cars, faster',
        secondaryHeadline: 'We help PCO rental companies find the best drivers for their EV fleet', // Electric car and EV have more Google searches than electric vehicle and EVs
        callToActionText: 'Let\'s SELL!',
        onButtonClick: onSellButtonClick,
    }

    return (
        <div className="home">
            <HeadlineContainer {...headlineProps}/>
            <BenefitsContainer {...benefitsProps} />
            <SellerContainer {...sellerProps} />
        </div>
    );
}
