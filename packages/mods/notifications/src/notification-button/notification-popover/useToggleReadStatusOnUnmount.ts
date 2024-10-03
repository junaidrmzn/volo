import { useEffect } from "react";
import { Notification, useOptimisticToggleReadNotification } from "@voloiq/notifications-api/v1";

export type UseToggleReadStatusOnUnmountOptions = {
    notification: Notification;
};

export const useToggleReadStatusOnUnmount = (options: UseToggleReadStatusOnUnmountOptions) => {
    const { notification } = options;
    const isRead = notification.read;

    const { optimisticToggleRead } = useOptimisticToggleReadNotification({ notificationId: notification.id });

    useEffect(
        () => () => {
            if (!isRead) {
                optimisticToggleRead({
                    data: {
                        status: true,
                    },
                });
            }
        },
        [isRead, optimisticToggleRead]
    );
};
