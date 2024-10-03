import { Checkbox, HStack, Tag, Text } from "@volocopter/design-library-react";
import { ChangeEvent } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { TestPoint } from "@voloiq/flight-test-definition-api/v1";
import { TestPointTextWithLabel, useTestpointStatus } from "@voloiq/flight-test-definition-components";
import { formatParameterNameWithUnit, useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";
import { useTestPointsSearchTabContentTranslation } from "./translations/useTestPointsSearchTabContentTranslation";

export type TestPointListItemProps = {
    defaultChecked?: boolean;
    testPoint: TestPoint;
    overriddenTestPointId?: string;
    onSelectTestPoint: (testPoint: TestPoint, isChecked: boolean) => void;
};

export const TestPointListItem = (props: TestPointListItemProps) => {
    const { defaultChecked = false, testPoint, onSelectTestPoint, overriddenTestPointId } = props;
    const { grossWeight, centerOfGravity, testPointParameters, comments, status = "IN WORK", testPointId } = testPoint;

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t } = useTestPointsSearchTabContentTranslation();
    const { onScroll, ref } = useSynchronizedScrollElement();
    const testPointStatus = useTestpointStatus(status);

    const handleOnCheck = (event: ChangeEvent<HTMLInputElement>) => {
        onSelectTestPoint(testPoint, event.target.checked);
    };

    const isDisabled = isFeatureFlagEnabled("vte-1541-test-point-status-independent-selection")
        ? false
        : ["IN WORK"].includes(status);

    return (
        <HStack
            spacing={5}
            pl={6}
            pr={3}
            py={1}
            justifyContent="space-between"
            alignItems="center"
            bgColor="decorative1Basic"
            maxW="full"
        >
            <HStack spacing={4} justifyContent="center" alignItems="center">
                <Checkbox size="sm" onChange={handleOnCheck} defaultChecked={defaultChecked} isDisabled={isDisabled} />
                <Text fontSize="xs" lineHeight={6} fontWeight="bold" mr={7} whiteSpace="nowrap">
                    {overriddenTestPointId ?? testPointId}
                </Text>
            </HStack>
            <HStack onScroll={onScroll} ref={ref} overflowX="scroll">
                <TestPointTextWithLabel label={t("Gross Weight")} text={grossWeight} />
                <TestPointTextWithLabel label={t("C.G.")} text={centerOfGravity} />
                {testPointParameters.map((testPointParameter) => (
                    <TestPointTextWithLabel
                        key={testPointParameter.name}
                        label={formatParameterNameWithUnit(testPointParameter)}
                        text={testPointParameter.value}
                    />
                ))}
            </HStack>
            <TestPointTextWithLabel label={t("Comments")} text={comments} />
            <TestPointTextWithLabel
                label={t("Test Point Status")}
                text={<Tag colorScheme={testPointStatus.colorScheme}>{testPointStatus.label}</Tag>}
            />
        </HStack>
    );
};
