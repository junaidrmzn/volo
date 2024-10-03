import { useToast } from "@volocopter/design-library-react";
import { useCallback, useMemo } from "react";
import type { BulkEditMachineNotificationOptions } from "./state-machine/bulkEditMachineBuilder";
import { useResourceBulkEditTranslations } from "./translations/useResourceBulkEditTranslations";

export type useBulkEditMachineNotificationsProps = {
    resourceLabel: string;
};

export const useBulkEditMachineNotifications = (
    props: useBulkEditMachineNotificationsProps
): BulkEditMachineNotificationOptions => {
    const { resourceLabel } = props;
    const { t, i18n } = useResourceBulkEditTranslations();
    const toast = useToast();

    const sendSuccessNotification = useCallback(
        () =>
            toast({
                title: t("Success"),
                description: t("Resource change saved", {
                    resource: resourceLabel,
                }),
                status: "success",
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [resourceLabel, i18n.language, toast]
    );

    const sendBackendGenericErrorNotification = useCallback(
        () => toast({ title: t("Error"), description: t("Something went wrong"), status: "error" }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language, toast]
    );

    const sendBackendFormErrorNotification = useCallback(
        () =>
            toast({ title: t("Error"), description: t("Some form fields are incorrect or invalid"), status: "error" }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language, toast]
    );

    const sendAlreadyExistsErrorNotification = useCallback(
        () =>
            toast({
                title: t("Error"),
                description: t("An entry with the given unique constraints already exists."),
                status: "error",
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language, toast]
    );

    return useMemo(
        () => ({
            sendSuccessNotification,
            sendBackendGenericErrorNotification,
            sendBackendFormErrorNotification,
            sendAlreadyExistsErrorNotification,
        }),
        [
            sendAlreadyExistsErrorNotification,
            sendBackendFormErrorNotification,
            sendBackendGenericErrorNotification,
            sendSuccessNotification,
        ]
    );
};
