import { useToast } from "@volocopter/design-library-react";
import { useCallback, useMemo } from "react";
import type { DeleteMachineOptions } from "./state-machine/deleteMachineBuilder";
import { useResourceDeleteTranslations } from "./translations/useResourceDeleteTranslations";

export type useDeleteMachineNotificationsProps = {
    bodyText?: string;
    headerText?: string;
    resourceLabel: string;
};

export const useDeleteMachineNotifications = (props: useDeleteMachineNotificationsProps): DeleteMachineOptions => {
    const { bodyText, headerText, resourceLabel } = props;
    const { t, i18n } = useResourceDeleteTranslations();
    const toast = useToast();

    const sendSuccessNotification = useCallback(
        () =>
            toast({
                title: headerText || t("Success"),
                description:
                    bodyText ||
                    t("Resource deleted", {
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

    return useMemo(
        () => ({
            sendSuccessNotification,
            sendBackendGenericErrorNotification,
        }),
        [sendBackendGenericErrorNotification, sendSuccessNotification]
    );
};
