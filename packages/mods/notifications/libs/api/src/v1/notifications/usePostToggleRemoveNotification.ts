import type { AxiosRequestConfig, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { useService } from "@voloiq/service";

export type UsePostToggleRemoveNotificationOptions = {
    notificationId: string;
};

export type PostToggleRemoveNotificationBody = {
    status: boolean;
};

export type PostToggleRemoveNotificationRequest = AxiosRequestConfig<PostToggleRemoveNotificationBody> | undefined;

export const usePostToggleRemoveNotification = (options: UsePostToggleRemoveNotificationOptions) => {
    const { notificationId } = options;
    const { axiosInstance, baseUrl } = useService();

    const toggleRemove = async (config: PostToggleRemoveNotificationRequest): Promise<{} | undefined> => {
        const {
            data: { data },
            // We cannot use the useCreate hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.post<
            ResponseEnvelope<{}>,
            AxiosResponse<ResponseEnvelope<{}>>,
            PostToggleRemoveNotificationBody
        >(`${baseUrl}/notification/v1/notifications/${notificationId}/toggle-remove`, config?.data, {
            ...config,
            withCredentials: true,
        });

        return data;
    };

    return { toggleRemove };
};
