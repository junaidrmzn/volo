import { useGetAllService } from "@voloiq/service";
import { Notification } from "./notification";

export type UseGetAllNotificationsOptions = {
    manual?: boolean;
};
export const useGetAllNotifications = (options: UseGetAllNotificationsOptions = {}) => {
    const { manual } = options;
    const { sendRequestWithResponseEnvelope } = useGetAllService<Notification>({
        route: "/notification/v1/notifications",
        options: {
            manual,
        },
    });

    return { getAllNotifications: sendRequestWithResponseEnvelope };
};
