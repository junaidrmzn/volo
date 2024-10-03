import { useCallback, useRef } from "react";
import type { Item, ItemRow, ItemRows } from "../item";
import type { GroupedItemRows } from "./createGroupedItemRows";
import { createGroupedItemRows } from "./createGroupedItemRows";

const getItemRowsFromGroupedItemRows = <T>(groupedItemRows: GroupedItemRows<T>) => {
    const itemRows: ItemRows<T> = [];
    for (const groupedItemRow of Object.values(groupedItemRows)) {
        itemRows.push(...groupedItemRow);
    }
    return itemRows;
};

export const useGroupedItemRows = <T extends {}>(items: Item<T>[]) => {
    const groupedItemRowsCache = useRef(createGroupedItemRows(items));

    const addNewItems = useCallback((newItems: ItemRow<T>) => {
        groupedItemRowsCache.current = createGroupedItemRows(newItems, groupedItemRowsCache.current);
    }, []);
    const getItemRows = useCallback(() => getItemRowsFromGroupedItemRows(groupedItemRowsCache.current), []);

    return {
        getItemRows,
        addNewItems,
    };
};
