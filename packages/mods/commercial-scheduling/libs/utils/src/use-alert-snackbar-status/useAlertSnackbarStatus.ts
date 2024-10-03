import { match } from "ts-pattern";
import { PlanConnectionsState } from "@voloiq/commercial-scheduling-api/v1";
import { useAlertSnackbarTranslation } from "./translations/useAlertSnackbarTranslation";

export type AlertSnackBarProps = {
    status: PlanConnectionsState;
};

export const useAlertSnackbarStatus = (options: AlertSnackBarProps) => {
    const { status } = options;
    const { t } = useAlertSnackbarTranslation();

    return match(status)
        .with("ALL_INCONSISTENT", () => ({
            backgroundColor: "semanticErrorSubtle" as const,
            heading: t("ErrorTitle"),
            description: t("ErrorDescription"),
            icon: "error" as const,
        }))
        .with("SOME_INCONSISTENT", () => ({
            backgroundColor: "semanticWarningSubtle" as const,
            heading: t("WarningTitle"),
            description: t("WarningPluralDescription"),
            icon: "warning" as const,
        }))
        .with("ONE_INCONSISTENT", () => ({
            backgroundColor: "semanticWarningSubtle" as const,
            heading: t("WarningTitle"),
            description: t("WarningSingularDescription"),
            icon: "warning" as const,
        }))
        .otherwise(() => ({
            backgroundColor: "",
            heading: "",
            description: "",
            icon: "error" as const,
        }));
};
