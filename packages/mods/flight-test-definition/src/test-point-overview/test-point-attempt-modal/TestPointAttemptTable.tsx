import type { StackProps } from "@volocopter/design-library-react";
import { Box, Icon, IconButton, SimpleGrid, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { TestPointAttempt, TestPointAttemptPatch } from "@voloiq/flight-test-definition-api/v1";
import { ColumnText } from "../test-point-attempt-table/ColumnText";
import { HeaderText } from "../test-point-attempt-table/HeaderText";
import { TestPointAttemptModalForm } from "./test-point-attempt-modal-form/TestPointAttemptModalForm";
import { useTestPointAttemptModalTranslation } from "./translations/useTestPointAttemptModalTranslation";

export type TestPointAttemptModalTableProps = {
    testPointAttempts: TestPointAttempt[];
    onEditStatus: (ftoId: string | undefined) => void;
    onClose: () => void;
    onTestpointAttemptChange: (attemptId: string, attempt: TestPointAttemptPatch) => void;
    statusInEditMode?: string;
    isLoading: boolean;
} & StackProps;

const DividerWithoutMargin = () => <Box width="full" borderBottom="1px" borderBottomColor="darkBlue.200" />;

export const TestPointAttemptModalTable = (props: TestPointAttemptModalTableProps) => {
    const {
        testPointAttempts,
        onEditStatus,
        isLoading,
        onClose,
        onTestpointAttemptChange,
        statusInEditMode,
        ...stackProps
    } = props;
    const { formatDate } = useFormatDateTime();
    const { t } = useTestPointAttemptModalTranslation();

    return (
        <VStack width="full" divider={<DividerWithoutMargin />} {...stackProps} py="0">
            <SimpleGrid columns={8} width="full" alignItems="flex-start" gridAutoFlow="column" px="3" py="2">
                <HeaderText>{t("table.FTO")}</HeaderText>
                <HeaderText>{t("table.Date")}</HeaderText>
                <HeaderText>{t("table.Planning Status")}</HeaderText>
                <HeaderText>{t("table.Flight Status")}</HeaderText>
                <HeaderText>{t("table.Evaluation Status")}</HeaderText>
                <HeaderText>{t("table.Eng. Status")}</HeaderText>
                <HeaderText>{t("table.Eng. Action Status")}</HeaderText>
            </SimpleGrid>
            {testPointAttempts.map((testPointAttempt, index) =>
                statusInEditMode === testPointAttempt.id ? (
                    <TestPointAttemptModalForm
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
                        columns={8}
                        width="full"
                        alignItems="flex-start"
                        gridAutoFlow="column"
                        key={`attempt-${testPointAttempt.id}`}
                        px="3"
                        py="2"
                    >
                        <ColumnText>{testPointAttempt.ftoId}</ColumnText>
                        <ColumnText>{formatDate(testPointAttempt.date)}</ColumnText>
                        <ColumnText>{testPointAttempt.planningStatus}</ColumnText>
                        <ColumnText>{testPointAttempt.flightStatus}</ColumnText>
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
