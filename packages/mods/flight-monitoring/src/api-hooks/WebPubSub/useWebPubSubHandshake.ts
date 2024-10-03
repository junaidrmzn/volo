import { useToast } from "@volocopter/design-library-react";
import type { GroupConnectionRequest } from "@voloiq-typescript-api/flight-monitoring-types";
import type { AxiosError } from "@voloiq/service";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { useFlightMonitoringTranslation } from "../../translations/useFlightMonitoringTranslation";
import { BIRD_MONITORING, FLIGHT_MONITORING } from "../serviceEndpoints";

export const useWebPubSubHandshake = () => {
    const toast = useToast();
    const { t } = useFlightMonitoringTranslation();
    const flightMonitoringBackendUrl = `${BACKEND_BASE_URL}${FLIGHT_MONITORING}`;
    const birdMonitoringBackendUrl = `${BACKEND_BASE_URL}${BIRD_MONITORING}`;

    const getWebpubsubAccessToken = async () => {
        const accessTokenBackendUrl = `${flightMonitoringBackendUrl}/negotiate`;
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .get(accessTokenBackendUrl, {
                paramsSerializer,
                withCredentials: true,
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.accessToken"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };

    const getBirdMonitoringAccessToken = async () => {
        const accessTokenBackendUrl = `${birdMonitoringBackendUrl}/bird-negotiate`;
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .get(accessTokenBackendUrl, {
                paramsSerializer,
                withCredentials: true,
            })
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.accessTokenBird"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };

    const requestJoinBirdMonitoringGroup = async (request: GroupConnectionRequest) => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .post(
                `${birdMonitoringBackendUrl}/request-join-bird-group`,
                {
                    ...request,
                },
                {
                    paramsSerializer,
                    withCredentials: true,
                }
            )
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.joinGroup"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };

    const requestLeaveBirdMonitoringGroup = async (request: GroupConnectionRequest) => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .post(
                `${birdMonitoringBackendUrl}/request-leave-bird-group`,
                {
                    ...request,
                },
                {
                    paramsSerializer,
                    withCredentials: true,
                }
            )
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.leaveGroup"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const requestJoinGroup = async (request: GroupConnectionRequest) => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .post(
                `${flightMonitoringBackendUrl}/request-join-group`,
                {
                    ...request,
                },
                {
                    paramsSerializer,
                    withCredentials: true,
                }
            )
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.joinGroup"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };

    const requestLeaveGroup = async (request: GroupConnectionRequest) => {
        // eslint-disable-next-line deprecation/deprecation
        const { data } = await axiosInstance
            .post(
                `${flightMonitoringBackendUrl}/request-leave-group`,
                {
                    ...request,
                },
                {
                    paramsSerializer,
                    withCredentials: true,
                }
            )
            .catch((error: AxiosError) => {
                if (error.response && error.response.data) {
                    toast({ title: t("error"), description: t("errors.webPubSub.leaveGroup"), status: "error" });
                }
                return { data: "" };
            });
        return data;
    };

    return {
        getWebpubsubAccessToken,
        requestJoinGroup,
        requestLeaveGroup,
        getBirdMonitoringAccessToken,
        requestJoinBirdMonitoringGroup,
        requestLeaveBirdMonitoringGroup,
    };
};
