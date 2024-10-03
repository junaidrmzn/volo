import { useToast } from "@volocopter/design-library-react";
import { useCallback, useMemo } from "react";
import type { AddMachineOptions } from "./state-machine/addMachineBuilder";
import { useResourceAddTranslations } from "./translations/useResourceAddTranslations";

export type useAddMachineNotificationsProps = {
    resourceLabel: string;
    successToastLabelPrefix?: string;
};

export const useAddMachineNotifications = (props: useAddMachineNotificationsProps): AddMachineOptions => {
    const { resourceLabel, successToastLabelPrefix } = props;
    const { t, i18n } = useResourceAddTranslations();
    const toast = useToast();

    const sendSuccessNotification = useCallback(
        () =>
            toast({
                title: t("Success"),
                description: t("Resource created", {
                    resource: successToastLabelPrefix ? `${successToastLabelPrefix} ${resourceLabel}` : resourceLabel,
                }),
                status: "success",
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [resourceLabel, successToastLabelPrefix, i18n.language, toast]
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

    const sendAllFailedErrorNotification = useCallback(
        () =>
            toast({
                title: t("Error"),
                description: t("All resources failed", { resource: resourceLabel }),
                status: "error",
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language, toast]
    );

    const sendSomeFailedErrorNotification = useCallback(
        () =>
            toast({
                title: t("Error"),
                description: t("Some resource failed", { resource: resourceLabel }),
                status: "error",
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language, toast]
    );

    const sendDuplicateFormErrorNotification = useCallback(
        () =>
            toast({
                title: t("Create new request failed"),
                description: t("Please review the duplicated info"),
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
            sendAllFailedErrorNotification,
            sendSomeFailedErrorNotification,
            sendDuplicateFormErrorNotification,
        }),
        [
            sendAllFailedErrorNotification,
            sendAlreadyExistsErrorNotification,
            sendBackendFormErrorNotification,
            sendBackendGenericErrorNotification,
            sendSomeFailedErrorNotification,
            sendSuccessNotification,
            sendDuplicateFormErrorNotification,
        ]
    );
};
