export const parseNumber = (value?: string) => {
    if (value === undefined) return undefined;
    const parsedValue = Number.parseFloat(value);
    return Number.isNaN(parsedValue) ? undefined : parsedValue;
};
