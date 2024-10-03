import { useMemo } from "react";
import { createFormControl, date, object } from "@voloiq/form";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";

export const customDateFormFactory = (t: Function) => {
    return object({
        goToDate: date().required().label(t("quickFilters.customDate.title")),
    });
};

type customDateFormSchemaType = ReturnType<typeof customDateFormFactory>;

export const CustomDateFormSchema = createFormControl<customDateFormSchemaType>();

export const useCustomDateForm = () => {
    const { t } = useScheduledMissionTranslation();

    const createCustomDateSchema = useMemo(() => customDateFormFactory(t), [t]);

    return { FormControl: CustomDateFormSchema, createCustomDateSchema };
};
