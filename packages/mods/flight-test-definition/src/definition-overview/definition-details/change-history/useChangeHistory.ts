import { useMemo } from "react";
import { useGetAllChangeLogsV2Query } from "@voloiq/flight-test-definition-api/v2";
import { useDefinition } from "../definition-context/useDefinition";

export const useChangeHistory = () => {
    const { definition } = useDefinition();

    const { changeLogsV2 } = useGetAllChangeLogsV2Query({ definitionId: definition.id });
    const latestRevision = useMemo(
        () => (changeLogsV2 && changeLogsV2?.length > 0 ? changeLogsV2[0]?.revision : ""),
        [changeLogsV2]
    );

    return { changeLogsV2, definition, latestRevision };
};
