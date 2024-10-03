import { cloneDeep } from "lodash";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import type { SelectedFtiParameterMap } from "./ftiLinkSelections";

export type UseOnChangeFtiParameterSelectionOptions = {
    setSelectedFtiParameterMap: Dispatch<SetStateAction<SelectedFtiParameterMap>>;
};

export const useOnChangeFtiParameterSelection = (options: UseOnChangeFtiParameterSelectionOptions) => {
    const { setSelectedFtiParameterMap } = options;

    const onChangeFtiParameterSelection = useCallback(
        (ftiParameterSelections: { ftiParameterId: string; isSelected: boolean }[]) => {
            setSelectedFtiParameterMap((selectedFtiParameterMap) => {
                const nextSelectedFtiParameterMap = cloneDeep(selectedFtiParameterMap);
                for (const ftiParameterSelection of ftiParameterSelections) {
                    const { ftiParameterId, isSelected } = ftiParameterSelection;
                    if (isSelected) {
                        nextSelectedFtiParameterMap[ftiParameterId] = {
                            ftiParameterId,
                            isEssential: true,
                        };
                    } else {
                        delete nextSelectedFtiParameterMap[ftiParameterId];
                    }
                }
                return nextSelectedFtiParameterMap;
            });
        },
        [setSelectedFtiParameterMap]
    );

    return { onChangeFtiParameterSelection };
};

export type OnChangeFtiParameterSelection = ReturnType<
    typeof useOnChangeFtiParameterSelection
>["onChangeFtiParameterSelection"];
