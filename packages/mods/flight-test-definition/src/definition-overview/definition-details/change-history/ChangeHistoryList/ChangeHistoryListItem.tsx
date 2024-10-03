import { CardListItem, HStack, Text, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { ChangeLog } from "@voloiq/flight-test-definition-api/v1";
import { DetailsButton } from "@voloiq/flight-test-definition-components";
import { useDefinition } from "../../definition-context/useDefinition";
import { StatusInfo } from "./StatusInfo";

const openReviewTab = (definitionId: string, entityType: ChangeLog["entityType"], referenceId: string) => {
    window.open(`./${definitionId}/changes-review/${referenceId}?entityType=${entityType}`, "_target");
};

export type ChangeHistoryListItemProps = { changeLog: ChangeLog };

export const ChangeHistoryListItem = (props: ChangeHistoryListItemProps) => {
    const { changeLog } = props;
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { updateTime, updateType, userName, status: currentStatus, title, entityType, referenceId } = changeLog;
    const { formatDate } = useFormatDateTime();

    return (
        <CardListItem variant="subtle" py={1.5} px={6}>
            <HStack>
                <VStack spacing={0} flex={1} alignItems="flex-start">
                    <HStack spacing={4}>
                        <Text fontSize="md" lineHeight={6} fontWeight="bold">
                            {title}
                        </Text>
                        <StatusInfo currentStatus={currentStatus} statusChanged={updateType === "Status Change"} />
                    </HStack>
                    <Text fontSize="sm" lineHeight={6}>
                        {`by ${userName} • ${formatDate(updateTime)}`}
                    </Text>
                    <Text fontSize="sm" lineHeight={6}>
                        {updateType}
                    </Text>
                </VStack>
                <DetailsButton onClick={() => openReviewTab(definitionId, entityType, referenceId)} />
            </HStack>
        </CardListItem>
    );
};
