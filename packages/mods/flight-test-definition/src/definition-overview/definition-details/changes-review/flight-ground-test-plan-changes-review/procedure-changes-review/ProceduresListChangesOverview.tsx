import { VStack } from "@volocopter/design-library-react";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { ReadonlyResourceSectionContainer } from "@voloiq/flight-test-definition-components";
import { ProcedureCard } from "../../../flight-ground-test-plan/procedures/procedures-section/ProcedureCard";
import { useFlightTestDefinitionChangesReviewTranslation } from "../../flight-test-definition-changes-review/translations/useFlightTestDefinitionChangesReviewTranslation";

export type ProceduresListChangesOverviewProps = {
    procedures: ProcedureRead[];
};

export const ProceduresListChangesOverview = (props: ProceduresListChangesOverviewProps) => {
    const { procedures } = props;
    const { t } = useFlightTestDefinitionChangesReviewTranslation();

    return (
        <ReadonlyResourceSectionContainer sectionTitle={t("Procedures")}>
            <VStack alignItems="stretch">
                {procedures.map((procedure, index) => (
                    <ProcedureCard key={procedure.id} procedure={procedure} procedureIndex={index + 1} />
                ))}
            </VStack>
        </ReadonlyResourceSectionContainer>
    );
};
