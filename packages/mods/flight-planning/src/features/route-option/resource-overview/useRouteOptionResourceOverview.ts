import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useNavigate } from "@voloiq/routing";
import { useFlightPlanningTranslation } from "../../../translations";
import {
    useDeleteRouteOption,
    useGetAllRouteOptions,
    useGetRouteOption,
    useGetRoutesByRouteOptionId,
} from "../api-hooks";
// NOTE: Filtering is outscoped of vfp-704
// import { useGetFilters } from "./filter";
import type { RouteOptionResource } from "./types";

export const useRouteOptionResourceOverview = () => {
    const { t } = useFlightPlanningTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["RouteOptions"]);
    const canRead = useIsAuthorizedTo(["read"], ["RouteOptions"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["RouteOptions"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["RouteOptions"]);

    // NOTE: Filtering is outscoped of vfp-704
    // const { getAllFilters, getAllFiltersAsync } = useGetFilters();
    const navigate = useNavigate();

    const { getAllRouteOptions } = useGetAllRouteOptions();
    const { getRouteOption } = useGetRouteOption();
    const { getRoutesByRouteOptionId } = useGetRoutesByRouteOptionId();
    const { deleteRouteOption } = useDeleteRouteOption();

    const handleOpenRouteOptionOverview = (routeOption: RouteOptionResource) => {
        getRoutesByRouteOptionId(routeOption.id).then((routes) => {
            if (!routes || routes.length === 0) navigate(`${routeOption.id}/map`);
            navigate(`${routeOption.id}/map/?${routes.map((r) => `displayedRoutes=${r.id}`).join("&")}`);
        });
    };

    const routeOptionResourceMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canRead,
                canUpdate,
                canDelete,
                getResourceName: () => "RouteOptions",
            })
                .withList<RouteOptionResource>({
                    fetchAllResources: getAllRouteOptions,
                    pageSize: 10,
                    getModuleTitle: () => t("routeOption.routeOptionsList.moduleTitle"),
                    getListTitle: () => t("routeOption.routeOptionsList.listTitle"),
                    getListItemName: () => t("routeOption.resourceLabel"),
                    getListAriaLabel: () => t("routeOption.resourceAriaLabel"),
                })
                .withPreview<RouteOptionResource>({
                    fetchPreviewResource: getRouteOption,
                    getPreviewTitle: (routeOption: RouteOptionResource) => routeOption.name,
                })
                .withDelete({
                    deleteResource: deleteRouteOption,
                    getDeleteTexts: () => ({
                        confirmationModal: {
                            headerText: t("common.delete"),
                            bodyText: t("routeOption.routeOptionsList.confirmDelete"),
                        },
                    }),
                })
                .withAdd()
                // NOTE: Filtering is outscoped of vfp-704
                // .withFilter({
                //     getAllFilters,
                //     getAllFiltersAsync,
                // })
                .withSort({
                    sortingOptions: [
                        {
                            label: t("routeOption.properties.name"),
                            id: "name",
                        },
                        {
                            label: t("routeOption.properties.aircraftType"),
                            id: "aircraftType",
                        },
                        {
                            label: t("routeOption.properties.validForOperation"),
                            id: "validForOperation",
                        },
                    ],
                })
                .build(),
        [canCreate, canDelete, canRead, canUpdate, t]
    );
    return { routeOptionResourceMachineConfig, handleOpenRouteOptionOverview };
};
