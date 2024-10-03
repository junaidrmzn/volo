import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { Log } from "@voloiq/logbook-api/v6";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useFiltersWithQuery } from "./filter/filter-query/useFiltersWithQuery";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useLogbookTranslation } from "./translations/useLogbookTranslation";
import { useOverviewService } from "./useOverviewService";

export const useLogbookMachineConfig = () => {
    const { t } = useLogbookTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["Log"]);
    const canRead = useIsAuthorizedTo(["read"], ["Log"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Log"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Log"]);

    const { fetchAllLogs, fetchLog, deleteLog } = useOverviewService();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { crewMembers, aircrafts, locations, isFilterLoading } = useFiltersWithQuery();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const logbookMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canRead,
                canUpdate,
                canDelete,
                getResourceName: () => t("resourceLabel"),
            })
                .withList<Log>({
                    fetchAllResources: fetchAllLogs,
                    getListItemName: () => "list.listItemName",
                    getListTitle: () => (isFeatureFlagEnabled("vte-1596") ? t("Logs") : t("overviewName")),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getModuleTitle: () => t("moduleName"),
                    pageSize: 10,
                    getListAriaLabel: () => t("list.listAriaLabel"),
                })
                .withDetails<Log>({
                    fetchDetailsResource: fetchLog,
                    getDetailsTitle: (log) =>
                        t("logDetails.header.title", {
                            productLine: log?.aircraft?.productLine,
                            aircraftType: log?.aircraft?.aircraftType,
                            aircraftMsn: log?.aircraft?.msn,
                        }),
                })
                .withPreview<Log>({
                    fetchPreviewResource: fetchLog,
                    getPreviewTitle: () => t("Log preview"),
                })
                .withDelete<Log>({
                    deleteResource: deleteLog,
                    getDeleteTexts: () => ({
                        confirmationModal: {
                            headerText: t("overview.deletionModal.header"),
                            bodyText: t("overview.deletionModal.body"),
                        },
                    }),
                })
                .withAdd()
                .withSort({
                    sortingOptions: [
                        {
                            label: t("sortingPanel.createTimeOption"),
                            id: "createTime",
                        },
                        {
                            label: t("sortingPanel.dateOption"),
                            id: "date",
                        },
                        {
                            label: t("sortingPanel.msn"),
                            id: "aircraft.msn",
                        },
                        {
                            label: t("sortingPanel.location"),
                            id: "location.icaoCode",
                        },
                        {
                            label: t("sortingPanel.flightDuration"),
                            id: "statistics.totalFlightDuration",
                        },
                        {
                            label: t("sortingPanel.maxAltitude"),
                            id: "statistics.maxAltitude",
                        },
                        {
                            label: t("sortingPanel.maxVelocity"),
                            id: "statistics.maxVelocity",
                        },
                    ],
                })
                .withFilterBar({
                    getAllFilters: () => getAllFilterProperties({ crewMembers, aircrafts, locations }),
                })
                .build(),
        [
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            crewMembers,
            deleteLog,
            fetchAllLogs,
            fetchLog,
            getAllFilterProperties,
            t,
            aircrafts,
            locations,
        ]
    );

    return {
        logbookMachineConfig,
        isFilterLoading,
    };
};
