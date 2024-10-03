import { ReactNode } from "react";
import { useRealtimeNotifications } from "./useRealtimeNotifications";

export type RealtimeNotificationProviderProps = {
    children: ReactNode;
};

export const RealtimeNotificationProvider = (props: RealtimeNotificationProviderProps) => {
    const { children } = props;

    useRealtimeNotifications();

    return <>{children}</>;
};
