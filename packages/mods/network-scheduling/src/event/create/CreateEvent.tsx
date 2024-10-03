import { Box } from "@volocopter/design-library-react";
import type { EventCreate } from "@voloiq-typescript-api/network-scheduling-types";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useCreateEvent } from "../../api-hooks/useNetworkSchedulingService";
import { useRequestWithErrorHandling } from "../errors/useRequestWithErrorHandling";
import { useEventForm } from "../hooks/useEventForm";

const isDate = (object: unknown): object is Date => {
    return object instanceof Date;
};

type AircraftEventProps = RenderAddHandlerProps;

export const CreateEvent = (props: AircraftEventProps) => {
    const { formRef } = props;
    const { FormControl, eventSchema, isEventSchemaFieldName, setEventStartDate, setEventEndDate } = useEventForm({});

    const { sendRequest } = useCreateEvent();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        schema: eventSchema,
        isFieldName: isEventSchemaFieldName,
    });

    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                formId="eventCreateForm"
                schema={eventSchema}
                formRef={formRef}
                formType="create"
                onCreate={(formData) => {
                    const data: EventCreate = {
                        name: formData.name,
                        startDate: formData.startDate ? formData.startDate.toISOString() : "",
                        endDate: formData.endDate ? formData.endDate.toISOString() : "",
                        description: formData.description,
                        isBlockedForMission: formData.isBlockedForMission ?? false,
                        aircraftId: formData.aircraft?.value,
                    };
                    return makeRequestWithErrorHandling(data);
                }}
            >
                <FormControl fieldName="name" />
                <FormControl
                    fieldName="startDate"
                    onClose={(data) => {
                        if (isDate(data)) {
                            setEventStartDate(data.toISOString());
                        }
                    }}
                />
                <FormControl
                    fieldName="endDate"
                    onClose={(data) => {
                        if (isDate(data)) {
                            setEventEndDate(data.toISOString());
                        }
                    }}
                />
                <FormControl fieldName="description" />
                <FormControl fieldName="isBlockedForMission" />
                <FormControl fieldName="aircraft" />
            </FormProvider>
        </Box>
    );
};
