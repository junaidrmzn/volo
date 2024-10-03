import { useQueryClient } from "@tanstack/react-query";
import { VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { TestPoint, TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { getTestPointsQueryKey } from "@voloiq/flight-test-definition-api/v1";
import type { BulkResourceFormProps } from "@voloiq/flight-test-definition-components";
import { BulkResourceForm } from "@voloiq/flight-test-definition-components";
import { SynchronizedScrollProvider } from "@voloiq/flight-test-definition-utils";
import type { InitialValues, PromiseResults } from "@voloiq/form";
import { TestPointFormControlGroup } from "./TestPointFormControlGroup";
import { TestPointModalBody } from "./TestPointModalBody";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";
import type { TestPointsFormSchema } from "./useTestPointFormSchema";
import { testPointParameterFormFieldPrefix, useTestPointFormSchema } from "./useTestPointFormSchema";
import { useTestPointOnBulkOperations } from "./useTestPointOnBulkOperations";

export type TestPointsFormProps = {
    definitionId: string;
    procedureId: string;
    testPoints: TestPoint[];
    testPointParameters: TestPointParameter[];
} & Pick<BulkResourceFormProps<TestPointsFormSchema>, "formRef" | "onAfterSubmit">;

export const TestPointsForm = (props: TestPointsFormProps) => {
    const { definitionId, procedureId, testPoints, onAfterSubmit, testPointParameters, formRef } = props;

    const { t } = useTestPointSectionTranslation();
    const { formSchema } = useTestPointFormSchema({ testPointParameters });
    const { onBulkAddTestPoints, onBulkDeleteTestPoints, onBulkEditTestPoints } = useTestPointOnBulkOperations({
        definitionId,
        procedureId,
    });
    const queryClient = useQueryClient();
    const handleOnAfterSubmit = (results?: PromiseResults | undefined) => {
        queryClient.invalidateQueries(getTestPointsQueryKey(procedureId));
        onAfterSubmit?.(results);
    };
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <VStack width="full" alignItems="stretch" spacing={0}>
            <SynchronizedScrollProvider>
                <TestPointModalBody testPointParameters={testPointParameters} />
                <BulkResourceForm
                    renderFormControlGroup={(FormControl, index) => (
                        <TestPointFormControlGroup
                            FormControl={FormControl}
                            formControlIndex={index}
                            testPointParameters={testPointParameters}
                        />
                    )}
                    entityName={t("Test Point")}
                    schema={formSchema}
                    initialValues={testPoints.map((testPoint) => {
                        const values: InitialValues<TestPointsFormSchema> & { id: string } = {
                            id: testPoint.id,
                            grossWeight: testPoint.grossWeight,
                            centerOfGravity: testPoint.centerOfGravity,
                            comments: testPoint.comments,
                            applicability: testPoint.applicability,
                        };
                        for (const testPointParameter of testPoint.testPointParameters) {
                            values[`${testPointParameterFormFieldPrefix}${testPointParameter.id}`] =
                                testPointParameter.value;
                        }
                        return values;
                    })}
                    onAdd={onBulkAddTestPoints}
                    onEdit={onBulkEditTestPoints}
                    onDelete={onBulkDeleteTestPoints}
                    deleteButtonProps={{ mt: 0 }}
                    onAfterSubmit={handleOnAfterSubmit}
                    formRef={formRef}
                    withDuplicateButton
                    isSortable={isFeatureFlagEnabled("vte-1575-sort-test-points")}
                />
            </SynchronizedScrollProvider>
        </VStack>
    );
};
