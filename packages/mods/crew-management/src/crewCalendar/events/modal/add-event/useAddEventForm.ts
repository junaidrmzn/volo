import { useAddCrewMemberBlockingTime } from "@voloiq/crew-management-api/v1";
import { FieldName, createFormControl } from "@voloiq/form";
import { useRequestWithErrorHandling } from "../../../../errors/useRequestWithErrorHandling";
import { useEventFormFields } from "../useEventFormFields";

type UseEditEventFormOptions = {
    crewMemberId: string;
};

export const useAddEventForm = (options: UseEditEventFormOptions) => {
    const { crewMemberId } = options;
    const { eventFormFieldsSchema } = useEventFormFields();
    const FormControl = createFormControl<typeof eventFormFieldsSchema>();

    const { sendRequestAddCrewMemberBlockingTime, isLoadingAddCrewMemberBlockingTime } = useAddCrewMemberBlockingTime({
        crewMemberId,
    });

    const isFieldNameAddCalenderBlockingTime = (
        attribute: unknown
    ): attribute is FieldName<typeof eventFormFieldsSchema> =>
        Object.keys(eventFormFieldsSchema.describe().fields).includes(
            attribute as FieldName<typeof eventFormFieldsSchema>
        );

    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequestAddCrewMemberBlockingTime,
        schema: eventFormFieldsSchema,
        isFieldName: isFieldNameAddCalenderBlockingTime,
    });

    return { eventFormFieldsSchema, FormControl, makeRequestWithErrorHandling, isLoadingAddCrewMemberBlockingTime };
};
