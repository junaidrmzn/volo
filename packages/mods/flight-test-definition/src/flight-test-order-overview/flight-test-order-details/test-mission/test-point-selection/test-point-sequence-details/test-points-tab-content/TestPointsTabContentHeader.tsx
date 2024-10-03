import { Box, Text } from "@volocopter/design-library-react";
import type { ManualTestPointParameter, TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { formatParameterNameWithUnit } from "@voloiq/flight-test-definition-utils";
import { TestPointTabContentFormLayout } from "./TestPointTabContentFormLayout";
import { useTestPointsTabContentTranslation } from "./translations/useTestPointsTabContentTranslation";

export type TestPointsContentProps = {
    testPointParameters?: TestPointParameter[] | ManualTestPointParameter[];
};

export const TestPointsTabContentHeader = (props: TestPointsContentProps) => {
    const { testPointParameters } = props;
    const { t } = useTestPointsTabContentTranslation();

    return (
        <Box py={3} pos="sticky" top="0" zIndex={1} bgColor="white">
            <TestPointTabContentFormLayout>
                <TestPointTabContentFormLayout.Descriptor />
                <TestPointTabContentFormLayout.SeqFormField>
                    <Text fontSize="xs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                        {t("No.")}
                    </Text>
                </TestPointTabContentFormLayout.SeqFormField>
                <TestPointTabContentFormLayout.ProcedureFormField>
                    <Text fontSize="xs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                        {t("Procedure")}
                    </Text>
                </TestPointTabContentFormLayout.ProcedureFormField>
                <TestPointTabContentFormLayout.SmallFormFields>
                    {testPointParameters &&
                        testPointParameters.map((testPointParameter) => (
                            <TestPointTabContentFormLayout.SmallFormField key={testPointParameter.id}>
                                <Text fontSize="xs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                                    {formatParameterNameWithUnit(testPointParameter)}
                                </Text>
                            </TestPointTabContentFormLayout.SmallFormField>
                        ))}
                </TestPointTabContentFormLayout.SmallFormFields>
                <TestPointTabContentFormLayout.TestPointIdFormField>
                    <Text fontSize="xs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                        {t("Test Point ID")}
                    </Text>
                </TestPointTabContentFormLayout.TestPointIdFormField>
                <TestPointTabContentFormLayout.NotesFormField>
                    <Text fontSize="xs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                        {t("Notes")}
                    </Text>
                </TestPointTabContentFormLayout.NotesFormField>
            </TestPointTabContentFormLayout>
        </Box>
    );
};
