import { Box } from "@volocopter/design-library-react";
import type { Event, EventUpdate } from "@voloiq-typescript-api/network-scheduling-types";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { useUpdateEvent } from "../../api-hooks/useNetworkSchedulingService";
import { useRequestWithErrorHandling } from "../errors/useRequestWithErrorHandling";
import { useEventEditForm } from "./useEventEditForm";

const isDate = (object: unknown): object is Date => {
    return object instanceof Date;
};

type EventEditProps = RenderEditHandlerProps<Event>;

export const EditEvent = (props: EventEditProps) => {
    const { formRef, resource } = props;
    const { id: eventId } = resource;
    const { FormControl, eventSchema, eventInitialValues, isEventSchemaFieldName, setEventStartDate, setEventEndDate } =
        useEventEditForm({ resource });
    const { sendRequestById } = useUpdateEvent();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: EventUpdate }) => sendRequestById(eventId || "-1", requestConfig),
        schema: eventSchema,
        isFieldName: isEventSchemaFieldName,
    });

    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                formId="aircraftEditForm"
                schema={eventSchema}
                formType="edit"
                formRef={formRef}
                initialValues={eventInitialValues}
                onEdit={(formData) => {
                    const data: EventUpdate = {
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
                    onChange={(data) => {
                        if (isDate(data)) {
                            setEventStartDate(data.toISOString());
                        }
                    }}
                />
                <FormControl
                    fieldName="endDate"
                    onChange={(data) => {
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
