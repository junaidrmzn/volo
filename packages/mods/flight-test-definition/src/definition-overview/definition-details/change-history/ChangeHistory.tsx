import { VStack } from "@volocopter/design-library-react";
import { ChangeHistoryAfterRevision } from "./ChangeHistoryAfterRevision";
import { useChangeHistory } from "./useChangeHistory";

export const ChangeHistory = () => {
    const { changeLogsV2, latestRevision } = useChangeHistory();

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            {changeLogsV2?.map((changeLogV2, index) => (
                <ChangeHistoryAfterRevision
                    key={changeLogV2.id}
                    currentRevision={changeLogV2.revision}
                    changeLogs={changeLogV2.value || []}
                    latestRevision={latestRevision}
                    index={index}
                />
            ))}
        </VStack>
    );
};
