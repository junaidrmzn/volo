import { useState } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import type { tagState } from "./QuickFiltersContext";

export const useQuickFiltersState = () => {
    const { formatDate } = useFormatDateTime();

    const [selectedTagState, setSelectedTagState] = useState<tagState>("today");
    const [scheduledDate, setScheduledDate] = useState<string>(formatDate(new Date()));

    return { selectedTagState, setSelectedTagState, scheduledDate, setScheduledDate };
};
