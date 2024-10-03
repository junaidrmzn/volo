import { Center, Text } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import type { ChangeLog } from "@voloiq/flight-test-definition-api/v1";
import { useParams, useSearchParams } from "@voloiq/routing";
import { ProcedureChangeLogWrapper } from "./flight-ground-test-plan-changes-review/procedure-changes-review/ProcedureChangeLogWrapper";
import { ProcedureRevisionWrapper } from "./flight-ground-test-plan-changes-review/procedure-changes-review/ProcedureRevisionWrapper";
import { FlightTestDefinitionChangeLogWrapper } from "./flight-test-definition-changes-review/FlightTestDefinitionChangeLogWrapper";
import { FlightTestDefinitionRevisionWrapper } from "./flight-test-definition-changes-review/FlightTestDefinitionRevisionWrapper";
import { useChangesReviewTranslation } from "./translations/useChangesReviewTranslation";

export const ChangesReview = () => {
    const { definitionId, referenceId, revisionId, procedureId } = useParams();
    const [searchParams] = useSearchParams();
    const { t } = useChangesReviewTranslation();
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const entityType = searchParams.get("entityType") as ChangeLog["entityType"];

    return match(entityType)
        .when(
            () => !definitionId,
            () => (
                <Center>
                    <Text>{t("Invalid Flight Test Definition Id. Unable to identify changeset.")}</Text>
                </Center>
            )
        )
        .with("flightTestDefinition", () => {
            if (definitionId) {
                if (referenceId) {
                    return (
                        <FlightTestDefinitionChangeLogWrapper definitionId={definitionId} referenceId={referenceId} />
                    );
                }

                if (revisionId) {
                    return <FlightTestDefinitionRevisionWrapper definitionId={definitionId} revisionId={revisionId} />;
                }
            }

            return null;
        })
        .with("procedure", () => {
            if (definitionId) {
                if (referenceId) {
                    return (
                        <ProcedureChangeLogWrapper
                            referenceId={referenceId}
                            definitionId={definitionId}
                            procedureId={procedureId}
                        />
                    );
                }
                if (procedureId) {
                    return (
                        <ProcedureRevisionWrapper
                            procedureId={procedureId}
                            definitionId={definitionId}
                            revisionString={revisionId}
                        />
                    );
                }
            }
            return null;
        })
        .exhaustive();
};
