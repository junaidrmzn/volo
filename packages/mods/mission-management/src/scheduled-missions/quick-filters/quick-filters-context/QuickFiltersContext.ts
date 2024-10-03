import { createContext } from "react";

export type tagState = "today" | "tomorrow" | "custom";
export type QuickFiltersContextType = {
    selectedTagState: tagState;
    setSelectedTagState: (tagState: tagState) => void;
    scheduledDate: string;
    setScheduledDate: (date: string) => void;
};

export const QuickFiltersContext = createContext<QuickFiltersContextType | undefined>(undefined);
