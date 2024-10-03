import type { SortingState } from "@volocopter/filter-react";
import type { LocalStorageParameters, ParameterValue } from "../LocalStorageParameters";
import { getSortingParameterIdentifier } from "./getSortingParameterIdentifier";

export const getSortingParameterFromSortingState = (sortingState: SortingState): LocalStorageParameters => {
    const parameters: LocalStorageParameters = {};
    const identifier = getSortingParameterIdentifier();
    const parameterValue: ParameterValue = {
        value: sortingState.value?.value?.toString(),
        comparisonOperator: sortingState.comparisonOperator,
    };
    parameters[identifier] = JSON.stringify(parameterValue);
    return parameters;
};
