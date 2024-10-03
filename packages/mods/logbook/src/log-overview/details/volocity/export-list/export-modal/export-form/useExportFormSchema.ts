import { datetime, number, object, radioGroup, string } from "@voloiq/form";
import type { Log } from "@voloiq/logbook-api/v6";
import { useExportModalTranslation } from "../translations/useExportModalTranslation";

export const useExportFormSchema = (selectedLog: Log) => {
    const { t } = useExportModalTranslation();
    const { date, endDate } = selectedLog;
    return object({
        startDate: datetime({
            minDate: new Date(date),
            maxDate: endDate ? new Date(endDate) : undefined,
            withUtcTime: true,
            enableSeconds: true,
            minuteIncrement: 1,
        })
            .required()
            .label(t("form.startDate")),
        endDate: datetime({
            minDate: new Date(date),
            maxDate: endDate ? new Date(endDate) : undefined,
            withUtcTime: true,
            enableSeconds: true,
            minuteIncrement: 1,
        })
            .required()
            .label(t("form.endDate")),
        exportFileType: radioGroup({
            options: [
                { label: "CSV", value: "CSV" },
                { label: "PARQUET", value: "PARQUET" },
                { label: "HDF5", value: "HDF5" },
            ],
            errorMessage: t("form.exportFileTypeError"),
            defaultValue: "CSV",
        }).label(t("form.exportFileType")),

        sampleRate: number().integer().moreThan(0).nullable().label(t("form.sampleRate")),
        description: string().label(t("form.description")),
    });
};
