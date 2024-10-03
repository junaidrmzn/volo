import { useMemo } from "react";
import { object, string } from "@voloiq/form";
import { useProceduresTranslation } from "./translations/useProceduresTranslation";

export const useProcedureFormSchema = () => {
    const { t } = useProceduresTranslation();
    const proceduresFormSchema = useMemo(
        () =>
            object({
                title: string().required().label(t("Title")),
            }),
        [t]
    );
    return { proceduresFormSchema };
};

export type ProcedureFormSchema = ReturnType<typeof useProcedureFormSchema>["proceduresFormSchema"];
