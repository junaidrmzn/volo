import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { datetime, object, select } from "@voloiq/form";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export const useMissionBulkEdit = () => {
    const { t } = useMissionTranslations();

    const missionBulkEditSchema = object({
        property: select({
            options: [
                { value: "statusOfMission", label: t("mission-status.caption") },
                { value: "scheduledArrivalDateTime", label: t("Arrival date") },
                { value: "scheduledDepartureDateTime", label: t("Departure date") },
                { value: "estimatedArrivalDateTime", label: t("Arrival estimated") },
                { value: "estimatedDepartureDateTime", label: t("Departure estimated") },
                { value: "actualArrivalDateTime", label: t("Arrival actual") },
                { value: "actualDepartureDateTime", label: t("Departure actual") },
            ],
            placeholder: "Select property",
            errorMessage: "Error property",
        }).label(t("property")),

        statusOfMission: select({
            placeholder: t("dropdown placeholder"),
            options: [
                { value: StatusOfMission.PLANNED, label: t("mission-status.PLANNED") },
                { value: StatusOfMission.CANCELLED, label: t("mission-status.CANCELLED") },
                { value: StatusOfMission.BOARDING, label: t("mission-status.BOARDING") },
                { value: StatusOfMission.FLYING, label: t("mission-status.FLYING") },
                { value: StatusOfMission.DIVERTED, label: t("mission-status.DIVERTED") },
                { value: StatusOfMission.PERFORMED, label: t("mission-status.PERFORMED") },
                { value: StatusOfMission.CLOSED, label: t("mission-status.CLOSED") },
                { value: StatusOfMission.UNKNOWN, label: t("mission-status.UNKNOWN") },
            ],
            errorMessage: t("dropdown error"),
        }).label(t("changeTo")),
        scheduledArrivalDateTime: datetime().label(t("changeTo")),
        scheduledDepartureDateTime: datetime().label(t("changeTo")),
        estimatedArrivalDateTime: datetime().label(t("changeTo")),
        estimatedDepartureDateTime: datetime().label(t("changeTo")),
        actualArrivalDateTime: datetime().label(t("changeTo")),
        actualDepartureDateTime: datetime().label(t("changeTo")),
    });

    return { missionBulkEditSchema };
};
