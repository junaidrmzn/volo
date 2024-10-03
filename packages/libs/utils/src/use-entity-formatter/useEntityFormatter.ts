const formatWithParentheses = (mainString?: string, subString?: string, defaultValue?: string): string => {
    if (!mainString && !subString) {
        return defaultValue || "N/A";
    }
    if (!subString && !!mainString) {
        return mainString;
    }
    if (!mainString && !!subString) {
        return subString;
    }
    return `${mainString} (${subString})`;
};

export const useEntityFormatter = () => {
    return { formatWithParentheses };
};
