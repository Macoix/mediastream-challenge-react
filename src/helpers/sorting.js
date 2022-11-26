export const sortAsc = (array) => {
    return array.sort((a,b) => a.year - b.year);
};

export const sortDesc = (array) => {
    return array.sort((a,b) => b.year - a.year);
};