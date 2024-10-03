import { object, textarea } from "@voloiq/form";
import { UpdateFlightTestOrderStatusTranslationFunction } from "./translations/useUpdateFlightTestOrderStatusTranslation";

export type DeclineFlightTestOrderSchemaOptions = {
    t: UpdateFlightTestOrderStatusTranslationFunction;
};

export const declineFlightTestOrderSchema = (options: DeclineFlightTestOrderSchemaOptions) => {
    const { t } = options;
    return object({
        descriptionText: textarea().required().label(t("declineModal.Description Text")),
    });
};

export type DeclineFlightTestOrderFormSchema = ReturnType<typeof declineFlightTestOrderSchema>;
