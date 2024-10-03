import { cloneDeep } from "lodash";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import type { SelectedFtiParameterMap } from "./ftiLinkSelections";

export type UseOnChangeFtiParameterEssentialityOptions = {
    setSelectedFtiParameterMap: Dispatch<SetStateAction<SelectedFtiParameterMap>>;
};

export const useOnChangeFtiParameterEssentiality = (options: UseOnChangeFtiParameterEssentialityOptions) => {
    const { setSelectedFtiParameterMap } = options;

    const onChangeFtiParameterEssentiality = useCallback(
        (ftiParameterSelections: { ftiParameterId: string; isEssential: boolean }[]) => {
            setSelectedFtiParameterMap((selectedFtiParameterMap) => {
                const nextSelectedFtiParameterMap = cloneDeep(selectedFtiParameterMap);
                for (const ftiParameterSelection of ftiParameterSelections) {
                    const { ftiParameterId, isEssential } = ftiParameterSelection;
                    const selectedFtiParameter = nextSelectedFtiParameterMap[ftiParameterId];
                    if (selectedFtiParameter) {
                        selectedFtiParameter.isEssential = isEssential;
                    }
                }
                return nextSelectedFtiParameterMap;
            });
        },
        [setSelectedFtiParameterMap]
    );

    return { onChangeFtiParameterEssentiality };
};

export type OnChangeFtiParameterEssentiality = ReturnType<
    typeof useOnChangeFtiParameterEssentiality
>["onChangeFtiParameterEssentiality"];
