import type { AxiosRequestConfig, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { useService } from "@voloiq/service";

export type UsePostToggleMuteNotificationOptions = {
    notificationId: string;
};

export type PostToggleMuteNotificationBody = {
    status: boolean;
};

export type PostToggleMuteNotificationRequest = AxiosRequestConfig<PostToggleMuteNotificationBody> | undefined;

export const usePostToggleMuteNotification = (options: UsePostToggleMuteNotificationOptions) => {
    const { notificationId } = options;
    const { axiosInstance, baseUrl } = useService();

    const toggleMute = async (config: PostToggleMuteNotificationRequest): Promise<{} | undefined> => {
        const {
            data: { data },
            // We cannot use the useCreate hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.post<
            ResponseEnvelope<{}>,
            AxiosResponse<ResponseEnvelope<{}>>,
            PostToggleMuteNotificationBody
        >(`${baseUrl}/notification/v1/notifications/${notificationId}/toggle-mute`, config?.data, {
            ...config,
            withCredentials: true,
        });

        return data;
    };

    return { toggleMute };
};
