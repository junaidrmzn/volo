import { differenceInMinutes } from "date-fns";
import type { TimeRange } from "../../scroll/useRangeUpdate";
import type { Item } from "../item";
import { expansionRange } from "./mapItemToExpandedItem";

type CalculateExpandedItemWidthAndOffsetOptions = {
    items: Item[];
    widthOfPreviousItems: number;
    timeLineRange: TimeRange;
    baseSizeOfOneMinuteInPx: number;
    zoomFactor: number;
};
export const calculateExpandedItemWidthAndOffset = (options: CalculateExpandedItemWidthAndOffsetOptions) => {
    const { items, widthOfPreviousItems, timeLineRange, baseSizeOfOneMinuteInPx, zoomFactor } = options;
    const { startDate } = items[0]!;
    const { endDate } = items[items.length - 1]!;
    const { startDate: timeLineStartDate } = timeLineRange;

    const itemWidthInPx = Math.round(differenceInMinutes(endDate, startDate) * baseSizeOfOneMinuteInPx * zoomFactor);
    const expansionDelta = itemWidthInPx < expansionRange ? expansionRange - itemWidthInPx : 0;
    const itemOffset =
        differenceInMinutes(startDate, timeLineStartDate) * baseSizeOfOneMinuteInPx * zoomFactor -
        widthOfPreviousItems -
        expansionDelta / 2;

    return { itemWidthInPx: itemWidthInPx + expansionDelta, itemOffset };
};
