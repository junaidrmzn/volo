import { useMemo } from "react";
import { FlightTestDefinitionResponseBody, useGetAllChangeLogsV2Query } from "@voloiq/flight-test-definition-api/v2";

export type UseChangeHistoryChangeReviewProps = {
    definition: FlightTestDefinitionResponseBody;
};
export const useChangeHistoryChangeReview = (props: UseChangeHistoryChangeReviewProps) => {
    const { definition } = props;
    const { changeLogsV2 } = useGetAllChangeLogsV2Query({ definitionId: definition.id });
    const latestRevision = useMemo(
        () => (changeLogsV2 && changeLogsV2?.length > 0 ? changeLogsV2[0]?.revision : ""),
        [changeLogsV2]
    );

    return { changeLogsV2, definition, latestRevision };
};
