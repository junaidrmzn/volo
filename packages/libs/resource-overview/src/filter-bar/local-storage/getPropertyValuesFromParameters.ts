import type { Property } from "@volocopter/filter-react";
import { match } from "ts-pattern";
import type { LocalStorageParameters, ParameterValue } from "./LocalStorageParameters";
import type { RangeSuffix } from "./getParameterIdentifier";
import { getParameterIdentifier } from "./getParameterIdentifier";
import { parseBoolean } from "./parseBoolean";
import { parseDate } from "./parseDate";
import { parseNumber } from "./parseNumber";

const getParameterValue = (
    parameters: LocalStorageParameters,
    property: Property,
    suffix?: RangeSuffix
): ParameterValue | undefined => {
    const { type, propertyName } = property;
    const parameter = parameters[getParameterIdentifier(type, propertyName, suffix)];
    const pattern = /value|isNull/;
    return parameter ? (pattern.test(parameter) ? JSON.parse(parameter) : { value: parameter }) : parameter;
};

const getPropertyWithValueFromParameters = (parameters: LocalStorageParameters, property: Property): Property =>
    match(property)
        .with({ type: "text" }, (property) => {
            const parameterValue = getParameterValue(parameters, property);
            return {
                ...property,
                value: parameterValue?.value,
                comparisonOperator: parameterValue?.comparisonOperator,
                isNull: parameterValue?.isNull,
            };
        })
        .with({ type: "number" }, (property) => {
            const parameterValue = getParameterValue(parameters, property);
            const value = parseNumber(parameterValue?.value);
            return { ...property, value };
        })
        .with({ type: "number-range" }, (property) => {
            const minParameterValue = getParameterValue(parameters, property, "min");
            const maxParameterValue = getParameterValue(parameters, property, "max");
            const value = {
                minValue: parseNumber(minParameterValue?.value),
                maxValue: parseNumber(maxParameterValue?.value),
            };
            return {
                ...property,
                value,
                comparisonOperator: minParameterValue?.comparisonOperator,
                isNull: minParameterValue?.isNull,
            };
        })
        .with({ type: "date" }, (property) => {
            const parameterValue = getParameterValue(parameters, property);
            const value = parseDate(parameterValue?.value);
            return {
                ...property,
                value,
                comparisonOperator: parameterValue?.comparisonOperator,
                isNull: parameterValue?.isNull,
            };
        })
        .with({ type: "date-range" }, (property) => {
            const minParameterValue = getParameterValue(parameters, property, "min");
            const maxParameterValue = getParameterValue(parameters, property, "max");
            const value = {
                minValue: parseDate(minParameterValue?.value),
                maxValue: parseDate(maxParameterValue?.value),
            };
            return {
                ...property,
                value,
                comparisonOperator: minParameterValue?.comparisonOperator,
                isNull: minParameterValue?.isNull,
            };
        })
        .with({ type: "boolean" }, (property) => {
            const parameterValue = getParameterValue(parameters, property);
            const value = parseBoolean(parameterValue?.value);
            if (parameterValue !== undefined && value !== undefined) {
                const { options } = property;
                const option = options.find((option) => option.value === value);
                return {
                    ...property,
                    value: option,
                    comparisonOperator: parameterValue.comparisonOperator,
                    isNull: parameterValue.isNull,
                };
            }
            return property;
        })
        .with({ type: "select" }, (property) => {
            const parameterValue = getParameterValue(parameters, property);
            if (parameterValue !== undefined) {
                const { options } = property;
                const option = options.find((option) => option.value.toString() === parameterValue.value);
                return {
                    ...property,
                    value: option,
                    comparisonOperator: parameterValue.comparisonOperator,
                    isNull: parameterValue.isNull,
                };
            }
            return property;
        })
        .with({ type: "select-multiple" }, (property) => {
            const parameterValue = getParameterValue(parameters, property);
            if (parameterValue !== undefined) {
                const selectedOptionIds = parameterValue.value?.split("|");
                const { options } = property;
                const selectedOptions = options.filter((option) =>
                    selectedOptionIds?.includes(option.value.toString())
                );
                return {
                    ...property,
                    value: selectedOptions,
                    comparisonOperator: parameterValue.comparisonOperator,
                    isNull: parameterValue.isNull,
                };
            }
            return property;
        })
        .otherwise(() => property);

export const getPropertyValuesFromParameters = (
    parameters: LocalStorageParameters,
    properties: Property[]
): Property[] => properties.map((property) => getPropertyWithValueFromParameters(parameters, property));
