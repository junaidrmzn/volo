import { useMemo, useState } from "react";
import type { Parameter } from "@voloiq/flight-test-definition-api/v1";
import type { SearchFtiParameters } from "./useSearchFtiParameters";
import type { SelectedFtiParameter } from "./useSelectedFtiParameters";

export type UseSelectableFtiParametersOptions = {
    searchFtiParameters: SearchFtiParameters;
    selectedFtiParameters: SelectedFtiParameter[];
};

export const useSelectableFtiParameters = (options: UseSelectableFtiParametersOptions) => {
    const { searchFtiParameters, selectedFtiParameters } = options;
    const [ftiParameters, setFtiParameters] = useState<Parameter[]>([]);
    const onSearchFtiParameter = (searchFilter: string) => {
        if (searchFilter) {
            searchFtiParameters(searchFilter).then((ftiParameters) => {
                if (ftiParameters) {
                    setFtiParameters(ftiParameters);
                }
            });
        } else {
            setFtiParameters([]);
        }
    };

    const selectableFtiParameters = useMemo(
        () =>
            ftiParameters.map((ftiParameter) => ({
                ftiParameter,
                isSelected: selectedFtiParameters.some(
                    (selectedFtiParameter) => selectedFtiParameter.ftiParameter.id === ftiParameter.id
                ),
            })),
        [ftiParameters, selectedFtiParameters]
    );

    return { onSearchFtiParameter, selectableFtiParameters };
};

export type SelectableFtiParameters = ReturnType<typeof useSelectableFtiParameters>["selectableFtiParameters"];
