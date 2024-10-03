import { Box, Icon, IconButton, SimpleGrid, StackProps, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { TestPointAttempt, TestPointAttemptPatch } from "@voloiq/flight-test-definition-api/v2";
import { ColumnText } from "../test-point-attempt-table/ColumnText";
import { HeaderText } from "../test-point-attempt-table/HeaderText";
import { TestPointAttemptModalFormV2 } from "./test-point-attempt-modal-form-v2/TestPointAttemptModalFormV2";
import { useTestPointAttemptModalV2Translation } from "./translations/useTestPointAttemptModalV2Translation";

export type TestPointAttemptTableV2Props = {
    testPointAttempts: TestPointAttempt[];
    onEditStatus: (ftoId: string | undefined) => void;
    onClose: () => void;
    onTestpointAttemptChange: (attemptId: string, attempt: TestPointAttemptPatch) => void;
    statusInEditMode?: string;
    isLoading: boolean;
} & StackProps;

const DividerWithoutMargin = () => <Box width="full" borderBottom="1px" borderBottomColor="darkBlue.200" />;

export const TestPointAttemptTableV2 = (props: TestPointAttemptTableV2Props) => {
    const {
        testPointAttempts,
        onEditStatus,
        isLoading,
        onClose,
        onTestpointAttemptChange,
        statusInEditMode,
        ...stackProps
    } = props;
    const { t } = useTestPointAttemptModalV2Translation();

    const { formatDate } = useFormatDateTime();

    return (
        <VStack width="full" divider={<DividerWithoutMargin />} {...stackProps} py="0">
            <SimpleGrid columns={7} width="full" alignItems="flex-start" gridAutoFlow="column" px="3" py="2">
                <HeaderText>{t("table.Test Point Attempt no.")}</HeaderText>
                <HeaderText>{t("table.FTO Linked")}</HeaderText>
                <HeaderText>{t("table.Date")}</HeaderText>
                <HeaderText>{t("table.Processing Status")}</HeaderText>
                <HeaderText>{t("table.Flight Test Status")}</HeaderText>
                <HeaderText>{t("table.TP Eng. Status")}</HeaderText>
                <HeaderText>{t("table.TP Eng. Action")}</HeaderText>
            </SimpleGrid>
            {testPointAttempts.map((testPointAttempt, index) =>
                statusInEditMode === testPointAttempt.id ? (
                    <TestPointAttemptModalFormV2
                        testPointAttempt={testPointAttempt}
                        submitButtonIsLoading={isLoading}
                        onClose={onClose}
                        onSubmit={(attemptPatch: TestPointAttemptPatch) =>
                            onTestpointAttemptChange(testPointAttempt.id, attemptPatch)
                        }
                        key={`attempt-${testPointAttempt.id}`}
                    />
                ) : (
                    <SimpleGrid
                        columns={7}
                        width="full"
                        alignItems="flex-start"
                        gridAutoFlow="column"
                        key={`attempt-${testPointAttempt.id}`}
                        px="3"
                        py="2"
                    >
                        <ColumnText>{testPointAttempt.attemptId}</ColumnText>
                        <ColumnText>{testPointAttempt.ftoId}</ColumnText>
                        <ColumnText>{formatDate(testPointAttempt.date)}</ColumnText>
                        <ColumnText>{testPointAttempt.processingStatus}</ColumnText>
                        <ColumnText>{testPointAttempt.flightTestStatus}</ColumnText>
                        <ColumnText>{testPointAttempt.engineeringStatus}</ColumnText>
                        <ColumnText>{testPointAttempt.engineeringAction}</ColumnText>
                        <ColumnText textAlign="end">
                            <IconButton
                                variant="ghost"
                                icon={<Icon icon="exchange" size={4} />}
                                aria-label={t(`table.Edit status number {number}`, { number: index + 1 })}
                                onClick={() => onEditStatus(testPointAttempt?.id)}
                                isDisabled={isLoading}
                            />
                        </ColumnText>
                    </SimpleGrid>
                )
            )}
        </VStack>
    );
};
