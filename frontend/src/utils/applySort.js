export default function applySort(filteredEVs, sortState) {
    const sortOption = sortState.options.filter((option) => option.checked)[0];

    switch(sortOption.name) {
        case 'Lowest Price':
            filteredEVs.sort((a, b) => a.price - b.price);
            break;

        case 'Highest Price':
            filteredEVs.sort((a, b) => b.price - a.price);
            break;

        case 'Lowest Mileage':
            filteredEVs.sort((a, b) => a.mileage - b.mileage);
            break;

        case 'Highest Range':
            filteredEVs.sort((a, b) => b.model.charging.range_miles - a.model.charging.range_miles);
            break;
    }
    return filteredEVs;
}
