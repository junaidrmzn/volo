import { useMemo } from "react";
import { datetime, multiselect, object, select, textarea } from "@voloiq/form";
import type { Aircraft, CrewMember, Location } from "@voloiq/logbook-api/v6";
import { formatDateTimeInputDate } from "../../date";
import { useLogbookTranslation } from "../../translations/useLogbookTranslation";
import { useLogAddTranslation } from "../translations/useLogAddTranslation";

export const useEnterMetadataStepSchema = (aircrafts: Aircraft[], locations: Location[], crewMembers: CrewMember[]) => {
    const { t, i18n } = useLogbookTranslation();
    const { t: tAdd, i18n: i18nAdd } = useLogAddTranslation();
    return useMemo(
        () =>
            object({
                date: datetime({
                    formatDate: formatDateTimeInputDate,
                    placeholder: t("form.dateTimePicker.placeholder"),
                    withUtcTime: true,
                })
                    .required()
                    .label(tAdd("enterMetadataStep.timeOfFlight")),
                aircraftId: select({
                    placeholder: t("form.select.placeholder"),
                    options: aircrafts?.map((aircraft) => ({
                        label: `${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`,
                        value: aircraft.id,
                    })),
                    errorMessage: t("form.select.requiredErrorMessage"),
                })
                    .required()
                    .label(tAdd("enterMetadataStep.aircraft")),
                locationId: select({
                    placeholder: t("form.select.placeholder"),
                    options: locations.map((location) => ({ label: location.icaoCode, value: location.id })),
                    errorMessage: t("form.select.requiredErrorMessage"),
                })
                    .required()
                    .label(tAdd("enterMetadataStep.location")),
                crewPilot: multiselect({
                    placeholder: t("form.multiSelect.placeholder"),
                    options: crewMembers.map((crewMember) => ({
                        label: `${crewMember.firstName} ${crewMember.lastName}`,
                        value: crewMember.id,
                    })),
                    errorMessage: t("form.select.requiredErrorMessage"),
                }).label(tAdd("enterMetadataStep.crewPilotLabel")),
                crewSupervisor: multiselect({
                    placeholder: t("form.multiSelect.placeholder"),
                    options: crewMembers.map((crewMember) => ({
                        label: `${crewMember.firstName} ${crewMember.lastName}`,
                        value: crewMember.id,
                    })),
                    errorMessage: t("form.select.requiredErrorMessage"),
                }).label(tAdd("enterMetadataStep.crewSupervisorLabel")),
                remarks: textarea().label(tAdd("enterMetadataStep.remarks")),
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [aircrafts, crewMembers, locations, i18nAdd, i18n]
    );
};
