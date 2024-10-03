export type Notification = {
    id: string;
    createdAt: string;
    entityType: string | null;
    entityUuid: string;
    resolvable: boolean;
    resolvedBy: string | null;
    resolvedAt: string | null;
    severity: "INFO" | "WARNING" | "ERROR" | "UNKNOWN";
    language: string;
    sender: string;
    message: string;
    title: string;
    removed: boolean;
    removedAt: string | null;
    muted: boolean;
    mutedAt: string | null;
    read: boolean;
    readAt: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotification = (notification?: any): notification is Notification => {
    return (
        notification !== undefined &&
        typeof notification.id === "string" &&
        typeof notification.createdAt === "string" &&
        typeof notification.entityUuid === "string" &&
        typeof notification.resolvable === "boolean" &&
        typeof notification.severity === "string" &&
        ["INFO", "WARNING", "ERROR", "UNKNOWN"].includes(notification.severity) &&
        typeof notification.language === "string" &&
        typeof notification.sender === "string" &&
        typeof notification.message === "string" &&
        typeof notification.title === "string" &&
        (notification.removed === null || typeof notification.removed === "boolean") &&
        (notification.removedAt === null || typeof notification.removedAt === "boolean") &&
        (notification.muted === null || typeof notification.muted === "boolean") &&
        (notification.mutedAt === null || typeof notification.mutedAt === "boolean") &&
        (notification.read === null || typeof notification.read === "boolean")
    );
};
