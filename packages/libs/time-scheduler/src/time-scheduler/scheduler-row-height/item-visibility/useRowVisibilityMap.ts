import merge from "lodash.merge";
import { useCallback, useRef, useState } from "react";

export type ItemId = string;
export type ItemRowIndex = number;
export type SchedulerRowIndex = number;
export type VisibleItemsInRow = Record<ItemId, ItemRowIndex>;
export type VisibleItems = Record<SchedulerRowIndex, VisibleItemsInRow>;
export type VisibleItemRowIndices = number[];
export type SchedulerRowVisibilityMap = Record<SchedulerRowIndex, VisibleItemRowIndices>;
export type ToggleItemVisibility = (
    itemId: string,
    itemRowIndex: number,
    schedulerRowIndex: number,
    isVisible: boolean
) => void;

const getVisibleItemRowIndices = (visibleItems: VisibleItemsInRow) => [...new Set(Object.values(visibleItems))];

export const useRowVisibilityMap = () => {
    const [schedulerRowVisibilityMap, setSchedulerRowVisibilityMap] = useState<SchedulerRowVisibilityMap>({});
    const visibleItemsRef = useRef<VisibleItems>({});

    const toggleItemVisibility: ToggleItemVisibility = useCallback(
        (itemId, itemRowIndex, schedulerRowIndex, isVisible) => {
            if (isVisible) {
                merge(visibleItemsRef.current, { [schedulerRowIndex]: { [itemId]: itemRowIndex } });
            } else {
                delete visibleItemsRef.current[schedulerRowIndex]?.[itemId];
            }
            setSchedulerRowVisibilityMap((currentState) => ({
                ...currentState,
                [schedulerRowIndex]: getVisibleItemRowIndices(visibleItemsRef.current[schedulerRowIndex] ?? {}),
            }));
        },
        [setSchedulerRowVisibilityMap, visibleItemsRef]
    );

    return { schedulerRowVisibilityMap, toggleItemVisibility };
};
