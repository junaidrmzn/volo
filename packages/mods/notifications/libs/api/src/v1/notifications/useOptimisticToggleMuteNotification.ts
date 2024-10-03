import {
    OptimisticUpdateNotificationHandler,
    useOptimisticToggleNotificationStatus,
} from "./useOptimisticToggleNotificationStatus";
import { usePostToggleMuteNotification } from "./usePostToggleMuteNotification";

export type UseOptimisticToggleMuteNotificationOptions = {
    notificationId: string;
    onError?: () => void;
};

const optimisticUpdateNotification: OptimisticUpdateNotificationHandler = (notification, status) => ({
    ...notification,
    muted: status,
    mutedAt: status ? new Date().toISOString() : null,
});

export const useOptimisticToggleMuteNotification = (options: UseOptimisticToggleMuteNotificationOptions) => {
    const { notificationId, onError } = options;

    const { toggleMute } = usePostToggleMuteNotification({ notificationId });

    const { optimisticToggle: optimisticToggleMute } = useOptimisticToggleNotificationStatus({
        onError,
        notificationId,
        toggleNotification: toggleMute,
        optimisticUpdateNotification,
    });

    return { optimisticToggleMute };
};
