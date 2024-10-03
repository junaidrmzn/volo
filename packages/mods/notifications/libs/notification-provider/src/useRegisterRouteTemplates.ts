import { useLayoutEffect } from "react";
import { RouteTemplate } from "./NotificationContext";
import { useNotificationContext } from "./useNotificationContext";

export type UseRegisterRouteTemplatesOptions = {
    routeTemplates: RouteTemplate[];
};
export const useRegisterRouteTemplates = (options: UseRegisterRouteTemplatesOptions) => {
    const { routeTemplates } = options;
    const { registerRouteTemplates, unregisterRouteTemplates } = useNotificationContext();

    useLayoutEffect(() => {
        registerRouteTemplates(routeTemplates);

        return () => {
            const entityTypes = routeTemplates.map((routeTemplate) => routeTemplate.entityType);
            unregisterRouteTemplates(entityTypes);
        };
    });
    return { registerRouteTemplates };
};
