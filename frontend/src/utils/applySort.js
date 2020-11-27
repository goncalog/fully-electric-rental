export default function applySort(filteredEVs, sortState) {
    const sortOption = sortState.options.filter((option) => option.checked)[0];

    switch(sortOption.name) {
        case 'Lowest Price':
            filteredEVs.sort((a, b) => a.price_per_day - b.price_per_day);
            break;

        case 'Highest Price':
            filteredEVs.sort((a, b) => b.price_per_day - a.price_per_day);
            break;

        case 'Lowest Mileage':
            filteredEVs.sort((a, b) => a.mileage - b.mileage);
            break;

        case 'Highest Range':
            filteredEVs.sort((a, b) => b.model.charging.range_miles - a.model.charging.range_miles);
            break;

        default:
            break;
    }
    return filteredEVs;
}
