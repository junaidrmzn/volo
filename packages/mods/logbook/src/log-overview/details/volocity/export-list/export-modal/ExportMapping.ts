import type { FormValues } from "@voloiq/form";
import type { ExportFileType, ExportInsert } from "@voloiq/logbook-api/v6";
import type { useExportFormSchema } from "./export-form/useExportFormSchema";

export const parameterIdTokenizer = (parameters: string) =>
    parameters
        .trimStart()
        .replace(/(\s+[,.;]\s+)|([,.;]\s+)|(\s+[,.;])|[.;]|\s+/g, ",")
        .split(",");

export const createExportFromFormData = (
    formData: FormValues<ReturnType<typeof useExportFormSchema>>
): Omit<ExportInsert, "parameters"> => ({
    sampleRate: formData.sampleRate !== undefined ? formData.sampleRate : null,
    endTime: formData.endDate.toISOString(),
    startTime: formData.startDate.toISOString(),
    description: formData.description,
    exportFileType: formData.exportFileType as ExportFileType,
});
