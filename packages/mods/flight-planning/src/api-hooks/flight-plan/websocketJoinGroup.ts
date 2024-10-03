import type { JoinGroupRequest, WebsocketNegotiate } from "@voloiq-typescript-api/flight-planning-types";
import type { ResponseEnvelope } from "@voloiq/service";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { FLIGHT_PLANNING } from "../serviceEndpoints";

export const websocketJoinGroup = async (data: JoinGroupRequest) => {
    // eslint-disable-next-line deprecation/deprecation
    await axiosInstance.post<ResponseEnvelope<WebsocketNegotiate>>(
        `${BACKEND_BASE_URL}${FLIGHT_PLANNING}/flight-plans/web-socket/join-group`,
        data,
        {
            paramsSerializer,
            withCredentials: true,
        }
    );
};
