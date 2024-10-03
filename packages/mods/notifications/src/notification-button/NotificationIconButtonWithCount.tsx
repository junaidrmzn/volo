import { Box, Icon, IconButton } from "@volocopter/design-library-react";
import { useGetAllNotificationsQuery } from "@voloiq/notifications-api/v1";
import { useNotificationButtonTranslation } from "./translations/useNotificationButtonTranslation";

export const NotificationIconButtonWithCount = () => {
    const { t } = useNotificationButtonTranslation();
    const { notifications } = useGetAllNotificationsQuery();
    const notificationCount = notifications.filter((notification) => !notification.read).length ?? 0;
    const right = notificationCount <= 99 ? -1.5 : -4.5;

    return (
        <Box position="relative">
            <IconButton aria-label={t("Notifications")} variant="secondary">
                <Icon icon="bell" />
            </IconButton>
            {notificationCount > 0 && (
                <Box
                    position="absolute"
                    top={-1.5}
                    right={right}
                    backgroundColor="focusBasic"
                    color="white"
                    borderRadius="full"
                    minWidth={4.5}
                    height={4.5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xxs"
                    cursor="pointer"
                    padding={1.5}
                    fontWeight="semibold"
                >
                    {notificationCount > 9999 ? "9999+" : notificationCount}
                </Box>
            )}
        </Box>
    );
};
