import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useFlightTestOrderMachineConfigTranslation } from "./translations/useFlightTestOrderMachineConfigTranslation";
import { useFetchAllFlightTestOrders } from "./useFetchAllFlightTestOrders";

export const useFlightTestOrderMachineConfig = () => {
    const { t } = useFlightTestOrderMachineConfigTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["FlightTestOrder"]);
    const canRead = useIsAuthorizedTo(["read"], ["FlightTestOrder"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["FlightTestOrder"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["FlightTestOrder"]);
    const { fetchAllFlightTestOrders } = useFetchAllFlightTestOrders();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const flightTestOrderMachineConfig = useMemo(() => {
        const baseMachineConfigBuilder = new ResourceMachineConfigBuilder({
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            getResourceName: () => t("Flight Test Order"),
        })
            .withList<FlightTestOrder>({
                fetchAllResources: fetchAllFlightTestOrders,
                getListTitle: () => (isFeatureFlagEnabled("vte-1596") ? t("Flight Test Orders (FTOs)") : t("Orders")),
                getListDescription: () => t("Description"),
                usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                getModuleTitle: () => t("Flight Test").toUpperCase(),
                getListItemName: (flightTestOrder) => flightTestOrder.missionTitle,
                pageSize: 100,
            })
            .withAdd({ getAddTitle: () => t("Create New Order") })
            .withFilterBar({ getAllFilters: getAllFilterProperties });

        return baseMachineConfigBuilder.build();
    }, [
        canCreate,
        canDelete,
        canRead,
        canUpdate,
        fetchAllFlightTestOrders,
        getAllFilterProperties,
        t,
        isFeatureFlagEnabled,
    ]);

    return { flightTestOrderMachineConfig };
};
