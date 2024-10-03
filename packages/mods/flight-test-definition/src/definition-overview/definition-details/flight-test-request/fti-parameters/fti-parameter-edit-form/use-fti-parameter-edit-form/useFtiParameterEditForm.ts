import { useEffect, useState } from "react";
import type { FTILink } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllParameterGroupsQuery } from "@voloiq/flight-test-definition-api/v1";
import type { SelectedFtiParameterMap } from "./ftiLinkSelections";
import { useFtiGroups } from "./useFtiGroups";
import { useOnChangeFtiParameterEssentiality } from "./useOnChangeFtiParameterEssentiality";
import { useOnChangeFtiParameterSelection } from "./useOnChangeFtiParameterSelection";
import { useOnSubmitFtiParameterForm } from "./useOnSubmitFtiParameterForm";
import type { SearchFtiParameters } from "./useSearchFtiParameters";
import { useSearchFtiParameters } from "./useSearchFtiParameters";
import { useSelectableFtiParameters } from "./useSelectableFtiParameters";
import { useSelectedFtiParameters } from "./useSelectedFtiParameters";

export type UseFtiParameterEditFormOptions = {
    definitionId: string;
    ftiLinks?: FTILink[];
};

const populateFtiParameterCache = (ftiParameterIds: string[], searchFtiParameters: SearchFtiParameters) => {
    const ftiParameterIdFilter = `id IN [${ftiParameterIds.map((id) => `"${id}"`).join(",")}]`;
    searchFtiParameters(ftiParameterIdFilter);
};

export const useFtiParameterEditForm = (options: UseFtiParameterEditFormOptions) => {
    const { definitionId, ftiLinks } = options;

    const [selectedFtiParameterMap, setSelectedFtiParameterMap] = useState<SelectedFtiParameterMap>({});

    const { searchFtiParameters, updateAllFtiParametersCache, getFtiParameter } = useSearchFtiParameters();
    const { parameterGroups } = useGetAllParameterGroupsQuery();
    const { onSaveParameterGroup, onDeleteParameterGroup, onChangeGroupSelect, selectedParameterGroup } =
        useFtiGroups(selectedFtiParameterMap);

    useEffect(() => {
        const selectedGroup = parameterGroups.find((group) => group.id === selectedParameterGroup?.value);

        if (selectedGroup !== undefined && selectedGroup.parameterGroupMapping.length > 0) {
            const parameterIds: string[] = selectedGroup?.parameterGroupMapping.map(
                (parameter) => parameter.parameterId
            );
            populateFtiParameterCache(parameterIds, searchFtiParameters);

            const updatedSelectedFtiParameterMap: SelectedFtiParameterMap = {};
            for (const parameter of selectedGroup.parameterGroupMapping) {
                updatedSelectedFtiParameterMap[parameter.parameterId] = {
                    ftiParameterId: parameter.parameterId,
                    isEssential: parameter.essential,
                };
            }
            setSelectedFtiParameterMap(updatedSelectedFtiParameterMap);
        }
    }, [parameterGroups, searchFtiParameters, selectedParameterGroup]);

    useEffect(() => {
        if (ftiLinks !== undefined && ftiLinks.length > 0) {
            updateAllFtiParametersCache(ftiLinks.map((link) => link.instrumentationParameter));

            const updatedSelectedFtiParameterMap: SelectedFtiParameterMap = Object.fromEntries(
                ftiLinks.map((ftiLink) => [
                    ftiLink.instrumentationId,
                    {
                        ftiParameterId: ftiLink.instrumentationId,
                        ftiLinkId: ftiLink.id,
                        isEssential: ftiLink.desirability === "ESSENTIAL",
                    },
                ])
            );
            setSelectedFtiParameterMap(updatedSelectedFtiParameterMap);
        } else {
            setSelectedFtiParameterMap({});
        }
    }, [ftiLinks, updateAllFtiParametersCache]);

    const { onChangeFtiParameterSelection } = useOnChangeFtiParameterSelection({ setSelectedFtiParameterMap });
    const { onChangeFtiParameterEssentiality } = useOnChangeFtiParameterEssentiality({ setSelectedFtiParameterMap });
    const { selectedFtiParameters } = useSelectedFtiParameters({ getFtiParameter, selectedFtiParameterMap });
    const { onSearchFtiParameter, selectableFtiParameters } = useSelectableFtiParameters({
        searchFtiParameters,
        selectedFtiParameters,
    });

    const { onSubmit } = useOnSubmitFtiParameterForm({
        definitionId,
        ftiLinks: ftiLinks ?? [],
        selectedFtiParameterMap,
    });

    const onSearchInputFieldChange = (search: string) => {
        const filter = search ? `(${search}) AND aircraftMapping.status IN ["DRAFT", "RELEASED"]` : "";
        onSearchFtiParameter(filter);
    };

    return {
        onSearchInputFieldChange,
        selectableFtiParameters,
        onChangeFtiParameterSelection,
        onChangeFtiParameterEssentiality,
        selectedFtiParameters,
        onSubmit,
        parameterGroups,
        onSaveParameterGroup,
        onDeleteParameterGroup,
        onChangeGroupSelect,
        selectedParameterGroup,
    };
};
