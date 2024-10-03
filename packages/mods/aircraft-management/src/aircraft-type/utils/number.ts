export const isNumber = (value: string | number) =>
    value != null && value !== "" && !Number.isNaN(Number(value.toString()));
