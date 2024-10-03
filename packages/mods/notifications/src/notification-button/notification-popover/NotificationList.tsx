import { Skeleton, Text, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Notification } from "@voloiq/notifications-api/v1";
import { NotificationCard } from "./NotificationCard";

export type NotificationListProps = {
    isLoading?: boolean;
    notifications?: Notification[];
    noNotificationsMessage: string;
};

export const NotificationList = (props: NotificationListProps) => {
    const { notifications, isLoading = false, noNotificationsMessage } = props;

    return (
        <VStack height="sm" overflow="hidden" overflowY="scroll" width="full" alignItems="stretch">
            {match({ notifications, isLoading })
                .with({ isLoading: true }, () =>
                    // eslint-disable-next-line react/no-array-index-key
                    Array.from({ length: 3 }).map((_, index) => <Skeleton height={20} key={index} isLoading />)
                )
                .when(
                    (matcher) => matcher.notifications?.length,
                    // With the above predicate, the notifications cannot be undefined
                    () =>
                        notifications!.map((notification) => (
                            <NotificationCard notification={notification} key={notification.id} />
                        ))
                )
                .otherwise(() => (
                    <Text fontSize="xs" textAlign="center" my={4}>
                        {noNotificationsMessage}
                    </Text>
                ))}
        </VStack>
    );
};
