import { useToast } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Notification } from "@voloiq/notifications-api/v1";
import { useRealtimeNotificationProviderTranslation } from "./translations/useRealtimeNotificationProviderTranslation";

export const useNotificationResolvedToast = () => {
    const sendToast = useToast();
    const { t } = useRealtimeNotificationProviderTranslation();

    const sendNotificationResolvedToast = (notification: Notification) =>
        sendToast({
            status: "info",
            title: t("{resolver} resolved {sender} {notificationType}", {
                resolver: notification.resolvedBy,
                sender: notification.sender,
                notificationType: match(notification.severity)
                    .with("INFO", "UNKNOWN", () => t("info"))
                    .with("WARNING", () => t("warning"))
                    .with("ERROR", () => t("alert"))
                    .exhaustive(),
            }),
            description: `${notification.title}\n${notification.message}`,
            isClosable: true,
        });
    return { sendNotificationResolvedToast };
};
