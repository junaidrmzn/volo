import { Button, HStack, VStack } from "@volocopter/design-library-react";
import { CrewMemberCalenderBlockingTimeBase } from "@voloiq/crew-management-api/v1";
import { FormProvider } from "@voloiq/form";
import { useCrewApiTranslation } from "../../../../translations/useCrewApiTranslation";
import { useAddEventForm } from "./useAddEventForm";

type AddEventFormProps = {
    onClose: () => void;
    crewMemberId: string;
    refetchCrewMembersCalendars: () => void;
};

export const AddEventForm = (props: AddEventFormProps) => {
    const { onClose, crewMemberId, refetchCrewMembersCalendars } = props;
    const { t } = useCrewApiTranslation();
    const { eventFormFieldsSchema, FormControl, makeRequestWithErrorHandling, isLoadingAddCrewMemberBlockingTime } =
        useAddEventForm({ crewMemberId });

    return (
        <FormProvider
            formId="addEventForm"
            schema={eventFormFieldsSchema}
            formType="create"
            onCreate={async (formData) => {
                const data: CrewMemberCalenderBlockingTimeBase = {
                    title: formData.title,
                    startTime: formData.startTime.toISOString(),
                    endTime: formData.endTime.toISOString(),
                    "event-type": "OTHER",
                    isBlockedForMission: !!formData.blockedForMission,
                };
                makeRequestWithErrorHandling(data).then(() => {
                    refetchCrewMembersCalendars();
                    onClose();
                });
            }}
        >
            <VStack spacing={3}>
                <FormControl fieldName="title" />
                <FormControl fieldName="startTime" />
                <FormControl fieldName="endTime" />
                <FormControl fieldName="blockedForMission" />
            </VStack>
            <HStack width="full" justifyContent="flex-end">
                <Button onClick={onClose} variant="secondary">
                    {t("calendar.modal.cancel")}
                </Button>
                <Button
                    variant="primary"
                    form="addEventForm"
                    type="submit"
                    isDisabled={isLoadingAddCrewMemberBlockingTime}
                    isLoading={isLoadingAddCrewMemberBlockingTime}
                >
                    {t("calendar.modal.save")}
                </Button>
            </HStack>
        </FormProvider>
    );
};
