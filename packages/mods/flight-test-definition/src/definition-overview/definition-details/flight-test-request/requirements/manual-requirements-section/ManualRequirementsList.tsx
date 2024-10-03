import { VStack } from "@volocopter/design-library-react";
import type { Requirement } from "@voloiq/flight-test-definition-api/v1";
import { ManualRequirementListItem } from "./ManualRequirementListItem";

export type RequirementsListProps = {
    manualRequirements: Requirement[];
};

export const ManualRequirementsList = (props: RequirementsListProps) => {
    const { manualRequirements } = props;

    return (
        <VStack w="full">
            {manualRequirements.map((manualRequirement) => (
                <ManualRequirementListItem key={manualRequirement.id} manualRequirement={manualRequirement} />
            ))}
        </VStack>
    );
};
