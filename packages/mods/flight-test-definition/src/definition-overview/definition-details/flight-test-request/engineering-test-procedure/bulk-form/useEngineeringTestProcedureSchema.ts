import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { object, string, textEditor } from "@voloiq/form";
import { useEngineeringTestProceduresTranslation } from "../translations/useEngineeringTestProceduresTranslation";

export const useEngineeringTestProcedureSchema = () => {
    const { t } = useEngineeringTestProceduresTranslation();

    return object({
        title: string().required().label(t("Engineering Test Procedure Title")),
        details: textEditor({ createImageSource: fileToBase64 })
            .required()
            .label(t("Engineering Test Procedure Details")),
    });
};

export type EngineeringTestProcedureFormSchema = ReturnType<typeof useEngineeringTestProcedureSchema>;
