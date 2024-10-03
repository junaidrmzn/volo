import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    ParameterGroupMapping,
    getAllParameterGroupsQueryKey,
    useCreateParameterGroup,
    useDeleteParameterGroup,
} from "@voloiq/flight-test-definition-api/v1";
import type { SelectOption } from "@voloiq/form";
import type { SelectedFtiParameterMap } from "./ftiLinkSelections";

export const useFtiGroups = (selectedFtiParameterMap: SelectedFtiParameterMap) => {
    const queryClient = useQueryClient();
    const { createParameterGroup } = useCreateParameterGroup();
    const { deleteParameterGroup } = useDeleteParameterGroup();
    const [selectedParameterGroup, setSelectedParameterGroup] = useState<SelectOption | null | undefined>();
    const onChangeGroupSelect = (data?: SelectOption | null) => {
        setSelectedParameterGroup(data);
    };

    const onSaveParameterGroup = async (name: string) => {
        const parameterGroupMapping: ParameterGroupMapping[] = Object.values(selectedFtiParameterMap).map((value) => ({
            essential: value.isEssential,
            parameterId: value.ftiParameterId,
        }));
        await createParameterGroup({ name, parameterGroupMapping });
        await queryClient.invalidateQueries(getAllParameterGroupsQueryKey());
    };

    const onDeleteParameterGroup = async (data?: SelectOption | null) => {
        if (data) {
            await deleteParameterGroup(data.value);
            await queryClient.invalidateQueries(getAllParameterGroupsQueryKey());
            setSelectedParameterGroup(null);
        }
    };

    return {
        onChangeGroupSelect,
        onSaveParameterGroup,
        onDeleteParameterGroup,
        selectedParameterGroup,
    };
};
