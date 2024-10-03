import React, { ReactNode } from "react";
import { QuickFiltersContext } from "./QuickFiltersContext";
import { useQuickFiltersState } from "./useQuickFiltersState";

type QuickFiltersProviderProps = {
    children: ReactNode;
};

export const QuickFiltersProvider = (props: QuickFiltersProviderProps) => {
    const { children } = props;

    const { scheduledDate, setScheduledDate, selectedTagState, setSelectedTagState } = useQuickFiltersState();
    return (
        <QuickFiltersContext.Provider
            value={{ selectedTagState, setSelectedTagState, scheduledDate, setScheduledDate }}
        >
            {children}
        </QuickFiltersContext.Provider>
    );
};
