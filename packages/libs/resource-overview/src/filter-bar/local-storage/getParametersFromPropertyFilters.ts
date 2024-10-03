import type { PropertyFilter } from "@volocopter/filter-react";
import { P, match } from "ts-pattern";
import type { LocalStorageParameters, ParameterValue } from "./LocalStorageParameters";
import { getParameterIdentifier } from "./getParameterIdentifier";

const notNull = P.not(P.nullish);
const isNull = P.nullish;
const isTrue = P.when((value) => value === true);

const valueToString = (value?: number | Date | string) => {
    if (value === undefined) return value;
    if (typeof value === "number" || typeof value === "string") {
        return value.toString();
    }
    return value.toISOString();
};

const getParametersFromPropertyFilter = (property: PropertyFilter): LocalStorageParameters => {
    const { type, propertyName } = property;
    const identifier = getParameterIdentifier(type, propertyName);
    const parameters: LocalStorageParameters = {};

    return match(property)
        .with({ type: P.union("number", "text", "date"), value: P.select(notNull) }, (value, filter) => {
            const parameterValue: ParameterValue = {
                value: valueToString(value),
                comparisonOperator: filter.comparisonOperator,
                ...(filter.isNull === true && { isNull: filter.isNull }),
            };
            parameters[identifier] = JSON.stringify(parameterValue);
            return parameters;
        })
        .with({ type: P.union("date-range", "number-range"), value: P.select(notNull) }, (value, filter) => {
            const { minValue, maxValue } = value;
            if (minValue !== undefined) {
                const parameterValue: ParameterValue = {
                    value: valueToString(minValue),
                    comparisonOperator: filter.comparisonOperator,
                    ...(filter.isNull === true && { isNull: filter.isNull }),
                };
                parameters[getParameterIdentifier(type, propertyName, "min")] = JSON.stringify(parameterValue);
            }
            if (maxValue !== undefined) {
                const parameterValue: ParameterValue = {
                    value: valueToString(maxValue),
                    comparisonOperator: filter.comparisonOperator,
                    ...(filter.isNull === true && { isNull: filter.isNull }),
                };
                parameters[getParameterIdentifier(type, propertyName, "max")] = JSON.stringify(parameterValue);
            }
            return parameters;
        })
        .with({ type: P.union("boolean", "select"), value: P.select(notNull) }, (selectedOption, filter) => {
            const parameterValue: ParameterValue = {
                value: selectedOption.value.toString(),
                comparisonOperator: filter.comparisonOperator,
                ...(filter.isNull === true && { isNull: filter.isNull }),
            };
            parameters[identifier] = JSON.stringify(parameterValue);
            return parameters;
        })
        .with({ type: "select-multiple", value: P.select(notNull) }, (selectedOptions, filter) => {
            const parameterValue: ParameterValue = {
                value: selectedOptions.map((option) => option.value).join("|"),
                comparisonOperator: filter.comparisonOperator,
                ...(filter.isNull === true && { isNull: filter.isNull }),
            };
            parameters[identifier] = JSON.stringify(parameterValue);
            return parameters;
        })
        .with(
            {
                type: P.union(
                    "number",
                    "text",
                    "date",
                    "boolean",
                    "select",
                    "date-range",
                    "number-range",
                    "select-multiple"
                ),
                value: P.select(isNull),
                isNull: isTrue,
            },
            (_, filter) => {
                const parameterValue: ParameterValue = {
                    comparisonOperator: filter.comparisonOperator,
                    isNull: filter.isNull,
                };
                parameters[identifier] = JSON.stringify(parameterValue);
                return parameters;
            }
        )
        .otherwise(() => parameters);
};

export const getParametersFromPropertyFilters = (properties: PropertyFilter[]): LocalStorageParameters => {
    let parameters: LocalStorageParameters = {};
    for (const property of properties) {
        parameters = { ...parameters, ...getParametersFromPropertyFilter(property) };
    }
    return parameters;
};
