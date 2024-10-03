import type { ReactNode } from "react";
import { createContext } from "react";
import type { Item } from "../items/item";
import type { PersistentSettingsConfiguration } from "../persist-settings/persistentSettingsConfiguration";

export type TimeSchedulerConfigContextType = {
    renderExpandedItems: (items: Item[]) => ReactNode;
    rowItemHeight?: string | number;
} & PersistentSettingsConfiguration;

export const TimeSchedulerConfigContext = createContext<TimeSchedulerConfigContextType | undefined>(undefined);
