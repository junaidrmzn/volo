import type { AxiosRequestConfig, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { useService } from "@voloiq/service";

export type UsePostToggleReadNotificationOptions = {
    notificationId: string;
};

export type PostToggleReadNotificationBody = {
    status: boolean;
};

export type PostToggleReadNotificationRequest = AxiosRequestConfig<PostToggleReadNotificationBody> | undefined;

export const usePostToggleReadNotification = (options: UsePostToggleReadNotificationOptions) => {
    const { notificationId } = options;
    const { axiosInstance, baseUrl } = useService();

    const toggleRead = async (config: PostToggleReadNotificationRequest): Promise<{} | undefined> => {
        const {
            data: { data },
            // We cannot use the useCreate hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.post<
            ResponseEnvelope<{}>,
            AxiosResponse<ResponseEnvelope<{}>>,
            PostToggleReadNotificationBody
        >(`${baseUrl}/notification/v1/notifications/${notificationId}/toggle-read`, config?.data, {
            ...config,
            withCredentials: true,
        });

        return data;
    };

    return { toggleRead };
};
