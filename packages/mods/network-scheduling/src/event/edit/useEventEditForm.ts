import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import { useEventForm } from "../hooks/useEventForm";

type EditFormType = {
    resource: Event;
};

export const useEventEditForm = (props: EditFormType) => {
    const { resource: event } = props;

    const { FormControl, eventSchema, isEventSchemaFieldName, setEventStartDate, setEventEndDate } = useEventForm({
        initEventStartDate: event?.startDate,
        initEventEndDate: event?.endDate,
    });

    const eventName: string = event?.name ?? "n/a";

    const eventInitialValues = {
        ...event,
        startDate: event?.startDate ? new Date(event?.startDate) : undefined,
        endDate: event?.endDate ? new Date(event?.endDate) : undefined,
        description: event?.description ?? "",
        aircraft: { value: event?.aircraftId },
    };

    return {
        FormControl,
        eventSchema,
        eventInitialValues,
        eventName,
        isEventSchemaFieldName,
        setEventStartDate,
        setEventEndDate,
    };
};
