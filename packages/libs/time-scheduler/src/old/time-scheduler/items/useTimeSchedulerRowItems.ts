import type { ReactElement } from "react";
import { useMemo } from "react";
import { getTimeSchedulerRowContentChildren } from "./TimeSchedulerRowContent";
import { getTimeSchedulerRowItems } from "./TimeSchedulerRowItem";

export const useTimeSchedulerRowItems = (row: ReactElement) =>
    useMemo(() => {
        const timeSchedulerRowContentChildren = getTimeSchedulerRowContentChildren(row);
        return getTimeSchedulerRowItems(timeSchedulerRowContentChildren).map((element) => element.props);
    }, [row]);
