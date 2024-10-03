import type { Aircraft, AircraftWithReservations } from "@voloiq-typescript-api/aircraft-management-types";
import { useEffect, useState } from "react";
import { TimeRange } from "@voloiq/time-scheduler";
import { useGetAllAircraftEvents } from "../api-hooks/useAircraftService";

export const useEventForDisplay = (aircraft: Aircraft) => {
    const [events, setEvents] = useState<AircraftWithReservations[]>([]);
    const [timeRange, setTimeRange] = useState<TimeRange>();

    const onRangeUpdate = (range: TimeRange) => setTimeRange(range);

    const { sendRequest: fetchAllEvents } = useGetAllAircraftEvents();

    useEffect(() => {
        (async () => {
            const events = await fetchAllEvents({
                paramsSerializer: (params) => new URLSearchParams(params).toString(),
                params: {
                    start: timeRange?.startDate.toISOString() || aircraft.validFrom,
                    end: timeRange?.endDate.toISOString() || aircraft.validTo,
                    ...(aircraft.id && { filter: `id EQ '${aircraft.id}'` }),
                },
            });

            setEvents(events || []);
        })();
    }, [aircraft.id, aircraft.validFrom, aircraft.validTo, fetchAllEvents, timeRange?.endDate, timeRange?.startDate]);

    return { events, onRangeUpdate };
};
