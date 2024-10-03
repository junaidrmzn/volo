import { useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Notification, getNotificationsKey, useGetNegotiate } from "@voloiq/notifications-api/v1";
import { isAzureWebPubSubData } from "./azureWebPubSubData";
import { useNotificationResolvedToast } from "./useNotificationResolvedToast";

export const useRealtimeNotifications = () => {
    const { data: negotiate } = useGetNegotiate();
    const queryClient = useQueryClient();
    const { sendNotificationResolvedToast } = useNotificationResolvedToast();

    useLayoutEffect(() => {
        if (!negotiate) {
            return () => {};
        }
        const { url } = negotiate;
        const webSocket = new WebSocket(url, "json.webpubsub.azure.v1");
        webSocket.addEventListener("message", (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data);
            if (isAzureWebPubSubData(message)) {
                const { data: newNotification, type } = message;
                if (type === "message") {
                    queryClient.setQueriesData<Notification[]>(getNotificationsKey(), (previousNotifications = []) => {
                        let notificationExistedBefore = false;
                        const nextNotifications = previousNotifications
                            .map((previousNotification) => {
                                if (previousNotification.id === newNotification.id) {
                                    if (
                                        previousNotification.resolvedBy === null &&
                                        newNotification.resolvedBy !== null
                                    ) {
                                        sendNotificationResolvedToast(newNotification);
                                    }
                                    notificationExistedBefore = true;
                                    if (newNotification.removed) {
                                        return undefined;
                                    }
                                    return newNotification;
                                }
                                return previousNotification;
                            })
                            .filter(
                                (notification?: Notification): notification is Notification =>
                                    notification !== undefined
                            );

                        if (!notificationExistedBefore) {
                            nextNotifications.unshift(newNotification);
                        }

                        return nextNotifications;
                    });
                }
            }
        });

        return () => {
            webSocket.close();
        };
    });
};
