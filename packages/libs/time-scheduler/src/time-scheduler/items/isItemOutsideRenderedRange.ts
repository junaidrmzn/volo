import { isAfter, isBefore } from "date-fns";
import type { MaybeExpandedItem } from "./expanded-items/MaybeExpandedItem";

export type IsItemOutsideRenderedRangeProps = {
    item: MaybeExpandedItem;
    renderedRange: {
        startDate: Date;
        endDate: Date;
    };
};
export const isItemOutsideRenderedRange = (props: IsItemOutsideRenderedRangeProps) => {
    const {
        item,
        renderedRange: { startDate, endDate },
    } = props;

    const itemStartDate = item.isGrouped ? item.items[0]!.startDate : item.startDate;
    const itemEndDate = item.isGrouped ? item.items[0]!.endDate : item.endDate;

    return isBefore(itemEndDate, startDate) || isAfter(itemStartDate, endDate);
};
