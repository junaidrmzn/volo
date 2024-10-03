import { formatNumber } from "./formatNumber";

export const add = (a?: number, b?: number): number => {
    if (!a) return 0;
    const result = b ? a + b : a;
    return formatNumber(result);
};
