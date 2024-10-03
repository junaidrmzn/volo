import { Box } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { DragHandle, FormControlProps } from "@voloiq/form";
import { TestPointFormLayout } from "./TestPointFormLayout";
import type { TestPointsFormSchema } from "./useTestPointFormSchema";
import { testPointParameterFormFieldPrefix } from "./useTestPointFormSchema";

export type TestPointFormControlGroupProps = {
    FormControl: (props: FormControlProps<TestPointsFormSchema>) => ReactElement | null;
    formControlIndex: number;
    testPointParameters: TestPointParameter[];
};

export const TestPointFormControlGroup = (props: TestPointFormControlGroupProps) => {
    const { FormControl, formControlIndex, testPointParameters } = props;
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <TestPointFormLayout>
            <TestPointFormLayout.Descriptor>
                {isFeatureFlagEnabled("vte-1575-sort-test-points") && (
                    <Box position="absolute" top={0} left={0}>
                        <DragHandle size={4} color="semanticUnknownMuted" />
                    </Box>
                )}
                {String(formControlIndex + 1).padStart(2, "0")}
            </TestPointFormLayout.Descriptor>
            <TestPointFormLayout.SmallFormFields>
                <TestPointFormLayout.SmallFormField>
                    <FormControl showLabel={false} fieldName="grossWeight" />
                </TestPointFormLayout.SmallFormField>
                <TestPointFormLayout.SmallFormField>
                    <FormControl showLabel={false} fieldName="centerOfGravity" />
                </TestPointFormLayout.SmallFormField>
                {testPointParameters.map((testPointParameter) => (
                    <TestPointFormLayout.SmallFormField key={testPointParameter.id}>
                        <FormControl
                            // React needs a key here to properly identify this element in case a test point parameter is removed
                            key={testPointParameter.id}
                            showLabel={false}
                            fieldName={`${testPointParameterFormFieldPrefix}${testPointParameter.id}`}
                        />
                    </TestPointFormLayout.SmallFormField>
                ))}
            </TestPointFormLayout.SmallFormFields>
            <TestPointFormLayout.LargeFormField>
                <FormControl showLabel={false} fieldName="comments" />
            </TestPointFormLayout.LargeFormField>
            <TestPointFormLayout.Applicabilities>
                <Box mt={1.5}>
                    <FormControl showLabel={false} fieldName="applicability" />
                </Box>
            </TestPointFormLayout.Applicabilities>
        </TestPointFormLayout>
    );
};
