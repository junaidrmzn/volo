import { useMemo } from "react";
import { date, object, string } from "@voloiq/form";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";

export const useGeneralInformationFormSchema = () => {
    const { t } = useGeneralInformationSectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                aircraftConfigurationStatus: string().label(t("Aircraft Configuration Status")),
                date: date().label(t("Date")),
                issuedApprovedLimitations: string().label(t("Issued approved Limitations")),
            }),
        [t]
    );

    return { formSchema };
};
