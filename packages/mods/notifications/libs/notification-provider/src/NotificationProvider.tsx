import { ReactNode } from "react";
import { NotificationContext } from "./NotificationContext";
import { useNotificationProvider } from "./useNotificationProvider";

export type NotificationProviderProps = {
    children: ReactNode;
};
export const NotificationProvider = (props: NotificationProviderProps) => {
    const { children } = props;

    const { navigateToEntity, registerRouteTemplates, unregisterRouteTemplates, isRouteTemplateRegistered } =
        useNotificationProvider();

    return (
        <NotificationContext.Provider
            value={{
                navigateToEntity,
                registerRouteTemplates,
                unregisterRouteTemplates,
                isNavigationPossible: isRouteTemplateRegistered,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
