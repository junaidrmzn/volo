import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "./QueryClientProvider";
import { NotificationButton } from "./notification-button/NotificationButton";
import { RealtimeNotificationProvider } from "./realtime-notification-provider/RealtimeNotificationProvider";

export const App = () => {
    const notificationLoggingOptions = {
        teamName: "Overarching Topics",
        serviceName: "notification.ui",
    };
    return (
        <ServiceProvider baseUrl={BACKEND_BASE_URL} logging={notificationLoggingOptions} withAuth>
            <QueryClientProvider>
                <RealtimeNotificationProvider>
                    <NotificationButton />
                </RealtimeNotificationProvider>
            </QueryClientProvider>
        </ServiceProvider>
    );
};
