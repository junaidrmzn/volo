import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import { useCallback, useMemo } from "react";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "../api-hooks/serviceEndpoints";
import {
    useDeleteChargingStationSlot,
    useGetChargingStationSlot,
    useGetChargingStationSlots,
} from "../api-hooks/useChargingStationSlotService";
import { useErrorToast } from "../hooks";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

export const useChargingStationSlotOverviewConfig = () => {
    const { sendRequestWithResponseEnvelope } = useGetChargingStationSlots();
    const { refetchDataWithResponseEnvelope } = useGetChargingStationSlot();
    const { sendRequestById: sendDeleteChargingStationSlotRequest } = useDeleteChargingStationSlot();
    const { t } = useResourcesTranslation();
    const { onError } = useErrorToast();

    const chargingStationSlotRoute = `${BATTERY_MANAGEMENT}/charging-station-slots/`;

    const getAllChargingStationSlots = useCallback(
        (options: FetchAllResourceOptions<ChargingStationSlot>) => {
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

    const getChargingStationSlot = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `${chargingStationSlotRoute}${resourceId}` }),
        [chargingStationSlotRoute, refetchDataWithResponseEnvelope]
    );

    const deleteChargingStationSlot = useCallback(
        (resourceId: string) =>
            new Promise<void>((resolve) => {
                sendDeleteChargingStationSlotRequest(resourceId)
                    .then(() => resolve())
                    .catch((error: AxiosError<ResponseEnvelope<ChargingStationSlot>>) => {
                        if (error.response && error.response.data.error) {
                            onError(error.response.data.error);
                        }
                    });
            }),
        [onError, sendDeleteChargingStationSlotRequest]
    );

    const chargingStationSlotOverviewConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => t("charging-station-slot.overview.resourceLabel"),
            })
                .withList<ChargingStationSlot>({
                    fetchAllResources: getAllChargingStationSlots,
                    getListItemName: () => t("charging-station-slot.overview.resourceLabel"),
                    getListTitle: () => t("charging-station-slot.overview.listLabel"),
                    getModuleTitle: () => t("charging-station-slot.overview.heading"),
                    pageSize: 10,
                    getListAriaLabel: () => t("charging-station-slot.overview.listAriaLabel"),
                })
                .withPreview({
                    fetchPreviewResource: getChargingStationSlot,
                    getPreviewTitle: () => t("charging-station-slot.overview.resourceLabel"),
                })
                .withDelete<ChargingStationSlot>({
                    deleteResource: deleteChargingStationSlot,
                    getDeleteTexts: (chargingStationSlot) => ({
                        confirmationModal: {
                            headerText: t("generic.delete-modal.heading", { entityName: chargingStationSlot.name }),
                            bodyText: t("generic.delete-modal.body-with-id", {
                                entityName: chargingStationSlot.name,
                                entityId: chargingStationSlot.id,
                            }),
                            deleteButtonText: t("generic.delete-modal.delete"),
                            cancelButtonText: t("generic.delete-modal.cancel"),
                        },
                        deleteButtonText: t("generic.delete-modal.delete"),
                    }),
                })
                .withSort({
                    sortingOptions: [
                        {
                            label: t("charging-station-slot.model.validFrom"),
                            id: "validFrom",
                        },
                        {
                            label: t("charging-station-slot.model.validTo"),
                            id: "validTo",
                        },
                        {
                            label: t("charging-station-slot.model.status"),
                            id: "chargingStationSlotStatus",
                        },
                    ],
                })

                .withAdd()
                .withEdit()
                .build(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [deleteChargingStationSlot, getAllChargingStationSlots, getChargingStationSlot]
    );

    return {
        chargingStationSlotOverviewConfig,
    };
};
