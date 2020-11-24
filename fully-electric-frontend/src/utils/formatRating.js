export default function formatRating(rating) {
    const star = '\u2605';
    return `${(Math.round(rating * 10) / 10).toFixed(1)}${star}`;
}
