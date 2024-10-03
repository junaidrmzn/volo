import { ReadonlyResourceSectionContainer } from "@voloiq/flight-test-definition-components";
import type { AdditionalInformationSectionContentProps } from "../../../flight-test-request/additional-information/AdditionalInformationSectionContent";
import { AdditionalInformationSectionContent } from "../../../flight-test-request/additional-information/AdditionalInformationSectionContent";
import { useFlightTestRequestChangesReviewTranslation } from "./translations/useFlightTestRequestChangesReviewTranslation";

export const AdditionalInformationChangesReview = (props: AdditionalInformationSectionContentProps) => {
    const { dataAnalysisPlan, specialEquipment } = props;
    const { t } = useFlightTestRequestChangesReviewTranslation();

    return (
        <ReadonlyResourceSectionContainer sectionTitle={t("Additional Information")}>
            <AdditionalInformationSectionContent
                dataAnalysisPlan={dataAnalysisPlan}
                specialEquipment={specialEquipment}
            />
        </ReadonlyResourceSectionContainer>
    );
};
