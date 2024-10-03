import type { WebsocketNegotiate } from "@voloiq-typescript-api/flight-planning-types";
import type { ResponseEnvelope } from "@voloiq/service";
import { axiosInstance, paramsSerializer } from "@voloiq/service";
import { FLIGHT_PLANNING } from "../serviceEndpoints";

export const websocketNegotiate = async () => {
    // eslint-disable-next-line deprecation/deprecation
    const { data } = await axiosInstance.get<ResponseEnvelope<WebsocketNegotiate>>(
        `${BACKEND_BASE_URL}${FLIGHT_PLANNING}/flight-plans/web-socket/negotiate`,
        {
            paramsSerializer,
            withCredentials: true,
        }
    );
    return data.data;
};
