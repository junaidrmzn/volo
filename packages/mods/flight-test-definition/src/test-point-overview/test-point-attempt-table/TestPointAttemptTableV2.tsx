import type { StackProps } from "@volocopter/design-library-react";
import { Divider, Grid, GridItem, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { TestPointAttempt } from "@voloiq/flight-test-definition-api/v2";
import { ColumnText } from "./ColumnText";
import { HeaderText } from "./HeaderText";
import { useTestPointAttemptTableTranslation } from "./translations/useTestpointAttemptTableTranslation";

export type TestPointAttemptTableV2Props = {
    testPointAttempts: TestPointAttempt[];
} & StackProps;

export const TestPointAttemptTableV2 = (props: TestPointAttemptTableV2Props) => {
    const { testPointAttempts, ...stackProps } = props;
    const { formatDate } = useFormatDateTime();
    const { t } = useTestPointAttemptTableTranslation();

    return (
        <VStack width="full" divider={<Divider />} {...stackProps}>
            <Grid px="3" width="full" alignItems="flex-start" gridAutoFlow="column" templateColumns="repeat(7, 1fr)">
                <GridItem colSpan={1}>
                    <HeaderText>{t("Test Point Attempt no.")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("FTO linked")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Date")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Processing Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Flight Test Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("TP Eng. Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("TP Eng. Action")}</HeaderText>
                </GridItem>
            </Grid>
            {testPointAttempts.map((testPointAttempt) => (
                <Grid
                    width="full"
                    alignItems="flex-start"
                    gridAutoFlow="column"
                    templateColumns="repeat(7, 1fr)"
                    key={`attempt-${testPointAttempt.ftoId}`}
                    px="3"
                >
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.attemptId}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.ftoId}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{formatDate(testPointAttempt.date)}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.processingStatus}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.flightTestStatus}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.engineeringStatus}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.engineeringAction}</ColumnText>
                    </GridItem>
                </Grid>
            ))}
        </VStack>
    );
};
