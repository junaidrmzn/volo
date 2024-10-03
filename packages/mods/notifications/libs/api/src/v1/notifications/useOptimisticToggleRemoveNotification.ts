import {
    OptimisticUpdateNotificationHandler,
    useOptimisticToggleNotificationStatus,
} from "./useOptimisticToggleNotificationStatus";
import { usePostToggleRemoveNotification } from "./usePostToggleRemoveNotification";

export type UseOptimisticToggleRemoveNotificationOptions = {
    notificationId: string;
    onError?: () => void;
};

const optimisticUpdateNotification: OptimisticUpdateNotificationHandler = (notification, status) =>
    status === true ? undefined : notification;

export const useOptimisticToggleRemoveNotification = (options: UseOptimisticToggleRemoveNotificationOptions) => {
    const { notificationId, onError } = options;

    const { toggleRemove } = usePostToggleRemoveNotification({ notificationId });

    const { optimisticToggle: optimisticToggleRemove } = useOptimisticToggleNotificationStatus({
        onError,
        notificationId,
        toggleNotification: toggleRemove,
        optimisticUpdateNotification,
    });

    return { optimisticToggleRemove };
};
