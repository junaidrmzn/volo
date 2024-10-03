import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useFlightTestOrderListItemTranslation } from "./translations/useFlightTestOrderListItemTranslation";

export type FlightTestOrderListItemContentProps = {
    flightTestOrder: FlightTestOrder;
};

export const FlightTestOrderListItemContent = (props: FlightTestOrderListItemContentProps) => {
    const { flightTestOrder } = props;

    const { riskLevel, createTime, missionObjective, flightTestCategory, createdBy, flightTestPlanIds } =
        flightTestOrder;
    const { t } = useFlightTestOrderListItemTranslation();
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
                    {t("Flight Test Plan ID")}
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
