import { AxiosError } from "axios";
import { useRef } from "react";
import { match } from "ts-pattern";
import { useBulkCreateTestHazardAssessments } from "@voloiq/flight-test-definition-api/v1";
import { FormValues } from "@voloiq/form";
import { createTestHazardAssessmentInsertFromBulkFormData } from "./BulkCreateTestHazardAssessmentMapping";
import { CreateTestHazardAssessmentProps } from "./CreateTestHazardAssessmentType";
import { TestHazardAssessmentFormSchema } from "./useTestHazardAssessmentFormSchema";

type UseBulkCreateTestHazardAssessment = Omit<CreateTestHazardAssessmentProps, "formRef"> & {};

export const useBulkCreateTestHazardAssessment = (props: UseBulkCreateTestHazardAssessment) => {
    const { setSaveCallback, onSubmit, onAfterSubmit, onSubmitError } = props;
    const { addTestHazardAssessment } = useBulkCreateTestHazardAssessments();
    const formRef = useRef<HTMLFormElement>(null);

    const onBulkCreateTestHazardAssessment = async (forms: FormValues<TestHazardAssessmentFormSchema>[]) => {
        onSubmit();
        try {
            await addTestHazardAssessment({
                data: forms.map((testHazardAssessment) =>
                    createTestHazardAssessmentInsertFromBulkFormData({
                        ...testHazardAssessment,
                    })
                ),
            });
        } catch (error: unknown) {
            const anyError = error as AxiosError;
            if (anyError.isAxiosError) {
                const axiosError = anyError;
                const errorKey = match(axiosError.response?.data.error.status)
                    .with("ALREADY_EXISTS", () => "ALREADY_EXISTS" as const)
                    .otherwise(() => "GENERIC" as const);
                onSubmitError(errorKey);
            }
        }
        onAfterSubmit();
    };

    const handleBulkSubmit = () => {
        formRef.current?.requestSubmit();
    };
    setSaveCallback(handleBulkSubmit);

    return { onBulkCreateTestHazardAssessment, formRef };
};
