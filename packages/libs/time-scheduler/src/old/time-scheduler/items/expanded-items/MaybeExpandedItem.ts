import type { Item } from "../item";

export type ExpandedItemGroup = {
    isExpanded: true;
    isGrouped: true;
    items: Item[];
};

export type ExpandedItem = {
    isExpanded: true;
    isGrouped: false;
} & Item;

export type RegularItem = {
    isExpanded: false;
    isGrouped: false;
} & Item;

export const isExpandedItem = (item: unknown): item is ExpandedItem =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    !!item && (item as ExpandedItem).isExpanded && !(item as ExpandedItem).isGrouped;

export const isExpandedItemGroup = (item: unknown): item is ExpandedItemGroup =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    !!item && (item as ExpandedItemGroup).isExpanded && (item as ExpandedItemGroup).isGrouped;

export type MaybeExpandedItem = ExpandedItemGroup | ExpandedItem | RegularItem;
