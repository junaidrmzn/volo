import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, select, string, textEditor } from "@voloiq/form";
import { useGeneralInformationTranslation } from "./translations/useGeneralInformationTranslation";

export const useGeneralInformationFormSchema = () => {
    const { t } = useGeneralInformationTranslation();

    const formSchema = useMemo(
        () =>
            object({
                missionTitle: string().label(t("Mission Title")),
                flightNumber: string().label(t("Flt#")),
                flightTestCategory: select({
                    options: [
                        {
                            value: "Cat. 1",
                            label: t("Cat. 1"),
                        },
                        {
                            value: "Cat. 2",
                            label: t("Cat. 2"),
                        },
                    ],
                    placeholder: t("Please select"),
                    errorMessage: t("Please select a value"),
                }).label(t("Flight Test Category")),
                riskLevel: select({
                    options: [
                        {
                            value: "LOW",
                            label: t("Low"),
                        },
                        {
                            value: "MEDIUM",
                            label: t("Medium"),
                        },
                        {
                            value: "HIGH",
                            label: t("High"),
                        },
                        {
                            value: "VERY_HIGH",
                            label: t("Very High"),
                        },
                    ],
                    placeholder: t("Please select"),
                    errorMessage: t("Please select a value"),
                }).label(t("Risk Classification")),
                missionObjective: textEditor({ createImageSource: fileToBase64 }).label(t("Mission Objective")),
            }),
        [t]
    );

    return { formSchema };
};

export type GeneralInformationFormSchema = ReturnType<typeof useGeneralInformationFormSchema>["formSchema"];
