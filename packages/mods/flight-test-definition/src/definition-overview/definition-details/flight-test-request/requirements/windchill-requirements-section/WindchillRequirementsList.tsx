import { VStack } from "@volocopter/design-library-react";
import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { WindchillRequirementListItem } from "./WindchillRequirementListItem";

export type WindchillRequirementsListProps = {
    windchillRequirements: WindchillRequirement[];
};

export const WindchillRequirementsList = (props: WindchillRequirementsListProps) => {
    const { windchillRequirements } = props;

    return (
        <VStack w="full">
            {windchillRequirements.map((windchillRequirement) => (
                <WindchillRequirementListItem
                    key={windchillRequirement.id}
                    windchillRequirement={windchillRequirement}
                />
            ))}
        </VStack>
    );
};
