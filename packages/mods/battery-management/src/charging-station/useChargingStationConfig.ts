import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import { useCallback, useMemo } from "react";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { BATTERY_MANAGEMENT } from "../api-hooks/serviceEndpoints";
import {
    useDeleteChargingStation,
    useGetChargingStation,
    useGetChargingStations,
} from "../api-hooks/useChargingStationService";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { isChargingStationDeletable } from "./isChargingStationDeletable";

export const useChargingStationOverviewConfig = () => {
    const { sendRequestWithResponseEnvelope } = useGetChargingStations();
    const { refetchDataWithResponseEnvelope } = useGetChargingStation();
    const { sendRequestById: sendDeleteChargingStationRequest } = useDeleteChargingStation();
    const { t } = useResourcesTranslation();
    const chargingStationRoute = `${BATTERY_MANAGEMENT}/charging-stations/`;

    const getAllChargingStations = useCallback(
        (options: FetchAllResourceOptions<ChargingStation>) => {
            const { page, size, sortingConfiguration } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    order: sortingConfiguration ? sortingConfiguration.selectedOrder : "DESC",
                    orderBy: sortingConfiguration ? sortingConfiguration.selectedOption : "createTime",
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const getChargingStation = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `${chargingStationRoute}${resourceId}` }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [refetchDataWithResponseEnvelope]
    );

    const deleteChargingStation = useCallback(
        (resourceId: string) =>
            new Promise<void>((resolve, reject) => {
                sendDeleteChargingStationRequest(resourceId)
                    .then(() => resolve())
                    .catch(() => reject());
            }),
        [sendDeleteChargingStationRequest]
    );

    const chargingStationConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => t("charging-station.overview.resourceLabel"),
            })
                .withList<ChargingStation>({
                    fetchAllResources: getAllChargingStations,
                    getListItemName: () => t("charging-station.overview.resourceLabel"),
                    getListTitle: () => t("charging-station.overview.listLabel"),
                    getModuleTitle: () => t("charging-station.overview.heading"),
                    pageSize: 10,
                    getListAriaLabel: () => t("charging-station.overview.listAriaLabel"),
                })
                .withPreview({
                    fetchPreviewResource: getChargingStation,
                    getPreviewTitle: () => t("charging-station.overview.resourceLabel"),
                    checkIfResourceIsDeletable: (chargingStation) => ({
                        isResourceDeletable: isChargingStationDeletable(chargingStation.nrSlots),
                        notDeletableReason: t("charging-station.overview.deleteableHint"),
                    }),
                })
                .withDelete<ChargingStation>({
                    deleteResource: deleteChargingStation,
                    getDeleteTexts: (chargingStation) => ({
                        confirmationModal: {
                            headerText: t("generic.delete-modal.heading", { entityName: chargingStation.name }),
                            bodyText: t("generic.delete-modal.body-with-id", {
                                entityName: chargingStation.name,
                                entityId: chargingStation.id,
                            }),
                            deleteButtonText: t("generic.delete-modal.delete"),
                            cancelButtonText: t("generic.delete-modal.cancel"),
                        },
                        deleteButtonText: t("generic.delete-modal.delete"),
                    }),
                })
                .withAdd()
                .withEdit()
                .build(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [deleteChargingStation, getAllChargingStations, getChargingStation]
    );

    return {
        chargingStationConfig,
    };
};
