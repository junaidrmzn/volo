import {
    OptimisticUpdateNotificationHandler,
    useOptimisticToggleNotificationStatus,
} from "./useOptimisticToggleNotificationStatus";
import { usePostToggleReadNotification } from "./usePostToggleReadNotification";

export type UseOptimisticToggleReadNotificationOptions = {
    notificationId: string;
    onError?: () => void;
};

const optimisticUpdateNotification: OptimisticUpdateNotificationHandler = (notification, status) => ({
    ...notification,
    read: status,
    readAt: status ? new Date().toISOString() : null,
});

export const useOptimisticToggleReadNotification = (options: UseOptimisticToggleReadNotificationOptions) => {
    const { notificationId, onError } = options;

    const { toggleRead } = usePostToggleReadNotification({ notificationId });

    const { optimisticToggle: optimisticToggleRead } = useOptimisticToggleNotificationStatus({
        onError,
        notificationId,
        toggleNotification: toggleRead,
        optimisticUpdateNotification,
    });

    return { optimisticToggleRead };
};
