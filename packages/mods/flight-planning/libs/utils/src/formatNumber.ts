export const formatNumber = (number?: number): number => {
    if (!number) return 0;
    return Number(number.toFixed(2));
};
