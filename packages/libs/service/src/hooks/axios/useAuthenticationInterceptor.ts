import type { AxiosRequestConfig } from "axios";
import { useAuthentication } from "@voloiq/auth";

export const useAuthenticationInterceptor = () => {
    const { getAccessToken } = useAuthentication();

    const authenticationInterceptor = async (request: AxiosRequestConfig) => {
        const mergedUrl = `${request.baseURL || ""}${request.url || ""}`;

        if (mergedUrl.startsWith(BACKEND_BASE_URL)) {
            const token = await getAccessToken();
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            };
        }
        return request;
    };

    return { authenticationInterceptor };
};
