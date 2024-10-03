import { createFormControl, datetime, object } from "@voloiq/form";

export const dateSelectionFormSchema = () => {
    return object({
        goToDate: datetime().required().label("Go-To Date"),
    });
};

type dateSelectionFormSchemaType = ReturnType<typeof dateSelectionFormSchema>;

export const DateSelectionFormControl = createFormControl<dateSelectionFormSchemaType>();

export const useDateSelectionForm = () => {
    return { FormControl: DateSelectionFormControl, dateSelectionFormSchema };
};
