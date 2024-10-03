import { isAfter, isBefore } from "date-fns";
import Heap from "heap";

export type TimeSchedulerItem<T> = {
    startDate: Date;
    endDate: Date;
} & T;

export type TimeSchedulerItemRow<T> = TimeSchedulerItem<T>[];
type HeapEntry<T> = { rowIndex: number; itemRow: TimeSchedulerItemRow<T> };

const sortItemsAscendingByStartDate = <T>(itemA: TimeSchedulerItem<T>, itemB: TimeSchedulerItem<T>) =>
    itemA.startDate.getTime() - itemB.startDate.getTime();

const getLastElementInArray = <T>(array?: T[]) => array && array[array.length - 1];

const earliestEndDateItemRowComparator = <T>(entryA: HeapEntry<T>, entryB: HeapEntry<T>) =>
    (getLastElementInArray(entryA.itemRow)?.endDate?.getTime() ?? 0) -
    (getLastElementInArray(entryB.itemRow)?.endDate?.getTime() ?? 0);

export const addItemsToRows = <T>(items: TimeSchedulerItem<T>[], itemRows: TimeSchedulerItemRow<T>[] = []) => {
    const earliestEndDateHeap = new Heap<HeapEntry<T>>(earliestEndDateItemRowComparator);
    const sortedItems = [...items].sort(sortItemsAscendingByStartDate);
    const sortedItemRows = [...itemRows].map((itemRow) => itemRow.sort(sortItemsAscendingByStartDate));

    for (let rowIndex = 0; rowIndex < sortedItemRows.length; rowIndex++) {
        earliestEndDateHeap.push({ rowIndex, itemRow: [] });
    }

    const addToHeap = (item: TimeSchedulerItem<T>, itemRow: TimeSchedulerItemRow<T>, rowIndex: number) => {
        const firstElementInRow = sortedItemRows[rowIndex]?.[0];
        if (!firstElementInRow || isAfter(firstElementInRow.startDate, item.endDate)) {
            itemRow.push(item);
            earliestEndDateHeap.push({ rowIndex, itemRow });
            sortedItems.splice(0, 1);
        } else {
            itemRow.push(firstElementInRow);
            earliestEndDateHeap.push({ rowIndex, itemRow });
            sortedItemRows[rowIndex]!.splice(0, 1);
        }
    };

    while (sortedItems.length > 0) {
        const itemToAdd = sortedItems[0]!;
        const frontOfHeap = earliestEndDateHeap.peek();

        if (frontOfHeap === undefined) {
            addToHeap(itemToAdd, [], 0);
            continue;
        }
        const { rowIndex, itemRow } = frontOfHeap;
        const lastItem = getLastElementInArray(itemRow)!;

        if (!lastItem || isBefore(lastItem.endDate, itemToAdd.startDate)) {
            const { itemRow } = earliestEndDateHeap.pop()!;
            addToHeap(itemToAdd, itemRow, rowIndex);
        } else {
            const itemRow = [itemToAdd];
            earliestEndDateHeap.push({ rowIndex: earliestEndDateHeap.size(), itemRow });
            sortedItems.splice(0, 1);
        }
    }

    const itemRowsAfterInsertion = earliestEndDateHeap
        .toArray()
        .sort((entryA, entryB) => entryA.rowIndex - entryB.rowIndex)
        .map((entry) => entry.itemRow);

    for (const [index, itemRow] of sortedItemRows.entries()) {
        itemRowsAfterInsertion[index]!.push(...itemRow);
    }

    return itemRowsAfterInsertion;
};
