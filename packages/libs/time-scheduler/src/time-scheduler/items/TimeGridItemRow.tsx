import { Box, useColorModeValue } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { match } from "ts-pattern";
import { add } from "../../time-utils/add";
import { useItemRowHeight } from "../scheduler-row-height/useItemRowHeight";
import { useTimeSchedulerConfig } from "../time-scheduler-config/useTimeSchedulerConfig";
import { useTimeSchedulerState } from "../time-scheduler-state/useTimeSchedulerState";
import { TimeGridItem } from "./TimeGridItem";
import type { TimeGridItemProps } from "./TimeGridItem";
import { TimeGridExpandedItem } from "./expanded-items/TimeGridExpandedItem";
import { useExpandedItemRows } from "./expanded-items/useExpandedItemRows";
import { isItemOutsideRenderedRange } from "./isItemOutsideRenderedRange";
import { useItemRows } from "./useItemRows";
import { useTimeSchedulerRowItems } from "./useTimeSchedulerRowItems";

export type TimeGridItemRowProps = {
    row: ReactElement;
    gridItemZIndex: string;
} & Pick<TimeGridItemProps, "schedulerRowIndex">;

export const TimeGridItemRow = (props: TimeGridItemRowProps) => {
    const { row, gridItemZIndex = "auto", schedulerRowIndex } = props;
    const { startDate, unitCount, timeUnit } = useTimeSchedulerState();
    const endDate = add(startDate, { [timeUnit]: unitCount });
    const backgroundColor = useColorModeValue("monochrome.100", "gray.800");

    const timeSchedulerRowItems = useTimeSchedulerRowItems(row);

    const { rowItemHeight } = useTimeSchedulerConfig();

    const itemRows = useItemRows({ items: timeSchedulerRowItems });
    const groupedItemRows = useExpandedItemRows({ itemRows });
    const { getItemRowHeightProps, getGridItemHeightProps } = useItemRowHeight({
        schedulerRowIndex,
        rowItemHeight,
    });

    return (
        <Box
            width="100%"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            background={backgroundColor}
            {...getGridItemHeightProps()}
        >
            {groupedItemRows.map((itemRow, rowIndex) => {
                const widthOfPreviousItemRef = {
                    current: 0,
                };
                return (
                    <Box
                        zIndex={gridItemZIndex}
                        // eslint-disable-next-line react/no-array-index-key
                        key={rowIndex}
                        width="100%"
                        position="relative"
                        {...getItemRowHeightProps(rowIndex)}
                    >
                        {itemRow.map((item) =>
                            match(item)
                                .when(
                                    (item) =>
                                        isItemOutsideRenderedRange({ item, renderedRange: { startDate, endDate } }),
                                    () => null
                                )
                                .with({ isExpanded: true }, (item) => (
                                    <TimeGridExpandedItem
                                        key={item.isGrouped ? item.items.map((item) => item.id).join(".") : item.id}
                                        id="1"
                                        widthOfPreviousItemsRef={widthOfPreviousItemRef}
                                        expandedItem={item}
                                        timeLineRange={{ startDate, endDate }}
                                        itemRowIndex={rowIndex}
                                        schedulerRowIndex={schedulerRowIndex}
                                    />
                                ))
                                .with({ isExpanded: false }, (item) => (
                                    <TimeGridItem
                                        key={item.id}
                                        itemRowIndex={rowIndex}
                                        schedulerRowIndex={schedulerRowIndex}
                                        widthOfPreviousItemsRef={widthOfPreviousItemRef}
                                        timeLineRange={{ startDate, endDate }}
                                        {...item}
                                    />
                                ))
                                .exhaustive()
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};
