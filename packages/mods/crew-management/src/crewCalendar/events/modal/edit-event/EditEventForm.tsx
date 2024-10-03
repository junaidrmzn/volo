import { Button, HStack, VStack } from "@volocopter/design-library-react";
import { CrewMemberCalenderBlockingTime, CrewMemberCalenderBlockingTimeBase } from "@voloiq/crew-management-api/v1";
import { FormProvider } from "@voloiq/form";
import { toLocalDate } from "@voloiq/utils";
import { useCrewApiTranslation } from "../../../../translations/useCrewApiTranslation";
import { useEditEventForm } from "./useEditEventForm";

type EditEventFormProps = {
    onClose: () => void;
    crewMemberId: string;
    event: CrewMemberCalenderBlockingTime;
    refetchCrewMembersCalendars: () => void;
};

export const EditEventForm = (props: EditEventFormProps) => {
    const { onClose, crewMemberId, event, refetchCrewMembersCalendars } = props;
    const { t } = useCrewApiTranslation();
    const { eventFormFieldsSchema, FormControl, makeRequestWithErrorHandling, isLoadingUpdateCrewMemberBlockingTime } =
        useEditEventForm({ crewMemberId, blockingTimeId: event.id });

    return (
        <FormProvider
            formId="editEventForm"
            schema={eventFormFieldsSchema}
            initialValues={{
                title: event.title,
                startTime: toLocalDate(new Date(event.startTime || "")),
                endTime: toLocalDate(new Date(event.endTime || "")),
                blockedForMission: event.isBlockedForMission,
            }}
            formType="edit"
            onEdit={async (formData) => {
                const data: CrewMemberCalenderBlockingTimeBase = {
                    title: formData.title,
                    startTime: formData.startTime.toISOString(),
                    endTime: formData.endTime.toISOString(),
                    "event-type": event["event-type"] || "OTHER",
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
                    form="editEventForm"
                    type="submit"
                    isDisabled={isLoadingUpdateCrewMemberBlockingTime}
                    isLoading={isLoadingUpdateCrewMemberBlockingTime}
                >
                    {t("calendar.modal.save")}
                </Button>
            </HStack>
        </FormProvider>
    );
};
