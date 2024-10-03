import { VStack } from "@volocopter/design-library-react";
import type { SpecialComment } from "@voloiq/flight-test-definition-api/v1";
import { SectionHeader } from "@voloiq/text-layouts";
import { SpecialCommentsCardList } from "../../../flight-test-request/special-comments/special-comments-card-list/SpecialCommentsCardList";
import { useFlightTestRequestChangesReviewTranslation } from "./translations/useFlightTestRequestChangesReviewTranslation";

export type SpecialCommentsChangesReviewProps = {
    specialComments: SpecialComment[];
};

export const SpecialCommentsChangesReview = (props: SpecialCommentsChangesReviewProps) => {
    const { specialComments } = props;
    const { t } = useFlightTestRequestChangesReviewTranslation();

    return (
        <VStack spacing={3} alignItems="stretch">
            <SectionHeader label={t("Special Comments")} />
            <SpecialCommentsCardList specialComments={specialComments} />
        </VStack>
    );
};
