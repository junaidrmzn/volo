import { useState } from "react";
import { attachment, createFormControl, object } from "@voloiq/form";
import { useUploadPerformanceFile } from "../../../api-hooks/useAircraftTypeService";
import { useSuccessToast } from "../../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../../translations/useResourcesTranslation";

export type UsePerformanceFileUploadProps = {
    aircraftTypeId: string | undefined;
};

export type FormData = {
    file?: File[];
};

const route = `/v1/aircraft-management/aircraft-types`;

export const usePerformanceDataFileUpload = (aircraftTypeId?: string, version?: number) => {
    const { sendRequest } = useUploadPerformanceFile();
    const { t } = useResourcesTranslation();

    const { onSuccess } = useSuccessToast();

    const performanceDataSchema = object({
        file: attachment({
            accept: [".dat", ".csv"].filter(Boolean),
            rejectedFilesErrorMessage: t("aircraft-type.edit.file rejected"),
            deleteAriaLabel: t("aircraft-type.edit.delete aria label"),
            selectFilesLabel: t("aircraft-type.edit.select file"),
            dropFilesLabel: t("aircraft-type.edit.drop file"),
            orLabel: t("aircraft-type.edit.or"),
            allowMultiple: false,
        })
            .label(t("aircraft-type.edit.file upload"))
            .min(1),
    });

    type Schema = typeof performanceDataSchema;
    const FormControl = createFormControl<Schema>();

    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = (data: FormData, reset: () => void) => {
        if (!data.file || !data.file[0] || !aircraftTypeId) {
            reset();
            return;
        }
        const fileToUpload = data.file[0];
        setIsUploading(true);

        sendRequest({
            data: fileToUpload,
            headers: {
                "Content-Type": "application/octet-stream",
            },
            url: `${route}/${aircraftTypeId}/performance-data`,
            params: { version },
        }).then(() => {
            setIsUploading(false);
            onSuccess(t("aircraft-type.edit.upload successful"));
            reset();
        });
    };

    return { performanceDataSchema, uploadFile, FormControl, isUploading };
};
