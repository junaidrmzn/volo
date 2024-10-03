import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "@voloiq/service";
import { Notification } from "./notification";
import { getNotificationsKey } from "./useGetAllNotificationsQuery";

type ToggleNotificationConfig = AxiosRequestConfig<{ status: boolean }> | undefined;

export type OptimisticUpdateNotificationHandler = (
    previousNotification: Notification,
    status: boolean
) => Notification | undefined;
export type UseOptimisticToggleNotificationStatusOptions = {
    toggleNotification: (config: ToggleNotificationConfig) => Promise<{} | undefined>;
    notificationId: string;
    onError?: () => void;
    optimisticUpdateNotification: OptimisticUpdateNotificationHandler;
};

export const useOptimisticToggleNotificationStatus = (options: UseOptimisticToggleNotificationStatusOptions) => {
    const { notificationId, onError, toggleNotification, optimisticUpdateNotification } = options;
    const queryClient = useQueryClient();
    const queryKey = getNotificationsKey();

    const { mutate: optimisticToggle } = useMutation<
        {} | undefined,
        unknown,
        ToggleNotificationConfig,
        { previousNotifications?: Notification[] }
    >({
        mutationFn: toggleNotification,
        onError: (_, __, context) => {
            if (context) {
                const { previousNotifications } = context;
                queryClient.setQueryData(queryKey, previousNotifications);
                onError?.();
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        },
        onMutate: async (toggleRequest) => {
            const previousNotifications = queryClient.getQueryData<Notification[]>(queryKey);
            const toggledStatus = toggleRequest?.data?.status;

            if (previousNotifications && toggledStatus !== undefined) {
                await queryClient.cancelQueries({ queryKey });
                const nextNotifications = previousNotifications
                    ?.map((notification) => {
                        if (notification.id === notificationId) {
                            return optimisticUpdateNotification(notification, toggledStatus);
                        }
                        return notification;
                    })
                    .filter(Boolean);
                queryClient.setQueryData(queryKey, nextNotifications);

                return { previousNotifications };
            }
            return {};
        },
    });

    return { optimisticToggle };
};
