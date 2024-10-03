import { createContext } from "react";

export type GetRouteHandler = (entityId: string) => string;
export type RouteTemplate = {
    entityType: string;
    getEntityRoute: GetRouteHandler;
};
export type RegisterRouteTemplatesHandler = (routeTemplates: RouteTemplate[]) => void;
export type UnregisterRouteTemplatesHandler = (entityTypes: string[]) => void;
export type NavigateToEntityHandler = (entityType: string, entityId: string) => void;
export type IsNavigationPossibleHandler = (entityType: string) => boolean;
export type NotificationContextType = {
    registerRouteTemplates: RegisterRouteTemplatesHandler;
    unregisterRouteTemplates: UnregisterRouteTemplatesHandler;
    navigateToEntity: NavigateToEntityHandler;
    isNavigationPossible: IsNavigationPossibleHandler;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
