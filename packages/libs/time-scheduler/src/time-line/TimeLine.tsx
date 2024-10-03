import type { StyleProps } from "@volocopter/design-library-react";
import { Box, Grid, GridItem, useColorModeValue } from "@volocopter/design-library-react";
import type { TimeUnit } from "../time-utils/timeUnit";
import { calculateWidthOfUnit, timeRange } from "../time-utils/timeUtils";
import { useIntervalLabels } from "./useIntervalLabels";
import { formatDateToUnit, isUnitClosestToNow } from "./utils";

export type TimeLineProps = {
    timeUnit: TimeUnit;
    startDate: Date;
    endDate: Date;
    sizeOfOneMinuteInPx: number;
} & StyleProps;

export const TimeLine = (props: TimeLineProps) => {
    const { timeUnit, startDate, endDate, sizeOfOneMinuteInPx, ...styleProps } = props;

    const dates = timeRange(startDate, endDate, timeUnit);
    const { intervalLabels } = useIntervalLabels(dates, timeUnit);
    const gridItemLabelColor = useColorModeValue("darkBlue.500", "monochrome.100");
    const gridItemDateColor = useColorModeValue("darkBlue.800", "monochrome.100");

    return (
        <Grid
            templateColumns={dates
                .map(
                    (date, index) => `${calculateWidthOfUnit(date, timeUnit, sizeOfOneMinuteInPx, startDate, index)}px`
                )
                .join(" ")}
            templateRows="repeat(2, 1fr)"
            alignItems="center"
            width="fit-content"
            {...styleProps}
        >
            {Object.entries(intervalLabels).map(([intervalLabel, units]) => (
                <GridItem
                    colSpan={units}
                    key={intervalLabel}
                    whiteSpace="nowrap"
                    fontWeight="semibold"
                    alignSelf="flex-end"
                    fontSize="xs"
                    lineHeight={3}
                    color={gridItemLabelColor}
                >
                    <Box position="sticky" display="inline" left={1} bottom={2} marginRight={2}>
                        {intervalLabel}
                    </Box>
                </GridItem>
            ))}
            {dates.map((date) => (
                <GridItem
                    fontWeight={isUnitClosestToNow(date, timeUnit) ? "normal" : undefined}
                    textDecoration={isUnitClosestToNow(date, timeUnit) ? "underline" : undefined}
                    textDecorationThickness={isUnitClosestToNow(date, timeUnit) ? "0.2rem" : undefined}
                    key={date.toISOString()}
                    css={{ fontFeatureSettings: "'tnum', 'lnum'" }}
                    fontSize="xxs"
                    data-date={date.toISOString()}
                    data-testid="time-display"
                    lineHeight={3}
                    color={gridItemDateColor}
                >
                    {formatDateToUnit(date, timeUnit)}
                </GridItem>
            ))}
        </Grid>
    );
};
