import { useMemo } from "react";
import { useMasterModelOptions } from "@voloiq/flight-test-definition-forms";
import { date, object, select, string } from "@voloiq/form";
import { useTestAircraftTranslation } from "./translations/useTestAircraftTranslation";

export const useTestAircraftFormSchema = () => {
    const { t } = useTestAircraftTranslation();
    const { masterModelOptions } = useMasterModelOptions();

    const formSchema = useMemo(
        () =>
            object({
                masterModel: select({
                    placeholder: t("Select Master Model"),
                    options: masterModelOptions,
                    errorMessage: t("Dropdown Error", { label: "Master Model" }),
                })
                    .required()
                    .label(t("Master Model")),
                model: string().label(t("Model")),
                msn: string().required().label(t("MSN")),
                applicability: select({
                    options: [
                        {
                            value: "Manned",
                            label: t("Manned"),
                        },
                        {
                            value: "Unmanned",
                            label: t("Unmanned"),
                        },
                    ],
                    placeholder: t("Please select"),
                    errorMessage: t("Please select a value"),
                }).label(t("Applicability")),
                aircraftCallsign: string().label(t("Aircraft Callsign")),
                flightConditions: string().label(t("Flight Conditions")),
                revision: string().label(t("Rev.")),
                issueDateFlightConditions: date().label(t("Issue Date for Flight Conditions")),
                permitToFly: string().label(t("Permit to Fly")),
                issueDatePermitToFly: date().label(t("Issue Date for Permit to Fly")),
                validUntil: date().label(t("Valid Until")),
            }),
        [t, masterModelOptions]
    );

    return { formSchema };
};

export type TestAircraftFormSchema = ReturnType<typeof useTestAircraftFormSchema>["formSchema"];
