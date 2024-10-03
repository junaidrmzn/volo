import type { InferType } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import type { ExportInsert, Log } from "@voloiq/logbook-api/v6";
import { createExportFromFormData } from "../ExportMapping";
import { ExportFormFields } from "./ExportFormFields";
import { useExportFormSchema } from "./useExportFormSchema";

export type ExportFormProps = {
    formId: string;
    handleSubmit: (exportArgument: Omit<ExportInsert, "parameters">) => void;
    selectedLog: Log;
};

export const ExportForm = (props: ExportFormProps) => {
    const { formId, handleSubmit, selectedLog } = props;
    const { date, endDate } = selectedLog;

    const schema = useExportFormSchema(selectedLog);
    type Schema = typeof schema;

    const initialValues: Partial<InferType<Schema>> = {
        startDate: new Date(date),
        ...(endDate ? { endDate: new Date(endDate) } : {}),
        sampleRate: 1,
    };

    return (
        <FormProvider
            schema={schema}
            formType="create"
            formId={formId}
            onCreate={(formData) => handleSubmit(createExportFromFormData(formData))}
            initialValues={initialValues}
        >
            <ExportFormFields schema={schema} />;
        </FormProvider>
    );
};
