import { datetime, object, select } from "@voloiq/form";
import { useGetAllAircraftWithinValidity } from "../../api-hooks/useNetworkSchedulingService";
import { useEventTranslation } from "../translations/useEventTranslation";

export const useEventBulkEdit = () => {
    const { t } = useEventTranslation();
    const { data: aircraft } = useGetAllAircraftWithinValidity();

    const aircraftOptions = aircraft.map((aircraft) => ({
        value: aircraft.aircraftId,
        label: `${aircraft.msn}${aircraft.registration ? ` (${aircraft.registration})` : ""} - ${
            aircraft.aircraftTypeName
        }`,
    }));

    const eventBulkEditSchema = object({
        property: select({
            options: [
                { value: "startDate", label: t("model.startDate") },
                { value: "endDate", label: t("model.endDate") },
                { value: "isBlockedForMission", label: t("model.blockedForMission") },
                { value: "aircraft", label: t("model.aircraft") },
            ],
            errorMessage: t("generic.dropdown error"),
            placeholder: t("generic.dropdown placeholder"),
        }).label(t("model.property")),

        startDate: datetime().label(t("model.changeTo")),
        endDate: datetime().label(t("model.changeTo")),
        isBlockedForMission: select({
            options: [
                { value: "true", label: t("model.blocked") },
                { value: "false", label: t("model.not blocked") },
            ],
            errorMessage: t("generic.dropdown error"),
            placeholder: t("generic.dropdown placeholder"),
        }).label(t("model.changeTo")),
        aircraft: select({
            options: aircraftOptions,
            errorMessage: t("generic.dropdown error"),
            placeholder: t("generic.dropdown placeholder"),
        }).label(t("model.changeTo")),
    });

    return { eventBulkEditSchema };
};
