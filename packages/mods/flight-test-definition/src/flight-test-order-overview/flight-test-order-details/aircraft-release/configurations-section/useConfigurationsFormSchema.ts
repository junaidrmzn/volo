import { useMemo } from "react";
import { boolean, object, string } from "@voloiq/form";
import { useConfigurationsSectionTranslation } from "./translations/useConfigurationsSectionTranslation";

export const useConfigurationsFormSchema = () => {
    const { t } = useConfigurationsSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                type: string().label(t("Configuration")),
                required: string().label(t("Required")),
                status: string().label(t("Status")),
                accept: boolean().label(t("Accept?")),
                commentOnDeviation: string().label(t("Comment to Deviations")),
            }),
        [t]
    );

    return { formSchema };
};

export type ConfigurationsFormSchema = ReturnType<typeof useConfigurationsFormSchema>["formSchema"];
