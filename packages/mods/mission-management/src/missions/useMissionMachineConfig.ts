import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { Mission, useGetAircraftTypesQuery, useGetAircraftsQuery } from "@voloiq/network-schedule-management-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllRegions, useGetAllVertiports } from "../api-hooks/useNetworkSchedulingService";
import { useMissionBulkEdit } from "./bulk-edit";
import { useGetAllFilterProperties } from "./filters/useGetAllFilterProperties";
import { useMissionTranslations } from "./translations/useMissionTranslations";
import { useMissionOverviewPage } from "./useMissionOverviewPage";

export const useMissionMachineConfig = (pollingInterval: number) => {
    const { t } = useMissionTranslations();
    const { fetchAllMissions, bulkEditMission } = useMissionOverviewPage();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { missionBulkEditSchema } = useMissionBulkEdit();
    const { aircrafts, isLoading: isLoadingAircraft } = useGetAircraftsQuery();
    const { aircraftTypes, isLoading: isLoadingAircraftType } = useGetAircraftTypesQuery();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { data: regions } = useGetAllRegions();
    const { data: vertiports } = useGetAllVertiports();
    const canCreate = useIsAuthorizedTo(["create"], ["Mission"]);
    const canRead = useIsAuthorizedTo(["read"], ["Mission"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Mission"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Mission"]);

    return useMemo(() => {
        if (isLoadingAircraft || isLoadingAircraftType) return { isLoadingAircraft, isLoadingAircraftType };
        const missionMachineConfig = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete,
            getResourceName: () => t("Mission"),
        })
            .withList<Mission>({
                fetchAllResources: fetchAllMissions,
                pageSize: 10,
                getListTitle: () => t("missionList"),
                getModuleTitle: () => t("airOperations").toUpperCase(),
                getListItemName: (mission) => mission.id,
                pollingInterval: isFeatureFlagEnabled("vao-2357") ? pollingInterval : undefined,
            })
            .withAdd()
            .withFilterBar({
                getAllFilters: () => getAllFilterProperties({ aircrafts, aircraftTypes, regions, vertiports }),
            })
            .withBulkEdit<Mission>({
                getBulkEditTitle: () => t("Mission"),
                bulkEditResource: bulkEditMission,
                schema: missionBulkEditSchema,
            })
            .build();

        return { missionMachineConfig, isLoadingAircraft, isLoadingAircraftType };
    }, [
        isLoadingAircraft,
        isLoadingAircraftType,
        canCreate,
        canRead,
        canUpdate,
        canDelete,
        fetchAllMissions,
        bulkEditMission,
        missionBulkEditSchema,
        t,
        getAllFilterProperties,
        aircrafts,
        aircraftTypes,
        regions,
        vertiports,
    ]);
};
