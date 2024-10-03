import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { TextWithLabel } from "@voloiq/text-layouts";
import { FlightTestOrderAttachments } from "./FlightTestOrderAttachments";
import { useFlightTestOrderListItemV2Translation } from "./translations/useFlightTestOrderListItemV2Translation";

export type FlightTestOrderListItemContentV2Props = {
    flightTestOrder: FlightTestOrder;
};

export const FlightTestOrderListItemContentV2 = (props: FlightTestOrderListItemContentV2Props) => {
    const { flightTestOrder } = props;

    const {
        riskLevel,
        createTime,
        missionObjective,
        flightTestCategory,
        createdBy,
        flightTestPlanIds,
        testPointCounter,
        testPointSequenceCounter,
    } = flightTestOrder;
    const { t } = useFlightTestOrderListItemV2Translation();
    const { formatDate } = useFormatDateTime();

    return (
        <VStack spacing={3} alignItems="stretch">
            <HStack spacing={6} alignItems="flex-start">
                <TextWithLabel
                    size="small"
                    label={t("Risk Classification")}
                    text={match(riskLevel)
                        .with("LOW", () => t("Low"))
                        .with("MEDIUM", () => t("Medium"))
                        .with("HIGH", () => t("High"))
                        .otherwise(() => undefined)}
                    unknownValueText="-"
                />
                <TextWithLabel
                    size="small"
                    label={t("Flight Test Category")}
                    text={flightTestCategory}
                    unknownValueText="-"
                />
                <TextWithLabel
                    size="small"
                    label={t("Date Created")}
                    text={formatDate(createTime)}
                    unknownValueText="-"
                />
                <TextWithLabel size="small" label={t("Created By")} text={createdBy} unknownValueText="-" />
                <Spacer />
                <FlightTestOrderAttachments
                    testPointCounter={testPointCounter}
                    testPointSequenceCounter={testPointSequenceCounter}
                />
            </HStack>
            <VStack spacing={0} alignItems="flex-start">
                <Text fontSize="xxs" lineHeight={6} fontWeight="bold" color="fontOnBgMuted">
                    {t("Mission Objective")}
                </Text>
                <Text fontSize="xs" lineHeight={4} whiteSpace="pre-wrap">
                    <EditorTextDisplay document={missionObjective} />
                </Text>
            </VStack>
            <VStack spacing={0} alignItems="flex-start">
                <Text fontSize="xxs" lineHeight={6} fontWeight="bold" color="fontOnBgMuted">
                    {t("Flight Test Definition")}
                </Text>
                {flightTestPlanIds && flightTestPlanIds?.length > 0 ? (
                    flightTestPlanIds?.map((flightTestPlanId) => (
                        <Text fontSize="xs" lineHeight={4} whiteSpace="pre-wrap" key={flightTestPlanId}>
                            {flightTestPlanId}
                        </Text>
                    ))
                ) : (
                    <Text fontSize="xxs" lineHeight={6} fontWeight="bold" color="fontOnBgMuted">
                        -
                    </Text>
                )}
            </VStack>
        </VStack>
    );
};
