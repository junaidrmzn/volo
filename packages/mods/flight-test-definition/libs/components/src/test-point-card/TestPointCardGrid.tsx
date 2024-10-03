import { Box, Center, Grid, HStack, Tag, Text } from "@volocopter/design-library-react";
import { RefObject, UIEventHandler } from "react";
import { formatParameterNameWithUnit } from "@voloiq/flight-test-definition-utils";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestPointCardTranslation } from "./translations/useTestPointCardTranslation";
import { Applicability, allApplicabilities, useGetApplicabilityAbbreviation } from "./useApplicabilityAbbreviation";
import { useTestpointStatus } from "./useTestpointStatus";

export type TestPointCardGridProps = {
    testPointId: string;
    onScrollTestPointParameterContainer?: UIEventHandler<HTMLDivElement>;
    testPointParameterContainerRef?: RefObject<HTMLDivElement>;
    comments?: string;
    centerOfGravity?: string;
    grossWeight?: string;
    status: "IN WORK" | "READY";
    testPointParameters: {
        name: string;
        unit: string;
        value: string;
    }[];
    applicabilities: Applicability[];
};

export const TestPointCardGrid = (props: TestPointCardGridProps) => {
    const {
        testPointId,
        onScrollTestPointParameterContainer,
        testPointParameterContainerRef,
        comments,
        testPointParameters,
        centerOfGravity,
        grossWeight,
        status,
        applicabilities,
    } = props;
    const { t } = useTestPointCardTranslation();
    const { getApplicabilityAbbreviation } = useGetApplicabilityAbbreviation();

    const testPointStatus = useTestpointStatus(status);

    return (
        <Grid
            textAlign="left"
            width="full"
            gap={6}
            alignItems="flex-start"
            gridAutoFlow="column"
            gridTemplateColumns="auto auto minmax(25%, 1fr) auto"
        >
            <Center alignSelf="stretch">
                <Text fontSize="sm" lineHeight={6} fontWeight="bold" mr={7}>
                    {testPointId}
                </Text>
            </Center>
            <HStack
                spacing={3}
                overflowX="scroll"
                onScroll={onScrollTestPointParameterContainer}
                ref={testPointParameterContainerRef}
            >
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("Gross Weight")}
                    text={grossWeight}
                    minWidth={20}
                />
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("C.G.")}
                    text={centerOfGravity}
                    minWidth={20}
                />
                {testPointParameters.map((testPointParameter) => (
                    <TextWithLabel
                        unknownValueText="-"
                        size="small"
                        key={testPointParameter.name}
                        label={
                            <Text py={0.5} lineHeight="none" fontWeight="inherit" color="inherit" fontSize="inherit">
                                {formatParameterNameWithUnit(testPointParameter)}
                            </Text>
                        }
                        text={testPointParameter.value}
                        minWidth={20}
                    />
                ))}
            </HStack>
            <Box>
                <TextWithLabel unknownValueText="-" size="small" label={t("Comments")} text={comments} />
            </Box>
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("Applicability")}
                text={
                    <HStack spacing={3}>
                        {allApplicabilities.map((applicability) => (
                            <HStack key={applicability} spacing={2}>
                                <Text
                                    as="span"
                                    color={applicabilities.includes(applicability) ? "green.700" : "red.700"}
                                    lineHeight={6}
                                >
                                    &#9679;
                                </Text>
                                <Text as="span" fontSize="sm" lineHeight={6}>
                                    {getApplicabilityAbbreviation(applicability)}
                                </Text>
                            </HStack>
                        ))}
                    </HStack>
                }
            />
            <TextWithLabel
                unknownValueText="-"
                size="small"
                label={t("status.label")}
                text={<Tag colorScheme={testPointStatus.colorScheme}>{testPointStatus.label}</Tag>}
            />
        </Grid>
    );
};
