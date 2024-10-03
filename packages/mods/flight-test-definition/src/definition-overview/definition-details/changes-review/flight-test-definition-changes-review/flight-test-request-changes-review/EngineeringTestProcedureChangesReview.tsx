import { EngineeringTestProcedure } from "@voloiq/flight-test-definition-api/v1";
import { ReadonlyResourceSectionContainer } from "@voloiq/flight-test-definition-components";
import { EngineeringTestProcedureList } from "../../../flight-test-request/engineering-test-procedure/EngineeringTestProcedureList";
import { useFlightTestRequestChangesReviewTranslation } from "./translations/useFlightTestRequestChangesReviewTranslation";

export type EngineeringTestProcedureChangesReviewProps = {
    engineeringTestProcedures: EngineeringTestProcedure[];
};

export const EngineeringTestProcedureChangesReview = (props: EngineeringTestProcedureChangesReviewProps) => {
    const { engineeringTestProcedures } = props;
    const { t } = useFlightTestRequestChangesReviewTranslation();

    return (
        <ReadonlyResourceSectionContainer sectionTitle={t("Engineering Test Procedures")}>
            <EngineeringTestProcedureList engineeringTestProcedures={engineeringTestProcedures} />
        </ReadonlyResourceSectionContainer>
    );
};
