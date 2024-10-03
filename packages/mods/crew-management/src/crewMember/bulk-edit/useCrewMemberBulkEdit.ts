import { datetime, object, select } from "@voloiq/form";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export const useCrewMemberBulkEdit = () => {
    const { t } = useCrewApiTranslation();

    const crewMemberBulkEditSchema = object({
        property: select({
            options: [
                { value: "validFrom", label: t("crewMember.model.validFrom") },
                { value: "validTo", label: t("crewMember.model.validTo") },
                { value: "licenseValidUntil", label: t("crewMember.model.licenseValidUntil") },
                { value: "medicalCertificateValidUntil", label: t("crewMember.model.medicalCertificateValidUntil") },
                { value: "languageProficiencyValidUntil", label: t("crewMember.model.languageProficiencyValidUntil") },
                { value: "licensedRemotePilotedFlights", label: t("crewMember.model.licensedRemotePilotedFlights") },
                { value: "licensedPilotedFlights", label: t("crewMember.model.licensedPilotedFlights") },
            ],
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("crewMember.model.property")),

        validFrom: datetime().label(t("crewMember.model.changeTo")),
        validTo: datetime().label(t("crewMember.model.changeTo")),
        licenseValidUntil: datetime().label(t("crewMember.model.changeTo")),
        medicalCertificateValidUntil: datetime().label(t("crewMember.model.changeTo")),
        languageProficiencyValidUntil: datetime().label(t("crewMember.model.changeTo")),
        licensedRemotePilotedFlights: select({
            options: [
                { value: "true", label: t("crewMember.model.licensed") },
                { value: "false", label: t("crewMember.model.unlicensed") },
            ],
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("crewMember.model.changeTo")),
        licensedPilotedFlights: select({
            options: [
                { value: "true", label: t("crewMember.model.licensed") },
                { value: "false", label: t("crewMember.model.unlicensed") },
            ],
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("crewMember.model.changeTo")),
    });

    return { crewMemberBulkEditSchema };
};
