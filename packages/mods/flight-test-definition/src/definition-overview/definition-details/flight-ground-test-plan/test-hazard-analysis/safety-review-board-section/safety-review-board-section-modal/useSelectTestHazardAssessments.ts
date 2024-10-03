import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    TestHazardAssessment,
    getAssignedTestHazardAssessmentsQueryKey,
    useAssignTestHazardAssessments,
    useUnassignTestHazardAssessments,
} from "@voloiq/flight-test-definition-api/v1";
import { getDefinitionQueryKey } from "@voloiq/flight-test-definition-api/v2";
import { useDefinition } from "../../../../definition-context/useDefinition";
import { groupTestHazardAssessments } from "./groupTestHazardAssessments";

type UseSelectTestHazardAssessmentsOptions = {
    initialItems: TestHazardAssessment[];
};

export const useSelectTestHazardAssessments = (options: UseSelectTestHazardAssessmentsOptions) => {
    const { initialItems } = options;

    const [selectedItems, setSelectedItems] = useState<TestHazardAssessment[]>(initialItems);

    const {
        definition: { id: definitionId },
    } = useDefinition();
    const queryClient = useQueryClient();
    const { assignTestHazardAssessments, isLoading: isAssignLoading } = useAssignTestHazardAssessments({
        definitionId,
    });
    const { unassignTestHazardAssessments, isLoading: isUnassignLoading } = useUnassignTestHazardAssessments({
        definitionId,
    });

    const onToggleItem = (isChecked: boolean, testHazardAssessment: TestHazardAssessment) => {
        setSelectedItems((previousState) =>
            isChecked
                ? [...previousState, testHazardAssessment]
                : previousState.filter((selectedItem) => selectedItem.id !== testHazardAssessment.id)
        );
    };

    const getIsItemSelected = (id: string) => selectedItems.some((selectedItem) => selectedItem.id === id);

    const onSubmitSelectedItems = async () => {
        const operations = [];

        const existingIds = new Set(initialItems.map((item) => item.id));
        const selectedIds = new Set(selectedItems.map((selectedItem) => selectedItem.id));
        // Only add IDs that are not already associated with the definition
        const addedIds = [...selectedIds].filter((id) => !existingIds.has(id));
        // Only remove IDs that are already associated with the definition
        const removedIds = [...existingIds].filter((id) => !selectedIds.has(id));

        if (addedIds.length > 0) {
            operations.push(
                assignTestHazardAssessments({
                    data: addedIds,
                })
            );
        }

        if (removedIds.length > 0) {
            operations.push(
                unassignTestHazardAssessments({
                    data: removedIds,
                })
            );
        }

        if (operations.length > 0) {
            await Promise.allSettled(operations);
            queryClient.invalidateQueries(getAssignedTestHazardAssessmentsQueryKey(definitionId));
            queryClient.invalidateQueries(getDefinitionQueryKey(definitionId));
        }
    };

    return {
        selectedItems,
        groupedSelectedItems: groupTestHazardAssessments(selectedItems),
        getIsItemSelected,
        onToggleItem,
        onSubmitSelectedItems,
        isSubmitLoading: isAssignLoading || isUnassignLoading,
    };
};
