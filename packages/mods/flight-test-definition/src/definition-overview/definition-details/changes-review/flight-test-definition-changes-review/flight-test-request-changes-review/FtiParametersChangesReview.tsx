import { VStack } from "@volocopter/design-library-react";
import type { FTILink } from "@voloiq/flight-test-definition-api/v1";
import { SectionHeader } from "@voloiq/text-layouts";
import { FtiParameterWorkgroupCardList } from "../../../flight-test-request/fti-parameters/FtiParameterWorkgroupCardList";
import { useFtiParametersPerWorkgroup } from "../../../flight-test-request/fti-parameters/useFtiParametersPerWorkgroup";
import { useFlightTestRequestChangesReviewTranslation } from "./translations/useFlightTestRequestChangesReviewTranslation";

export type FTIParametersChangesReviewProps = {
    ftiLinks: FTILink[];
};

export const FTIParametersChangesReview = (props: FTIParametersChangesReviewProps) => {
    const { ftiLinks } = props;
    const { t } = useFlightTestRequestChangesReviewTranslation();
    const { ftiParametersPerWorkgroup } = useFtiParametersPerWorkgroup({ ftiLinks });

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader label={t("FTI Parameters")} />
            <FtiParameterWorkgroupCardList ftiParameterPerWorkgroup={ftiParametersPerWorkgroup} />
        </VStack>
    );
};
