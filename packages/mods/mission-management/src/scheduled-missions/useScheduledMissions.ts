import { add } from "date-fns";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import { useGetAllScheduledMissions } from "@voloiq/network-schedule-management-api/v1";
import { useQuickFilters } from "./quick-filters/quick-filters-context/useQuickFilters";

export const useScheduledMissions = () => {
    const { formatDate } = useFormatDateTime();
    const [filter, setFilter] = useState("");

    const { scheduledDate, selectedTagState, setScheduledDate } = useQuickFilters();
    const { data: aircraftAssignments, state } = useGetAllScheduledMissions({
        scheduledDate,
        params: { ...(filter ? { filter } : {}) },
    });

    const handleFilterChange = (filter: string) => setFilter(filter);

    useEffect(() => {
        match(selectedTagState)
            .with("today", () => setScheduledDate(formatDate(new Date())))
            .with("tomorrow", () => setScheduledDate(formatDate(add(new Date(), { days: 1 }))))
            .with("custom", () => scheduledDate)
            .exhaustive();
    }, [formatDate, scheduledDate, selectedTagState, setScheduledDate]);

    return { aircraftAssignments, state, handleFilterChange };
};
