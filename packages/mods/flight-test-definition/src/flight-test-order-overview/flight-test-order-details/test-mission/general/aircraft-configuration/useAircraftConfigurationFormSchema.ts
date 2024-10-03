import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, string, textEditor } from "@voloiq/form";
import { useAircraftConfigurationTranslation } from "./translations/useAircraftConfigurationTranslation";

export const useAircraftConfigurationFormSchema = () => {
    const { t } = useAircraftConfigurationTranslation();

    const formSchema = useMemo(
        () =>
            object({
                allUpMass: string().label(t("AUM")),
                centerOfGravity: string().label(t("CG")),
                massAndBalanceCategory: string().label(t("M&B Cat.")),
                ballasts: string().label(t("Ballasts")),
                charging: string().label(t("Charging")),
                bingo: string().label(t("Bingo")),
                totalDuration: string().label(t("Total Duration")),
                setupSheet: string().label(t("Setup Sheet")),
                notesToAircraft: textEditor({ createImageSource: fileToBase64 }).label(
                    t("Notes to Aircraft & Configuration")
                ),
            }),
        [t]
    );

    return { formSchema };
};

export type AircraftConfigurationFormSchema = ReturnType<typeof useAircraftConfigurationFormSchema>["formSchema"];
