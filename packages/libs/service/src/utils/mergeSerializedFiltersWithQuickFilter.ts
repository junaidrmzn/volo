type QuickFilter = { propertyName: string; value: string | number | boolean };

export const mergeSerializedFiltersWithQuickFilter = (
    serializedFilters: string | null | undefined,
    quickFilter: QuickFilter | null | undefined,
    config?: { operator: "EQ" | "LIKE" | "ILIKE" }
) => {
    const filterParts: string[] = [];
    const { operator } = config ?? { operator: "EQ" };

    if (serializedFilters) {
        filterParts.push(serializedFilters);
    }
    if (quickFilter && quickFilter?.propertyName && quickFilter?.value) {
        const quickFilterCondition = `${quickFilter.propertyName} ${operator} "${quickFilter.value}"`;
        filterParts.push(quickFilterCondition);
    }

    return filterParts.join(" AND ");
};
