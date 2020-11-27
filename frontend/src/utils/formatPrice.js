import formatNumber from './formatNumber';

export default function formatPrice(country, price) {
    switch(country.toLowerCase()) {
        case 'uk':
            return `£${formatNumber(price)}/day`;
        default:
            return price;
    }
}
