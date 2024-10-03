import { CreateTestHazardAssessmentProps } from "./CreateTestHazardAssessmentType";
import { BulkCreateTestHazardAssessmentForm } from "./form-layout/BulkCreateTestHazardAssessmentForm";
import { TestHazardAssessmentBulkForm } from "./form-layout/TestHazardAssessmentBulkForm";
import { useBulkCreateTestHazardAssessmentTranslations } from "./translations/useBulkCreateTestHazardAssessmentTranslations";
import { useBulkCreateTestHazardAssessment } from "./useBulkCreateTestHazardAssessment";
import { useTestHazardAssessmentFormSchema } from "./useTestHazardAssessmentFormSchema";

type BulkCreateTestHazardAssessmentProps = Omit<CreateTestHazardAssessmentProps, "formRef"> & {};

export const BulkCreateTestHazardAssessment = (props: BulkCreateTestHazardAssessmentProps) => {
    const { formRef, onBulkCreateTestHazardAssessment } = useBulkCreateTestHazardAssessment(props);
    const schema = useTestHazardAssessmentFormSchema();
    const { t } = useBulkCreateTestHazardAssessmentTranslations();
    return (
        <TestHazardAssessmentBulkForm
            onAdd={(formValues) => onBulkCreateTestHazardAssessment(formValues)}
            onDelete={() => Promise.resolve()}
            onEdit={() => Promise.resolve()}
            schema={schema}
            formRef={formRef}
            renderFormControlGroup={(FormControl) => (
                <BulkCreateTestHazardAssessmentForm FormControl={FormControl} schema={schema} />
            )}
            headerTitle={t("header.title")}
        />
    );
};
