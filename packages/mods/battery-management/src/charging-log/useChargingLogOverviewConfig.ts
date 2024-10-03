import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import { useCallback, useMemo } from "react";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { BATTERY_MANAGEMENT } from "../api-hooks/serviceEndpoints";
import { useGetChargingLog, useGetChargingLogs } from "../api-hooks/useChargingLogService";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

export const useChargingLogOverviewConfig = () => {
    const { sendRequestWithResponseEnvelope } = useGetChargingLogs();
    const { refetchDataWithResponseEnvelope } = useGetChargingLog();
    const { t } = useResourcesTranslation();
    const chargingLogRoute = `${BATTERY_MANAGEMENT}/charging-logs/`;

    const getAllChargingLogs = useCallback(
        (options: FetchAllResourceOptions<ChargingLog>) => {
            const { page, size, sortingConfiguration } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    orderBy: sortingConfiguration
                        ? `${sortingConfiguration.selectedOption}:${sortingConfiguration.selectedOrder}`
                        : "createTime",
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    const getChargingLog = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `${chargingLogRoute}${resourceId}` }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [refetchDataWithResponseEnvelope]
    );

    const chargingLogOverviewConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
                getResourceName: () => t("charging-log.overview.resourceLabel"),
            })
                .withList<ChargingLog>({
                    fetchAllResources: getAllChargingLogs,
                    getListItemName: () => t("charging-log.overview.resourceLabel"),
                    getListTitle: () => t("charging-log.overview.listLabel"),
                    getModuleTitle: () => t("charging-log.overview.heading"),
                    pageSize: 10,
                    getListAriaLabel: () => t("charging-log.overview.listAriaLabel"),
                })
                .withPreview({
                    fetchPreviewResource: getChargingLog,
                    getPreviewTitle: () => t("charging-log.overview.resourceLabel"),
                })
                .withSort({
                    sortingOptions: [
                        {
                            label: t("charging-log.model.eventTimestampStart"),
                            id: "eventTimestampStart",
                        },
                        {
                            label: t("charging-log.model.eventTimestampEnd"),
                            id: "eventTimestampEnd",
                        },
                    ],
                })
                .build(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getChargingLog]
    );

    return {
        chargingLogOverviewConfig,
    };
};
