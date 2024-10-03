import { boolean, datetime, object, string } from "@voloiq/form";
import { useCrewApiTranslation } from "../../../translations/useCrewApiTranslation";

export const useEventFormFields = () => {
    const { t } = useCrewApiTranslation();

    const eventFormFieldsSchema = object({
        title: string().required().label(t("calendar.modal.event")),
        startTime: datetime().required().label(t("calendar.modal.startUTC")),
        endTime: datetime().required().label(t("calendar.modal.endUTC")),
        blockedForMission: boolean().label(t("calendar.modal.blockedForMissiom")),
    });

    return { eventFormFieldsSchema };
};
