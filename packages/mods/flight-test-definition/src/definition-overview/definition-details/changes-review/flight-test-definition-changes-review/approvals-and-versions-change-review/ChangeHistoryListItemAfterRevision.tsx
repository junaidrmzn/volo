import { CardListItem, HStack, Text, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { ChangeLogV2Value } from "@voloiq/flight-test-definition-api/v2";
import { StatusInfo } from "../../../change-history/ChangeHistoryList/StatusInfo";

export type ChangeHistoryListItemAfterRevisionProps = { changeLog: ChangeLogV2Value };

export const ChangeHistoryListItemAfterRevision = (props: ChangeHistoryListItemAfterRevisionProps) => {
    const { changeLog } = props;
    const { formatDate } = useFormatDateTime();
    const { updateTime, updateType, userName, status: currentStatus, title } = changeLog;

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
            </HStack>
        </CardListItem>
    );
};
