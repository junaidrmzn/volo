import type { Parameter } from "@voloiq-typescript-api/fti-types/dist";
import { useMemo } from "react";
import type { SelectedFtiParameterMap } from "./ftiLinkSelections";
import type { GetFtiParameter } from "./useSearchFtiParameters";

export type SelectedFtiParameter = {
    ftiParameter: Parameter;
    isEssential: boolean;
};
export type UseSelectedFtiParametersOptions = {
    selectedFtiParameterMap: SelectedFtiParameterMap;
    getFtiParameter: GetFtiParameter;
};

export const useSelectedFtiParameters = (options: UseSelectedFtiParametersOptions) => {
    const { getFtiParameter, selectedFtiParameterMap } = options;

    const selectedFtiParameters = useMemo(
        () =>
            Object.values(selectedFtiParameterMap)
                .map((selectedFtiParameter) => ({
                    ftiParameter: getFtiParameter(selectedFtiParameter.ftiParameterId),
                    isEssential: selectedFtiParameter.isEssential,
                }))
                .filter(
                    (selectedFtiParameter): selectedFtiParameter is SelectedFtiParameter =>
                        selectedFtiParameter.ftiParameter !== undefined
                ),
        [getFtiParameter, selectedFtiParameterMap]
    );

    return { selectedFtiParameters };
};
