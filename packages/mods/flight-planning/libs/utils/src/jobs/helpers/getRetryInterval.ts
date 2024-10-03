export const getRetryInterval = (interval?: number | string) => {
    if (!interval) return 1000;
    return Number(interval) * 1000;
};
