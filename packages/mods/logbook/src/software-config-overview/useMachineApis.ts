import { useCallback } from "react";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import {
    useDeleteSoftwareConfiguration,
    useGetSoftwareConfigurationManual,
    useGetSoftwareConfigurationsManual,
} from "../libs/software-configuration/useSoftwareConfiguration";

export const useMachineApis = () => {
    const { sendRequestById } = useDeleteSoftwareConfiguration();
    const { refetchDataWithResponseEnvelope } = useGetSoftwareConfigurationManual();
    const { sendRequestWithResponseEnvelope } = useGetSoftwareConfigurationsManual();

    const deleteSoftwareConfig = useCallback(
        (resourceId: string) =>
            new Promise<void>((resolve, reject) => {
                sendRequestById(resourceId)
                    .then(() => resolve())
                    .catch(() => reject());
            }),
        [sendRequestById]
    );

    const softwareConfigUrl = "software-configs";

    const fetchSoftwareConfig = useCallback(
        (resourceId: string) => refetchDataWithResponseEnvelope({ url: `/${softwareConfigUrl}/${resourceId}` }),
        [refetchDataWithResponseEnvelope, softwareConfigUrl]
    );

    const fetchAllSoftwareConfigs = useCallback(
        (options: FetchAllResourceOptions<SoftwareConfig>) => {
            const { page, size, sortingConfiguration } = options;
            return sendRequestWithResponseEnvelope({
                params: {
                    size,
                    page,
                    ...(sortingConfiguration
                        ? {
                              orderBy: `${
                                  sortingConfiguration.selectedOption
                              }:${sortingConfiguration.selectedOrder.toLowerCase()}`,
                          }
                        : {}),
                },
            });
        },
        [sendRequestWithResponseEnvelope]
    );

    return { deleteSoftwareConfig, fetchSoftwareConfig, fetchAllSoftwareConfigs };
};
