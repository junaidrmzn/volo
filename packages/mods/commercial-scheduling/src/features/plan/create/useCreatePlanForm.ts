import { useToast } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { useUploadSsim } from "@voloiq/commercial-scheduling-api/v1";
import { OnCreateHandler, attachment, createFormControl, object, string } from "@voloiq/form";
import { PlanTranslationFunction, usePlanTranslation } from "../translations/usePlanTranslation";

const planSchemaFactory = (t: PlanTranslationFunction) =>
    object({
        planName: string().required().label(t("modal.Plan Name")),
        file: attachment({
            accept: [".txt"],
            allowMultiple: false,
            selectFilesLabel: t("create.fileInput.selectFilesLabel"),
            dropFilesLabel: t("create.fileInput.dropFilesLabel"),
            orLabel: t("create.fileInput.orLabel"),
            allowedFileTypesLabel: t("create.fileInput.allowedFileTypesLabel"),
            maxFileSizeLabel: t("create.fileInput.maxFileSizeLabel"),
            deleteAriaLabel: t("create.fileInput.deleteAriaLabel"),
            rejectedFilesErrorMessage: t("create.fileInput.rejectedFilesErrorMessage", {
                acceptedFiles: ".txt",
            }),
        })
            .min(1)
            .label(t("modal.File")),
    });

export type PlanSchema = ReturnType<typeof planSchemaFactory>;

export type UseCreatePlanFormOptions = {
    setProcessId: (processId: string) => void;
};

export const useCreatePlanForm = (options: UseCreatePlanFormOptions) => {
    const { setProcessId } = options;
    const { t } = usePlanTranslation();
    const { sendRequest } = useUploadSsim();
    const toast = useToast();

    const planSchema = useMemo(() => planSchemaFactory(t), [t]);

    const onCreate: OnCreateHandler<PlanSchema> = (data) => {
        const formData = new FormData();
        formData.append("file", data.file?.[0]);
        sendRequest({
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: {
                commercialPlanName: data.planName,
            },
        }).then((planProcess) => {
            if (planProcess?.id) setProcessId(planProcess.id);
            toast({
                status: "info",
                title: t("title"),
                description: t("create.process.started"),
            });
        });
    };

    const FormControl = createFormControl<typeof planSchema>();

    return { planSchema, FormControl, onCreate };
};
