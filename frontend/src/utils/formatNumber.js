export default function formatNumber(number) {
    let array = number.toString().split('');
    if (parseInt(number) >= 1000000) {
        return `${array.splice(0, array.length - 6).join('')},${array.splice(0, array.length - 3).join('')},${array.join('')}`;
    } else if (parseInt(number) >= 1000) {
        return `${array.splice(0, array.length - 3).join('')},${array.join('')}`;
    }
    return `${number}`;
}
