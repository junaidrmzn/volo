import type { ReactNode } from "react";
import { createCompoundComponent } from "@voloiq/utils";
import type { Item } from "./item";

export type TimeSchedulerRowItemProps = Item<{ children: ReactNode }>;
export const { CompoundComponent: TimeSchedulerRowItem, getCompoundComponent: getTimeSchedulerRowItems } =
    createCompoundComponent<TimeSchedulerRowItemProps>();
