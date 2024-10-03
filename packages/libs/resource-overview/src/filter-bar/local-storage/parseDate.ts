export const parseDate = (value?: string) => {
    if (value === undefined || value === "") return undefined;
    return new Date(value);
};
