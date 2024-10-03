import { useGetRouteTemplates } from "@voloiq/flight-planning-api/v1";
import type { RouteTemplateSortParams } from "./types";

export const useGetRouteTemplatesBtoA = (
    sortParams: RouteTemplateSortParams,
    filterParams: Record<string, string | number>,
    departureVertiportId: number,
    arrivalVertiportId: number
) => {
    const params = {
        orderBy: `${sortParams.orderBy}:${sortParams.order}`,
        departureExternalVertiport: arrivalVertiportId,
        arrivalExternalVertiport: departureVertiportId,
        ...filterParams,
    };
    const enabled = !!(departureVertiportId && arrivalVertiportId);
    const routeTemplateQuery = useGetRouteTemplates(enabled, params);

    return routeTemplateQuery.data || [];
};
