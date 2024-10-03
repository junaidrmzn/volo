import { useEffect, useState } from "react";
import { useTimeSchedulerState } from "../../time-scheduler-state/useTimeSchedulerState";
import type { ItemRows } from "../item";
import type { MaybeExpandedItem } from "./MaybeExpandedItem";
import { mapItemToExpandedItem } from "./mapItemToExpandedItem";

export type UseExpandedItemRowsProps = {
    itemRows: ItemRows;
};
export const useExpandedItemRows = (props: UseExpandedItemRowsProps) => {
    const { itemRows } = props;

    const { baseSizeOfOneMinuteInPx, zoomFactor } = useTimeSchedulerState();
    const [expandedItemRows, setExpandedItemRows] = useState<MaybeExpandedItem[][]>([]);

    useEffect(() => {
        const nextExpandedItemRows = itemRows.map((itemRow) => {
            const nextExpandedItemRow: MaybeExpandedItem[] = [];
            for (const item of itemRow) {
                const nextIndex = nextExpandedItemRow.length;
                const previousItem = nextExpandedItemRow[nextIndex - 1];
                const { item: insertionItem, overwritesPrevious } = mapItemToExpandedItem({
                    item,
                    previousItem,
                    baseSizeOfOneMinuteInPx,
                    zoomFactor,
                });
                const index = overwritesPrevious ? nextIndex - 1 : nextIndex;
                nextExpandedItemRow[index] = insertionItem;
            }
            return nextExpandedItemRow;
        });
        setExpandedItemRows(nextExpandedItemRows);
    }, [itemRows, baseSizeOfOneMinuteInPx, zoomFactor]);

    return expandedItemRows;
};
