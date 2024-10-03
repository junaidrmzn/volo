import { useMemo } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { date, object, string, textEditor } from "@voloiq/form";
import { useTestMissionAndWeatherTranslation } from "./translations/useTestMissionAndWeatherTranslation";

export const useTestMissionAndWeatherFormSchema = () => {
    const { t } = useTestMissionAndWeatherTranslation();

    const formSchema = useMemo(
        () =>
            object({
                maxTestAltitude: string().label(t("Max Test Alt.")),
                flightRule: string().label(t("Flight Rule")),
                departure: date().label(t("Departure")),
                arrival: date().label(t("Arrival")),
                frequencyOperations: string().label(t("Frequency OPS")),
                frequencyTower: string().label(t("Frequency TWR")),
                optionalFrequency: string().label(t("Optional Frequency")),
                airspaceRequested: string().label(t("Airspace Requested")),
                weatherLimits: textEditor({ createImageSource: fileToBase64 }).label(
                    t("Flight Conditions Weather Limits")
                ),
                weatherObserved: textEditor({ createImageSource: fileToBase64 }).label(t("Weather Observed")),
            }),
        [t]
    );

    return { formSchema };
};

export type TestMissionAndWeatherFormSchema = ReturnType<typeof useTestMissionAndWeatherFormSchema>["formSchema"];
