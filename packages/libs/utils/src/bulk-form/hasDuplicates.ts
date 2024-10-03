export const hasDuplicates = <T>(array: T[]): boolean => {
    const seen = new Set<string>();

    for (const item of array) {
        const itemString = typeof item === "object" ? JSON.stringify(item) : String(item);

        if (seen.has(itemString)) {
            return true;
        }

        seen.add(itemString);
    }

    return false;
};
