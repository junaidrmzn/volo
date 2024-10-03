import { useEffect, useRef, useState } from "react";
import { useGroupedItemRows } from "./grouped-item-rows/useGroupedItemRows";
import type { Item } from "./item";

const getItemIds = (items: Item[]) => items.map((item) => item.id) ?? [];

export type UseItemRowProps<T> = {
    items: Item<T>[];
};
export const useItemRows = <T>(props: UseItemRowProps<T>) => {
    const { items } = props;
    const itemIdsRef = useRef(new Set(getItemIds(items)));
    const { getItemRows, addNewItems } = useGroupedItemRows(items);
    const [itemRows, setItemRows] = useState<Item<T>[][]>(getItemRows());

    useEffect(() => {
        const itemIds = getItemIds(items);
        const newItemIds = itemIds.filter((id) => !itemIdsRef.current.has(id));
        if (newItemIds.length > 0) {
            const newItems = items.filter((item) => newItemIds.includes(item.id)) ?? [];
            addNewItems(newItems);
            for (const id of newItemIds) itemIdsRef.current.add(id);
        }
        setItemRows(
            getItemRows().map((itemRow) =>
                itemRow.filter((item) => items.some((currentItem) => currentItem.id === item.id))
            )
        );
    }, [items, addNewItems, getItemRows]);

    return itemRows;
};
