import { NotificationCard as DesignLibraryNotificationCard } from "@volocopter/design-library-react";
import { P, match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import { useNavigateToEntity } from "@voloiq/notification-provider";
import {
    Notification,
    useOptimisticToggleMuteNotification,
    useOptimisticToggleRemoveNotification,
} from "@voloiq/notifications-api/v1";
import {
    NotificationPopoverTranslationFunction,
    useNotificationPopoverTranslation,
} from "./translations/useNotificationPopoverTranslation";
import { useToggleReadStatusOnUnmount } from "./useToggleReadStatusOnUnmount";

export type NotificationCardProps = {
    notification: Notification;
};

const getTimePosted = (timestamp: number, t: NotificationPopoverTranslationFunction) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const diff = currentTime - Math.floor(timestamp / 1000);

    if (diff < 60) {
        return "Just now";
    }
    if (diff < 60 * 60) {
        const minutes = Math.floor(diff / 60);
        return minutes > 1 ? t("{minutes} minutes ago", { minutes }) : t("1 minute ago");
    }
    if (diff < 60 * 60 * 24) {
        const hours = Math.floor(diff / (60 * 60));
        return hours > 1 ? t("{hours} hours ago", { hours }) : t("1 hour ago");
    }
    if (diff < 60 * 60 * 24 * 30) {
        const days = Math.floor(diff / (60 * 60 * 24));
        return days > 1 ? t("{days} days ago", { days }) : t("1 day ago");
    }
    return t("Longer ago");
};

export const NotificationCard = (props: NotificationCardProps) => {
    const { notification } = props;
    const { t } = useNotificationPopoverTranslation();
    const { formatDateTime } = useFormatDateTime();
    const { optimisticToggleMute } = useOptimisticToggleMuteNotification({ notificationId: notification.id });
    const { optimisticToggleRemove } = useOptimisticToggleRemoveNotification({ notificationId: notification.id });
    useToggleReadStatusOnUnmount({ notification });
    const { navigateToEntity, isNavigationPossible } = useNavigateToEntity();

    const statusText = match(notification)
        .with({ resolvedBy: P.not(null) }, () =>
            t("resolved by {resolverName} {resolvedTime}", {
                resolverName: notification.resolvedBy,
                resolvedTime: notification.resolvedAt ? formatDateTime(notification.resolvedAt) : "",
            })
        )
        .with({ read: true }, () => t("open"))
        .otherwise(() => t("new"));

    const status = match(notification.severity)
        .with("INFO", () => "info" as const)
        .with("WARNING", () => "warning" as const)
        .with("ERROR", () => "error" as const)
        .with("UNKNOWN", () => "unknown" as const)
        .exhaustive();

    const isMuted = notification.muted;
    const isResolved = notification.resolvedBy !== null;
    const isNew = !notification.read && !isResolved;

    const muteableProps = match(notification)
        .when(
            (notification) => notification.resolvedBy === null,
            () =>
                ({
                    isMutable: true,
                    isMuted,
                    muteButtonAriaLabel: isMuted ? t("Unmute") : t("Mute"),
                    onToggleMuteState: () => optimisticToggleMute({ data: { status: !notification.muted } }),
                } as const)
        )
        .otherwise(() => ({}));

    const isNavigatable = notification.entityType !== null && isNavigationPossible(notification.entityType);
    const navigatableProps = isNavigatable
        ? ({
              isNavigatable: true,
              navigationButtonAriaLabel: t("Navigate to {entity}", { entity: notification.entityType }),
              onNavigate: () => {
                  if (notification.entityType) {
                      navigateToEntity(notification.entityType, notification.entityUuid);
                  }
              },
          } as const)
        : {};

    const deletableProps = match(notification)
        .when(
            (notification) => notification.resolvedBy !== null || notification.severity === "UNKNOWN",
            () => ({
                isDeletable: true,
                deleteButtonAriaLabel: t("Delete"),
                onDelete: () => optimisticToggleRemove({ data: { status: true } }),
            })
        )
        .otherwise(() => ({}));

    return (
        <DesignLibraryNotificationCard
            title={notification.title}
            content={notification.message}
            helpText={`${notification.sender} • ${getTimePosted(new Date(notification.createdAt).getTime(), t)}`}
            footerText={statusText}
            status={status}
            isResolved={isResolved}
            isNew={isNew}
            icon={notification.severity === "ERROR" ? "exclamationInTriangleFilled" : "exclamationInCircleFilled"}
            {...muteableProps}
            {...navigatableProps}
            {...deletableProps}
        />
    );
};
