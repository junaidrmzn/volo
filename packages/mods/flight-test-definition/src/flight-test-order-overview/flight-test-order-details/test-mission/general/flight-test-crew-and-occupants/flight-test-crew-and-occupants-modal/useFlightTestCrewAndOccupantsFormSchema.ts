import { useMemo } from "react";
import { object, select, string } from "@voloiq/form";
import { useFlightTestCrewAndOccupantsModalTranslation } from "./translations/useFlightTestCrewAndOccupantsModalTranslation";

export const useFlightTestCrewAndOccupantsFormSchema = () => {
    const { t } = useFlightTestCrewAndOccupantsModalTranslation();

    const formSchema = useMemo(
        () =>
            object({
                role: string().label(t("Role")).required(),
                category: select({
                    options: [
                        { label: "-", value: undefined },
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
                }).label(t("Category")),
                name: string().label(t("Name")).required(),
                position: select({
                    options: [
                        {
                            value: "LH-RH Seat",
                            label: t("LH-RH Seat"),
                        },
                        {
                            value: "TM",
                            label: t("TM"),
                        },
                        {
                            value: "Ground",
                            label: t("Ground"),
                        },
                        {
                            value: "Remote",
                            label: t("Remote"),
                        },
                    ],
                    placeholder: t("Please select"),
                    errorMessage: t("Please select a value"),
                })
                    .label(t("Position"))
                    .required(),
            }),
        [t]
    );

    return { formSchema };
};

export type FlightTestCrewAndOccupantsFormSchema = ReturnType<
    typeof useFlightTestCrewAndOccupantsFormSchema
>["formSchema"];
