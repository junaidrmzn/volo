import { Box, HStack, Text } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { formatParameterNameWithUnit } from "@voloiq/flight-test-definition-utils";
import { TestPointFormLayout } from "./TestPointFormLayout";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";

export type TestPointModalBodyProps = {
    testPointParameters: TestPointParameter[];
};

const ApplicabilityDescriptor = (props: { children: ReactNode }) => {
    const { children } = props;
    return (
        <Text fontSize="xxs" lineHeight={4} fontWeight="bold" color="fontOnBgMuted" width={4} textAlign="center">
            {children}
        </Text>
    );
};

export const TestPointModalBody = (props: TestPointModalBodyProps) => {
    const { testPointParameters } = props;
    const { t } = useTestPointSectionTranslation();

    return (
        <Box px={3} mr={20} mb={2.5}>
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
                <TestPointFormLayout.Applicabilities>
                    <HStack spacing={3} alignItems="flex-start">
                        <ApplicabilityDescriptor>D</ApplicabilityDescriptor>
                        <ApplicabilityDescriptor>C</ApplicabilityDescriptor>
                        <ApplicabilityDescriptor>A</ApplicabilityDescriptor>
                        <ApplicabilityDescriptor>B</ApplicabilityDescriptor>
                        <ApplicabilityDescriptor>U</ApplicabilityDescriptor>
                    </HStack>
                </TestPointFormLayout.Applicabilities>
            </TestPointFormLayout>
        </Box>
    );
};
