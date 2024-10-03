import { useQuery } from "@tanstack/react-query";
import { useGetAllNotifications } from "./useGetAllNotifications";

export const getNotificationsKey = () => ["notifications"];

export const useGetAllNotificationsQuery = () => {
    const { getAllNotifications } = useGetAllNotifications({ manual: true });

    const { data = [], isInitialLoading } = useQuery({
        queryKey: getNotificationsKey(),
        queryFn: () => getAllNotifications().then((data) => data.data),
    });

    const notificationsSortedByCreationDate = data.sort(
        (notificationA, notificationB) =>
            new Date(notificationB.createdAt).getTime() - new Date(notificationA.createdAt).getTime()
    );

    return { notifications: notificationsSortedByCreationDate, getAllNotifications, isLoading: isInitialLoading };
};
