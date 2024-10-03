import { match } from "ts-pattern";
import type { FilterSet } from "@voloiq/filter-panel";
import {
    booleanOperators,
    numberOerators,
    selectMultipleOperators,
    selectOperators,
    textOperators,
} from "./getComparisonOperator";

/**
 * Serializes a filter set into a query language string conforming to the api standards.
 * The returned query language string is NOT URL encoded!
 *
 * @param filterSet The filter set
 *
 * @returns the query language string
 */

const getComparisonOperator = (
    operators: Record<string, string>,
    defaultOperator: string,
    comparisonOperator?: string
) => {
    return comparisonOperator ? operators[comparisonOperator] : defaultOperator;
};

type JoinIndicationType = "AND" | "OR";

type SerializeFiltersConfig = {
    useIlikeOperator: boolean;
    joinCondition?: JoinIndicationType;
};

export const serializeFilters = <DTO>(filterSet: FilterSet<DTO>, config?: SerializeFiltersConfig) => {
    const filterArray: string[] = [];

    for (const filter of filterSet.filters) {
        const { propertyName, propertyNameSerializer, isNull, comparisonOperator } = filter;
        const serializedPropertyName = propertyNameSerializer ? propertyNameSerializer(propertyName) : propertyName;
        if (isNull) {
            const nullOperator = comparisonOperator?.includes("not") ? "IS_NOT NULL" : "IS NULL";
            const nullToken = `${serializedPropertyName} ${nullOperator}`;
            filterArray.push(nullToken);
        }
        const token = match(filter)
            .with({ type: "boolean" }, (filterProps) => {
                const value = String(filterProps.value);
                if (value !== undefined) {
                    const operator = getComparisonOperator(booleanOperators, "EQ", filterProps.comparisonOperator);
                    return `${serializedPropertyName} ${operator} "${value}"`;
                }
                return undefined;
            })
            .with({ type: "select" }, (filterProps) => {
                const { value } = filterProps.value;
                if (value !== undefined) {
                    const operator = getComparisonOperator(selectOperators, "EQ", filterProps.comparisonOperator);
                    return `${serializedPropertyName} ${operator} "${value}"`;
                }
                return undefined;
            })
            .with({ type: "multiSelect" }, (filterProps) => {
                const value = filterProps.values.map((selectOption) => `"${selectOption.value}"`).join(", ");
                if (value !== undefined) {
                    const operator = getComparisonOperator(
                        selectMultipleOperators,
                        "IN",
                        filterProps.comparisonOperator
                    );
                    return `${serializedPropertyName} ${operator} [${value}]`;
                }
                return undefined;
            })
            .with({ type: "range" }, (filterProps) => {
                let rangeString = "";

                if (filterProps.fromDate) {
                    const value = filterProps.fromDate;
                    rangeString += `${serializedPropertyName} GE "${value}"`;
                }
                if (filterProps.fromDate && filterProps.toDate) {
                    rangeString += ` AND `;
                }
                if (filterProps.toDate) {
                    const value = filterProps.toDate;
                    rangeString += `${serializedPropertyName} LE "${value}"`;
                }
                return rangeString;
            })
            .with({ type: "numberRange" }, (filterProps) => {
                let rangeString = "";
                if (filterProps.fromValue) {
                    const value = filterProps.fromValue;
                    rangeString += `${serializedPropertyName} GE "${value}"`;
                }
                if (filterProps.fromValue && filterProps.toValue) {
                    rangeString += ` AND `;
                }
                if (filterProps.toValue) {
                    const value = filterProps.toValue;
                    rangeString += `${serializedPropertyName} LE "${value}"`;
                }
                return rangeString;
            })
            .with({ type: "text" }, (filterProps) => {
                const { value, comparisonOperator } = filterProps;
                if (value !== undefined) {
                    let operator = getComparisonOperator(textOperators, "LIKE", comparisonOperator);
                    operator = config?.useIlikeOperator ? operator?.replace("LIKE", "ILIKE") : operator;
                    const formattedValue =
                        comparisonOperator === "equal" || comparisonOperator === "notEqual"
                            ? `"${value}"`
                            : `"%${value}%"`;

                    return `${serializedPropertyName} ${operator} ${formattedValue}`;
                }
                return undefined;
            })
            .with({ type: "number" }, (filterProps) => {
                const { value, comparisonOperator } = filterProps;
                if (value !== undefined) {
                    const operator = getComparisonOperator(numberOerators, "EQ", comparisonOperator);
                    return `${serializedPropertyName} ${operator} "${value}"`;
                }
                return undefined;
            })
            .exhaustive();

        if (token) {
            filterArray.push(token);
        }
    }

    return filterArray.join(config?.joinCondition ? ` ${config.joinCondition} ` : " AND ");
};
