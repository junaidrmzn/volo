import { Text, VStack } from "@volocopter/design-library-react";
import { useGetAllNotificationsQuery } from "@voloiq/notifications-api/v1";
import { NotificationList } from "./NotificationList";
import { useNotificationPopoverTranslation } from "./translations/useNotificationPopoverTranslation";

export const ResolvedNotificationList = () => {
    const { notifications, isLoading } = useGetAllNotificationsQuery();
    const { t } = useNotificationPopoverTranslation();

    return (
        <VStack>
            <NotificationList
                notifications={notifications.filter((notification) => notification.resolvedBy !== null)}
                isLoading={isLoading}
                noNotificationsMessage={t("There are no resolved notifications")}
            />
            <Text fontSize="xx-small" color="fontOnBgMuted" alignSelf="flex-start">
                {t("Resolved notifications will be deleted automatically after 30 days")}
            </Text>
        </VStack>
    );
};
