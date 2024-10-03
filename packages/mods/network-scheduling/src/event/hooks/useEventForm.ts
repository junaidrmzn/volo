import { useEffect, useMemo, useState } from "react";
import type { FieldName } from "@voloiq/form";
import { bool, createFormControl, datetime, object, select, string, textarea } from "@voloiq/form";
import { Aircraft } from "@voloiq/network-scheduling-management-api/v1";
import { useGetAllAircraftWithinValidity } from "../../api-hooks/useNetworkSchedulingService";
import type { EventTranslationFunction } from "../translations/useEventTranslation";
import { useEventTranslation } from "../translations/useEventTranslation";

const eventSchemaFactory = (eventTranslation: EventTranslationFunction, aircraft: Aircraft[]) => {
    const aircraftOptions = aircraft.map((aircraft) => ({
        value: aircraft.aircraftId,
        label: `${aircraft.msn}${aircraft.registration ? ` (${aircraft.registration})` : ""} - ${
            aircraft.aircraftTypeName
        }`,
    }));

    return object({
        name: string()
            .required(eventTranslation("generic.required error"))
            .max(20, eventTranslation("generic.maxLength error"))
            .label(eventTranslation("model.name")),
        startDate: datetime()
            .required(eventTranslation("generic.required error"))
            .label(eventTranslation("model.startDate")),
        endDate: datetime()
            .required(eventTranslation("generic.required error"))
            .label(eventTranslation("model.endDate")),
        description: textarea()
            .max(255, eventTranslation("generic.maxLength error"))
            .label(eventTranslation("model.description")),
        isBlockedForMission: bool().label(eventTranslation("model.blockedForMission")),
        aircraft: select({
            options: aircraftOptions,
            errorMessage: eventTranslation("generic.dropdown error"),
            placeholder: eventTranslation("generic.dropdown error"),
        }).label(eventTranslation("model.aircraft")),
    });
};

type EventSchema = ReturnType<typeof eventSchemaFactory>;

export type UseEventFormProps = {
    initEventStartDate?: string;
    initEventEndDate?: string;
};

export const useEventForm = (props: UseEventFormProps) => {
    const { initEventStartDate, initEventEndDate } = props;
    const [eventStartDate, setEventStartDate] = useState(initEventStartDate);
    const [eventEndDate, setEventEndDate] = useState(initEventEndDate);

    useEffect(() => {
        setEventStartDate(initEventStartDate);
    }, [initEventStartDate, setEventStartDate]);

    useEffect(() => {
        setEventEndDate(initEventEndDate);
    }, [initEventEndDate, setEventEndDate]);

    const { t: eventTranslation } = useEventTranslation();

    const { data: aircraft } = useGetAllAircraftWithinValidity(eventStartDate, eventEndDate);

    const eventSchema = useMemo(
        () => eventSchemaFactory(eventTranslation, aircraft || []),
        [eventTranslation, aircraft]
    );
    const isEventSchemaFieldName = (attribute: unknown): attribute is FieldName<EventSchema> =>
        Object.keys(eventSchema.describe().fields).includes(attribute as FieldName<EventSchema>);

    const FormControl = createFormControl<typeof eventSchema>();

    return { FormControl, eventSchema, isEventSchemaFieldName, setEventStartDate, setEventEndDate };
};
