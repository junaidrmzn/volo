import type { Item, ItemRow, ItemRows } from "../item";
import { addItemsToRows } from "./addItemsToRows";

const NO_GROUP = "_no_group";

const getGroups = (items: Item[]) => {
    const groupSet = new Set<string>();
    for (const item of items) {
        groupSet.add(item.group ?? NO_GROUP);
    }
    return [...groupSet];
};

const filterItemsInGroup = (groupIdentifier: string) => (item: Item) => {
    const itemGroup = item.group ?? NO_GROUP;
    const itemIsInGroup = itemGroup === groupIdentifier;
    return itemIsInGroup;
};

export type GroupIdentifier = string;
export type GroupedItemRows<T> = Record<GroupIdentifier, ItemRows<T>>;
export const createGroupedItemRows = <T>(items: ItemRow<T>, existingGroupedItemRows?: GroupedItemRows<T>) => {
    const groups = getGroups(items);
    const groupedItemRows: GroupedItemRows<T> = existingGroupedItemRows ?? {};
    for (const group of groups) {
        const itemsInGroup = items.filter(filterItemsInGroup(group));
        groupedItemRows[group] = addItemsToRows(itemsInGroup, groupedItemRows[group]);
    }
    return groupedItemRows;
};
