import { useState } from "react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";

export type UseSelectWindchillRequirementsOptions = {
    assignedWindchillRequirements: WindchillRequirement[];
};

export const useSelectWindchillRequirements = (options: UseSelectWindchillRequirementsOptions) => {
    const { assignedWindchillRequirements } = options;

    const [selectedWindchillRequirements, setSelectedWindchillRequirements] =
        useState<WindchillRequirement[]>(assignedWindchillRequirements);

    const unselectRequirement = (unselectedRequirement: WindchillRequirement) => {
        setSelectedWindchillRequirements((oldState) =>
            oldState.filter((requirement) => requirement.id !== unselectedRequirement.id)
        );
    };

    const selectRequirement = (requirement: WindchillRequirement) => {
        setSelectedWindchillRequirements((oldState) => [...oldState, requirement]);
    };

    const handleCheckboxOnChange = (checked: boolean, requirement: WindchillRequirement) => {
        if (checked) {
            selectRequirement(requirement);
        } else {
            unselectRequirement(requirement);
        }
    };

    return {
        selectedWindchillRequirements,
        getSelectedRequirementIds: () => selectedWindchillRequirements.map((requirement) => requirement.id),
        handleCheckboxOnChange,
    };
};
