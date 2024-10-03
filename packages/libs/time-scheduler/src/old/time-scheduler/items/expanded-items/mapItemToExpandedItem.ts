import { differenceInMinutes, isBefore } from "date-fns";
import { match } from "ts-pattern";
import { add } from "../../../time-utils/add";
import { sub } from "../../../time-utils/sub";
import type { Item } from "../item";
import type { ExpandedItem, ExpandedItemGroup, MaybeExpandedItem, RegularItem } from "./MaybeExpandedItem";
import { isExpandedItem, isExpandedItemGroup } from "./MaybeExpandedItem";

type ZoomOptions = {
    baseSizeOfOneMinuteInPx: number;
    zoomFactor: number;
};

export const expansionRange = 10;

const calculcateItemWidthInPixels = (item: Item, zoomOptions: ZoomOptions) =>
    differenceInMinutes(item.endDate, item.startDate) * zoomOptions.baseSizeOfOneMinuteInPx * zoomOptions.zoomFactor;

const smallItemWidthInPxThreshold = 10;
const isItemTooSmall = (item: Item, zoomOptions: ZoomOptions) =>
    calculcateItemWidthInPixels(item, zoomOptions) < smallItemWidthInPxThreshold;

const convertPixelsToMinutes = (pixels: number, zoomOptions: ZoomOptions) =>
    pixels / (zoomOptions.baseSizeOfOneMinuteInPx * zoomOptions.zoomFactor);

type MatcherValue<PreviousItemType = MaybeExpandedItem | undefined> = {
    item: Item;
    previousItem: PreviousItemType;
    baseSizeOfOneMinuteInPx: number;
    zoomFactor: number;
};
const isRegularSizedItem = (value: MatcherValue) => !isItemTooSmall(value.item, value);
const getStartDatePlusExpansionRange = (item: Item, zoomOptions: ZoomOptions) =>
    sub(item.startDate, {
        minutes: convertPixelsToMinutes(expansionRange - calculcateItemWidthInPixels(item, zoomOptions), zoomOptions),
    });
const getEndDatePlusExpansionRange = (item: Item, zoomOptions: ZoomOptions) =>
    add(item.endDate, {
        minutes: convertPixelsToMinutes(expansionRange - calculcateItemWidthInPixels(item, zoomOptions), zoomOptions),
    });

const isItemInPreviousItemsExpansionRange = (item: Item, previousItem: Item, zoomOptions: ZoomOptions) => {
    const previousItemEndDatePlusExpansionRange = getEndDatePlusExpansionRange(previousItem, zoomOptions);
    const itemStartDatePlusExpansionRange = getStartDatePlusExpansionRange(item, zoomOptions);

    const isPreviousItemInItemsExpansionRange = isBefore(
        itemStartDatePlusExpansionRange,
        previousItemEndDatePlusExpansionRange
    );

    return isPreviousItemInItemsExpansionRange;
};

const isPreviousItemExpandedAndInExpansionRange = (value: MatcherValue): value is MatcherValue<ExpandedItem> => {
    const { previousItem, item } = value;

    if (!isExpandedItem(previousItem)) {
        return false;
    }
    return isItemInPreviousItemsExpansionRange(item, previousItem, value);
};
const isPreviousItemExpandedGroupAndInExpansionRange = (
    value: MatcherValue
): value is MatcherValue<ExpandedItemGroup> => {
    const { previousItem, item } = value;

    if (!isExpandedItemGroup(previousItem)) {
        return false;
    }
    const lastItemInExpandedGroup = previousItem.items[previousItem.items.length - 1]!;

    return isItemInPreviousItemsExpansionRange(item, lastItemInExpandedGroup, value);
};

const createExpandedItem = (item: Item): ExpandedItem => ({ isGrouped: false, isExpanded: true, ...item });
const createExpandedItemGroup = (...items: Item[]): ExpandedItemGroup => ({
    isGrouped: true,
    isExpanded: true,
    items,
});
const createRegularItem = (item: Item): RegularItem => ({ isGrouped: false, isExpanded: false, ...item });

export const mapItemToExpandedItem = (options: MatcherValue) =>
    match(options)
        .when(isRegularSizedItem, (value) => ({
            item: createRegularItem(value.item),
            overwritesPrevious: false,
        }))
        .when(isPreviousItemExpandedAndInExpansionRange, (value) => ({
            item: createExpandedItemGroup(value.previousItem, value.item),
            overwritesPrevious: true,
        }))
        .when(isPreviousItemExpandedGroupAndInExpansionRange, (value) => ({
            item: createExpandedItemGroup(...value.previousItem.items, value.item),
            overwritesPrevious: true,
        }))
        .otherwise((value) => ({
            item: createExpandedItem(value.item),
            overwritesPrevious: false,
        }));
