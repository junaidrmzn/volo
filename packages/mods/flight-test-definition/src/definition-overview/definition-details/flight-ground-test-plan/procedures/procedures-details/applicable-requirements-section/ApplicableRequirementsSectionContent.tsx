import { VStack } from "@volocopter/design-library-react";
import type { ApplicableRequirement } from "@voloiq-typescript-api/ftd-types";
import { ApplicableRequirementCard } from "./ApplicableRequirementCard";

export type ApplicableRequirementsSectionContentProps = {
    applicableRequirements: ApplicableRequirement[];
};

export const ApplicableRequirementsSectionContent = (props: ApplicableRequirementsSectionContentProps) => {
    const { applicableRequirements } = props;

    return (
        <VStack alignItems="stretch">
            {applicableRequirements
                .filter((applicableRequirement) => applicableRequirement?.applicable === true)
                .map((applicableRequirement) => (
                    <ApplicableRequirementCard
                        key={applicableRequirement.id}
                        applicableRequirement={applicableRequirement}
                    />
                ))}
        </VStack>
    );
};
