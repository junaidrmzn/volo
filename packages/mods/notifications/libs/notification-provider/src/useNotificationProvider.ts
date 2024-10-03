import { useState } from "react";
import { useNavigate } from "@voloiq/routing";
import {
    GetRouteHandler,
    NavigateToEntityHandler,
    RegisterRouteTemplatesHandler,
    UnregisterRouteTemplatesHandler,
} from "./NotificationContext";

export const useNotificationProvider = () => {
    const [routeTemplates, setRouteTemplates] = useState<{ [entityType: string]: GetRouteHandler }>({});
    const navigateTo = useNavigate();

    const registerRouteTemplates: RegisterRouteTemplatesHandler = (newRouteTemplates) => {
        setRouteTemplates((routeTemplates) => {
            for (const newRouteTemplate of newRouteTemplates) {
                const { entityType, getEntityRoute } = newRouteTemplate;
                routeTemplates[entityType] = getEntityRoute;
            }
            return routeTemplates;
        });
    };

    const unregisterRouteTemplates: UnregisterRouteTemplatesHandler = (entityTypes) => {
        setRouteTemplates((routeTemplates) => {
            for (const entityType of entityTypes) {
                delete routeTemplates[entityType];
            }
            return routeTemplates;
        });
    };

    const navigateToEntity: NavigateToEntityHandler = (entityType, entityId) => {
        const routeTemplate = routeTemplates[entityType];

        if (!routeTemplate) {
            // TODO What do we do if no route template was registered?
            return;
        }

        const route = routeTemplate(entityId);
        navigateTo(route);
    };

    const isRouteTemplateRegistered = (entityType: string) => {
        return !!routeTemplates[entityType];
    };

    return { registerRouteTemplates, unregisterRouteTemplates, navigateToEntity, isRouteTemplateRegistered };
};
