import { match } from "ts-pattern";
import type { FilterSet } from "@voloiq/filter-panel";

/**
 * @deprecated use the serializeFilters util from the @voloiq/service library. It is largely a copy and paste with some minor adaptations
 */
export const createApiFilterString = <GetDTO>(filterSet?: FilterSet<GetDTO>): string => {
    const filterArray: string[] = [];
    if (!filterSet || !filterSet.filters) {
        return filterArray.join(" AND ");
    }

    for (const filter of filterSet.filters) {
        const { propertyName } = filter;
        // @ts-ignore
        const filterString = match(filter)
            .with({ type: "boolean" }, (filterProps) => {
                const value = String(filterProps.value);
                return `(${propertyName} EQ '${value}')`;
            })
            .with({ type: "select" }, (filterProps) => {
                const { value } = filterProps.value;
                return `(${propertyName} EQ '${value}')`;
            })
            .with({ type: "multiSelect" }, (filterProps) => {
                const value = filterProps.values.map((selectOption) => `${selectOption.value}`).join(",");
                return `${propertyName} IN ['${value}']`;
            })
            .with({ type: "range" }, (filterProps) => {
                let rangeString = "";
                if (filterProps.fromDate) {
                    const value = filterProps.fromDate;
                    rangeString += ` ${propertyName} GE '${value}' `;
                }
                if (filterProps.fromDate && filterProps.toDate) {
                    rangeString += ` AND `;
                }
                if (filterProps.toDate) {
                    const value = filterProps.toDate;
                    rangeString += ` ${propertyName} LE '${value}' `;
                }
                return rangeString;
            })
            .with({ type: "numberRange" }, (filterProps) => {
                let rangeString = "";
                if (filterProps.fromValue) {
                    const value = filterProps.fromValue;
                    rangeString += ` ${propertyName} GE '${value}' `;
                }
                if (filterProps.fromValue && filterProps.toValue) {
                    rangeString += ` AND `;
                }
                if (filterProps.toValue) {
                    const value = filterProps.toValue;
                    rangeString += ` ${propertyName} LE '${value}' `;
                }
                return rangeString;
            })
            .with({ type: "text" }, (filterProps) => {
                const { value } = filterProps;
                return `(${propertyName} EQ '${value}')`;
            })
            .with({ type: "number" }, (filterProps) => {
                const { value } = filterProps;
                return `(${propertyName} EQ '${value}')`;
            })
            .exhaustive();
        filterArray.push(filterString);
    }
    return filterArray.join(" AND ");
};

// ToDo this function has to do the same job as the backend
// https://jira.volocopter.org/browse/VT-554
export const extractFilterValues = (filter?: string) => {
    if (!filter) {
        return [];
    }
    if (filter.indexOf("EQ") > 0) {
        const filterArray = filter.replace("(", "").replace(")", "").split("EQ");
        return filterArray[1]?.replace("'", "").replace("'", "").split(",");
    }
    const filterArray = filter.replace("(", "").replace(")", "").split("IN");
    return filterArray[1]?.replace("[", "").replace("]", "").split(",");
};
