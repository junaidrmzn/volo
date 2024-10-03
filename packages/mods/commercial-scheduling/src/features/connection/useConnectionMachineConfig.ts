import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Connection, useGetRegionsQuery } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilters } from "./filter/useGetAllFilters";
import { useConnectionTranslation } from "./translations/useConnectionTranslation";
import { useConnectionOverviewPage } from "./useConnectionOverviewPage";

export const useConnectionMachineConfig = () => {
    const { t } = useConnectionTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["Connection"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Connection"]);
    const canCreate = useIsAuthorizedTo(["create"], ["Connection"]);
    const { regions, isLoading } = useGetRegionsQuery();
    const { getAllFilters } = useGetAllFilters();
    const { fetchAllConnections, fetchConnection } = useConnectionOverviewPage();

    const PAGE_SIZE = 10;

    return useMemo(() => {
        if (isLoading) return { isLoading };

        const connectionMachineConfig = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<Connection>({
                fetchAllResources: fetchAllConnections,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("overview.subheading"),
                getModuleTitle: () => t("overview.heading"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withSort({
                sortingOptions: [
                    {
                        label: t("model.name"),
                        id: "name",
                    },
                    {
                        label: t("model.title"),
                        id: "title",
                    },
                    {
                        label: t("model.subtitle"),
                        id: "subtitle",
                    },
                    {
                        label: t("model.region"),
                        id: "region",
                    },
                    {
                        label: t("sort.validFrom"),
                        id: "validFrom",
                    },
                    {
                        label: t("sort.validTo"),
                        id: "validTo",
                    },
                ],
            })
            .withFilterBar({
                getAllFilters: () => getAllFilters(regions),
            })
            .withAdd()
            .withEdit()
            .withPreview<Connection>({
                fetchPreviewResource: fetchConnection,
                getPreviewTitle: (connection) => connection.name,
            })
            .build();

        return { connectionMachineConfig, isLoading };
    }, [isLoading, canCreate, canRead, canUpdate, fetchAllConnections, t, getAllFilters, regions, fetchConnection]);
};
