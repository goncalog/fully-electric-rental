export default function sortString(array, prop) {
    return array.sort((a, b) => {
        return a[prop] < b[prop] ? -1 : 1;
    });
}
