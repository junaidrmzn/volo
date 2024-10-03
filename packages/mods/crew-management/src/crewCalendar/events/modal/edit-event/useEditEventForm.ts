import { useUpdateCrewMemberBlockingTime } from "@voloiq/crew-management-api/v1";
import { FieldName, createFormControl } from "@voloiq/form";
import { useRequestWithErrorHandling } from "../../../../errors/useRequestWithErrorHandling";
import { useEventFormFields } from "../useEventFormFields";

type UseEditEventFormOptions = {
    crewMemberId: string;
    blockingTimeId: string;
};

export const useEditEventForm = (options: UseEditEventFormOptions) => {
    const { crewMemberId, blockingTimeId } = options;
    const { eventFormFieldsSchema } = useEventFormFields();
    const FormControl = createFormControl<typeof eventFormFieldsSchema>();

    const { sendRequestUpdateCrewMemberBlockingTime, isLoadingUpdateCrewMemberBlockingTime } =
        useUpdateCrewMemberBlockingTime({ crewMemberId, blockingTimeId });

    const isFieldNameUpdateCalenderBlockingTime = (
        attribute: unknown
    ): attribute is FieldName<typeof eventFormFieldsSchema> =>
        Object.keys(eventFormFieldsSchema.describe().fields).includes(
            attribute as FieldName<typeof eventFormFieldsSchema>
        );

    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequestUpdateCrewMemberBlockingTime,
        schema: eventFormFieldsSchema,
        isFieldName: isFieldNameUpdateCalenderBlockingTime,
    });

    return { eventFormFieldsSchema, FormControl, makeRequestWithErrorHandling, isLoadingUpdateCrewMemberBlockingTime };
};
