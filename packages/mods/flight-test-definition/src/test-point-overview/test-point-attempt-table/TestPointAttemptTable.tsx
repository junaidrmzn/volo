import type { StackProps } from "@volocopter/design-library-react";
import { Divider, Grid, GridItem, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { TestPointAttempt } from "@voloiq/flight-test-definition-api/v1";
import { ColumnText } from "./ColumnText";
import { HeaderText } from "./HeaderText";
import { useTestPointAttemptTableTranslation } from "./translations/useTestpointAttemptTableTranslation";

export type TestPointAttemptTableProps = {
    testPointAttempts: TestPointAttempt[];
} & StackProps;
export const TestPointAttemptTable = (props: TestPointAttemptTableProps) => {
    const { testPointAttempts, ...stackProps } = props;
    const { formatDate } = useFormatDateTime();
    const { t } = useTestPointAttemptTableTranslation();
    return (
        <VStack width="full" divider={<Divider />} {...stackProps}>
            <Grid px="3" width="full" alignItems="flex-start" gridAutoFlow="column" templateColumns="repeat(8, 1fr)">
                <GridItem colSpan={1}>
                    <HeaderText>{t("FTO")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Date")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Planning Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Flight Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Evaluation Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Eng. Status")}</HeaderText>
                </GridItem>
                <GridItem colSpan={1}>
                    <HeaderText>{t("Eng. Action Status")}</HeaderText>
                </GridItem>
            </Grid>
            {testPointAttempts.map((testPointAttempt) => (
                <Grid
                    width="full"
                    alignItems="flex-start"
                    gridAutoFlow="column"
                    templateColumns="repeat(8, 1fr)"
                    key={`attempt-${testPointAttempt.ftoId}`}
                    px="3"
                >
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.ftoId}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{formatDate(testPointAttempt.date)}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.planningStatus}</ColumnText>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <ColumnText>{testPointAttempt.flightStatus}</ColumnText>
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
