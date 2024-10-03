import { RouteTemplate } from "@voloiq/flight-planning-api/v1";
import type { SortingOrder } from "@voloiq/sorting-panel";

export type RouteTemplateNavigationView = "List" | "Sort" | "Filter";
export type RouteTemplateSortParams = {
    orderBy?: string;
    order?: SortingOrder;
};

export type RouteTemplateNavigationSidebarContext = {
    onSelectRouteTemplatePreview: (routeTemplate: RouteTemplate | undefined) => void;
    previewedTemplate: RouteTemplate;
    closeRightSidebar: () => void;
};
