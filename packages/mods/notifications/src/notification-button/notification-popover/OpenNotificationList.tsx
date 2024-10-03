import { FormControl, FormLabel, HStack, Switch, Text, VStack } from "@volocopter/design-library-react";
import { useGetAllNotificationsQuery } from "@voloiq/notifications-api/v1";
import { NotificationList } from "./NotificationList";
import { useNotificationPopoverTranslation } from "./translations/useNotificationPopoverTranslation";
import { useShowMutedNotifications } from "./useShowMutedNotifications";

export const OpenNotificationList = () => {
    const { notifications, isLoading } = useGetAllNotificationsQuery();
    const { t } = useNotificationPopoverTranslation();
    const { showMuted, toggleShowMuted } = useShowMutedNotifications();

    return (
        <VStack spacing={1}>
            <NotificationList
                notifications={notifications.filter(
                    (notification) => notification.resolvedBy === null && (showMuted || !notification.muted)
                )}
                isLoading={isLoading}
                noNotificationsMessage={t("You don't have any open notifications")}
            />
            <FormControl>
                <HStack justifyContent="flex-end">
                    <Switch isChecked={showMuted} onChange={toggleShowMuted} size="sm" />
                    <FormLabel>
                        <Text fontSize="xs">{t("show muted")}</Text>
                    </FormLabel>
                </HStack>
            </FormControl>
        </VStack>
    );
};
