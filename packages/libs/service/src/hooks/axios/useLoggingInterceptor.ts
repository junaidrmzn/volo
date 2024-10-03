import type { AxiosRequestConfig } from "axios";
import { useAuthentication } from "@voloiq/auth";

export const useLoggingInterceptor = () => {
    const { userId, sessionId } = useAuthentication();

    const loggingInterceptor = (request: AxiosRequestConfig) => {
        if (request.baseURL && request.baseURL.startsWith(BACKEND_BASE_URL)) {
            request.headers = {
                ...request.headers,
                "X-VOLO-CRMID": userId,
                "X-VOLO-USERID": userId,
                "X-VOLO-SESSIONID": sessionId,
            };
        }

        return request;
    };

    return { loggingInterceptor };
};
