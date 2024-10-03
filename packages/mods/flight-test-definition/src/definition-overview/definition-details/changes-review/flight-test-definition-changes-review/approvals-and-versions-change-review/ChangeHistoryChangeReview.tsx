import { VStack } from "@volocopter/design-library-react";
import { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { ChangeHistoryChangeReviewAfterRevision } from "./ChangeHistoryChangeReviewAfterRevision";
import { useChangeHistoryChangeReview } from "./useChangeHistoryChangeReview";

export type ChangeHistoryChangeReviewProps = {
    definition: FlightTestDefinitionResponseBody;
};

export const ChangeHistoryChangeReview = (props: ChangeHistoryChangeReviewProps) => {
    const { definition } = props;
    const { changeLogsV2, latestRevision } = useChangeHistoryChangeReview({ definition });
    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            {changeLogsV2?.map((changeLogV2) => (
                <ChangeHistoryChangeReviewAfterRevision
                    key={changeLogV2.id}
                    currentRevision={changeLogV2.revision}
                    changeLogs={changeLogV2.value || []}
                    latestRevision={latestRevision}
                />
            ))}
        </VStack>
    );
};
