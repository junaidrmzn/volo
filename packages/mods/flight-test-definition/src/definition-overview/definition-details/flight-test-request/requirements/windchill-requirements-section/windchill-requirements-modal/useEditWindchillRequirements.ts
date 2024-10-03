import { useEffect, useState } from "react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import {
    useBulkEditWindchillAssociatedRequirements,
    useBulkEditWindchillRequirements,
} from "@voloiq/flight-test-definition-api/v1";
import { useDefinition } from "../../../../definition-context/useDefinition";

type UseEditWindchillRequirementsOptions = {
    selectedWindchillRequirements: WindchillRequirement[];
};
export type EditableWindchillRequirement = {
    id?: string;
    passOrFailCriteria?: WindchillRequirement["passOrFailCriteria"];
    oldPassOrFailCriteria?: WindchillRequirement["passOrFailCriteria"];
};
export type PartialWindchillRequirementsHash = {
    [key: WindchillRequirement["id"]]: EditableWindchillRequirement;
};

const initialEditableWindchillRequirementsHash = (
    windchillRequirements: WindchillRequirement[]
): PartialWindchillRequirementsHash =>
    Object.fromEntries(
        windchillRequirements.map((requirementItem) => [
            requirementItem.id,
            {
                id: requirementItem.id,
                passOrFailCriteria: requirementItem.passOrFailCriteria || "",
                oldPassOrFailCriteria: requirementItem.passOrFailCriteria || "",
            },
        ])
    );

export const useEditWindchillRequirements = (options: UseEditWindchillRequirementsOptions) => {
    const { selectedWindchillRequirements } = options;

    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { bulkEditWindchillRequirements, isLoading: isBulkEditWindchillRequirementsLoading } =
        useBulkEditWindchillRequirements();
    const { bulkEditWindchillAssociatedRequirements, isLoading: isBulkEditWindchillAssociatedRequirementsLoading } =
        useBulkEditWindchillAssociatedRequirements({ definitionId });

    const [editedRequirementsHash, setEditedRequirementsHash] = useState<PartialWindchillRequirementsHash>(
        initialEditableWindchillRequirementsHash(selectedWindchillRequirements)
    );

    const editRequirement = (
        requirementId: WindchillRequirement["id"],
        passOrFailCriteria: WindchillRequirement["passOrFailCriteria"]
    ) => {
        setEditedRequirementsHash((oldState) => ({
            ...oldState,
            [requirementId]: {
                oldPassOrFailCriteria: oldState[requirementId]?.oldPassOrFailCriteria,
                id: requirementId,
                passOrFailCriteria,
            },
        }));
    };

    useEffect(() => {
        setEditedRequirementsHash((oldState) => ({
            ...initialEditableWindchillRequirementsHash(selectedWindchillRequirements),
            ...oldState,
        }));
    }, [selectedWindchillRequirements]);

    return {
        bulkEditWindchillRequirements,
        bulkEditWindchillAssociatedRequirements,
        editedRequirementsHash,
        editRequirement,
        getPassOrFailCriteria: (requirementId: string) => editedRequirementsHash[requirementId]?.passOrFailCriteria,
        isEditWindchillRequirementsLoading:
            isBulkEditWindchillRequirementsLoading || isBulkEditWindchillAssociatedRequirementsLoading,
    };
};
