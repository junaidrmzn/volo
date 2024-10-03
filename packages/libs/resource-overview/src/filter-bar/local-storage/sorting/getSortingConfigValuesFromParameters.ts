import type { SortingConfig } from "@volocopter/filter-react";
import type { LocalStorageParameters, ParameterValue } from "../LocalStorageParameters";
import { getSortingParameterIdentifier } from "./getSortingParameterIdentifier";

export const getSortingParameterValue = (parameters: LocalStorageParameters): ParameterValue | undefined => {
    const parameter = parameters[getSortingParameterIdentifier()];
    return parameter ? JSON.parse(parameter) : parameter;
};

export const getSortingConfigWithValueFromParameters = (
    parameters: LocalStorageParameters,
    sortingConfig?: SortingConfig
): SortingConfig | undefined => {
    const parameterValue = getSortingParameterValue(parameters);
    if (sortingConfig) {
        if (parameterValue !== undefined) {
            const { options } = sortingConfig;
            const { value, comparisonOperator } = parameterValue;
            const option = options.find((option) => option.value.toString() === value);
            return {
                ...sortingConfig,
                value: option,
                comparisonOperator,
            };
        }
        return sortingConfig;
    }
    return undefined;
};
