import { Card, Divider, Text, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { CheckListCategory, Mission } from "@voloiq/network-schedule-management-api/v1";
import { Section } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { MessageInformationForm } from "./message-information/MessageInformationForm";

type DispatcherNotesProps = {
    mission: Mission;
    onMessageSubmitted: (state: boolean) => void;
    activeTab: CheckListCategory;
};
export const DispatcherNotes = (props: DispatcherNotesProps) => {
    const { mission, onMessageSubmitted, activeTab } = props;
    const { messages, id } = mission;

    const { t } = useMissionTranslations();
    const { formatDateTime } = useFormatDateTime();
    return (
        <Section
            headerLabel={`${t("DispatcherNotes")} (${messages?.length})`}
            bg="bgNavigationLayer2"
            bodyContent={
                <VStack alignItems="stretch" width="100%" gap={1}>
                    <MessageInformationForm
                        missionId={id}
                        onMessageSubmitted={onMessageSubmitted}
                        activeTab={activeTab}
                    />
                    <Divider />
                    {messages && (
                        <VStack spacing={3}>
                            {messages.map((message) => (
                                <Card width="100%" py={2} px={4} key={message.id}>
                                    <Text fontSize="xs" mb={1}>
                                        {message.message}
                                    </Text>
                                    <Text fontSize="xxs" color="fontOnBgMuted" mb={1}>
                                        {`${message.publishDate ? formatDateTime(message.publishDate) : ""} • ${
                                            message.authorEmail
                                        } ${message.userRole ? ` • ${message.userRole}` : ""}`}
                                    </Text>
                                    {message.messageCategory && (
                                        <Text fontSize="xxs" fontWeight="bold" color="fontOnBgMuted">
                                            {t(`messageSources.${message.messageCategory}`)}
                                        </Text>
                                    )}
                                </Card>
                            ))}
                        </VStack>
                    )}
                </VStack>
            }
        />
    );
};
