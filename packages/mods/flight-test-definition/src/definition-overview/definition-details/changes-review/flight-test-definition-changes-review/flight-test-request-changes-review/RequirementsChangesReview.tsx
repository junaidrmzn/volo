import { VStack } from "@volocopter/design-library-react";
import type { Requirement, WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { SectionHeader } from "@voloiq/text-layouts";
import { ManualRequirementsList } from "../../../flight-test-request/requirements/manual-requirements-section/ManualRequirementsList";
import { WindchillRequirementsList } from "../../../flight-test-request/requirements/windchill-requirements-section/WindchillRequirementsList";
import { useFlightTestRequestChangesReviewTranslation } from "./translations/useFlightTestRequestChangesReviewTranslation";

export type RequirementsChangesReviewProps = {
    manualRequirements: Requirement[];
    windchillRequirements: WindchillRequirement[];
};

export const RequirementsChangesReview = (props: RequirementsChangesReviewProps) => {
    const { manualRequirements, windchillRequirements } = props;
    const { t } = useFlightTestRequestChangesReviewTranslation();

    return (
        <VStack spacing={6} alignItems="stretch">
            <VStack spacing={3} alignItems="stretch">
                <SectionHeader label={t("Manual Applicable Requirements")} />
                <ManualRequirementsList manualRequirements={manualRequirements} />
            </VStack>
            <VStack spacing={3} alignItems="stretch">
                <SectionHeader label={t("Applicable Requirements From Windchill")} />
                <WindchillRequirementsList windchillRequirements={windchillRequirements} />
            </VStack>
        </VStack>
    );
};
