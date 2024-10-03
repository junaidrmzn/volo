import { useEffect, useState } from "react";
import { RouteTemplate } from "@voloiq/flight-planning-api/v1";
import { useRefocusMap } from "@voloiq/map";

export const useRouteTemplatePreview = () => {
    const [previewedTemplate, setPreviewedTemplate] = useState<RouteTemplate | undefined>(undefined);
    const { refocusMap } = useRefocusMap();

    const onSelectRouteTemplatePreview = (routeTemplate: RouteTemplate | undefined) => {
        setPreviewedTemplate((previousRouteTemplate) => {
            if (routeTemplate && previousRouteTemplate && previousRouteTemplate.id === routeTemplate.id) {
                return undefined;
            }
            return routeTemplate;
        });
    };

    const resetRouteTemplatePreview = () => {
        setPreviewedTemplate(undefined);
    };

    useEffect(() => {
        if (previewedTemplate) return;
        refocusMap("waypointTemplates", []);
    }, [previewedTemplate, refocusMap]);

    return { previewedTemplate, onSelectRouteTemplatePreview, resetRouteTemplatePreview };
};
