import type { MasterModel } from "@voloiq/flight-test-definition-api/v2";
import type { SelectOption } from "@voloiq/form";
import { object, select, string } from "@voloiq/form";
import type { FlightTestOrderFormTranslationFunction } from "./translations/useFlightTestOrderFormTranslation";

export type CreateFlightTestOrderFormSchemaOptions = {
    t: FlightTestOrderFormTranslationFunction;
    masterModelOptions: SelectOption<MasterModel>[];
};
export const createFlightTestOrderFormSchema = (options: CreateFlightTestOrderFormSchemaOptions) => {
    const { t, masterModelOptions } = options;
    return object({
        missionTitle: string().required().label(t("Mission Title")),
        msn: string().required().label(t("Aircraft MSN")),
        masterModel: select({
            placeholder: t("Select Master Model"),
            options: masterModelOptions,
            errorMessage: t("Dropdown Error", { label: "Master Model" }),
        })
            .required()
            .label(t("Master Model.Name")),
    });
};

export type FlightTestOrderFormSchema = ReturnType<typeof createFlightTestOrderFormSchema>;
