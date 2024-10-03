import { Box, Text } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { formatParameterNameWithUnit } from "@voloiq/flight-test-definition-utils";
import { TestPointFormLayout } from "./TestPointFormLayout";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";

export type TestPointModalBodyProps = {
    testPointParameters: TestPointParameter[];
};

export const TestPointModalBody = (props: TestPointModalBodyProps) => {
    const { testPointParameters } = props;
    const { t } = useTestPointSectionTranslation();

    return (
        <Box px={3} mr={20} pr={9} mb={2.5}>
            <TestPointFormLayout>
                <TestPointFormLayout.SmallFormFields>
                    <TestPointFormLayout.SmallFormField>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            {t("Gross Weight")}
                        </Text>
                    </TestPointFormLayout.SmallFormField>
                    <TestPointFormLayout.SmallFormField>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            {t("C.G.")}
                        </Text>
                    </TestPointFormLayout.SmallFormField>
                    {testPointParameters.map((testPointParameter) => (
                        <TestPointFormLayout.SmallFormField key={testPointParameter.id}>
                            <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                                {formatParameterNameWithUnit(testPointParameter)}
                            </Text>
                        </TestPointFormLayout.SmallFormField>
                    ))}
                </TestPointFormLayout.SmallFormFields>
                <TestPointFormLayout.LargeFormField>
                    <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                        {t("Comments")}
                    </Text>
                </TestPointFormLayout.LargeFormField>
                <TestPointFormLayout.Checkboxes>
                    <TestPointFormLayout.Checkbox>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            D
                        </Text>
                    </TestPointFormLayout.Checkbox>
                    <TestPointFormLayout.Checkbox>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            C
                        </Text>
                    </TestPointFormLayout.Checkbox>
                    <TestPointFormLayout.Checkbox>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            A
                        </Text>
                    </TestPointFormLayout.Checkbox>
                    <TestPointFormLayout.Checkbox>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            B
                        </Text>
                    </TestPointFormLayout.Checkbox>
                    <TestPointFormLayout.Checkbox>
                        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted">
                            U
                        </Text>
                    </TestPointFormLayout.Checkbox>
                </TestPointFormLayout.Checkboxes>
            </TestPointFormLayout>
        </Box>
    );
};
