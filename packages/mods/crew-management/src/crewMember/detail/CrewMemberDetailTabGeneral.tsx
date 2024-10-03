import type { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSectionItem } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

type CrewMemberDetailGeneralProps = {
    crewMember: CrewMemberWithNames;
};

export const CrewMemberDetailTabGeneral = (props: CrewMemberDetailGeneralProps) => {
    const { crewMember } = props;

    const { t } = useCrewApiTranslation();
    const { formatDateTime } = useFormatDateTime();
    const canReadCrewSensitiveInformation = useIsAuthorizedTo(["read"], ["CrewInformation"]);
    return (
        <>
            <PreviewSectionItem label={t("crewMember.model.firstName")} text={crewMember.firstName} />
            <PreviewSectionItem label={t("crewMember.model.surName")} text={crewMember.surName} />
            <PreviewSectionItem label={t("crewMember.model.hrAccountName")} text={crewMember.hrAccountName} />
            <PreviewSectionItem label={t("crewMember.model.homeBase")} text={crewMember.homebaseName} />
            <PreviewSectionItem label={t("crewMember.model.email")} text={crewMember.email} />
            <PreviewSectionItem label={t("crewMember.model.phoneNumber")} text={crewMember.phoneNumber} />
            {crewMember.weight != null && (
                <PreviewSectionItem
                    label={t("crewMember.model.weight")}
                    text={
                        canReadCrewSensitiveInformation ? `${crewMember.weight.toString()} kg` : t("generic.restricted")
                    }
                />
            )}
            <PreviewSectionItem
                label={t("crewMember.model.licenseValidUntil")}
                text={crewMember.licenseValidUntil ? formatDateTime(crewMember.licenseValidUntil) : "-"}
            />
            <PreviewSectionItem
                label={t("crewMember.model.medicalCertificateValidUntil")}
                text={
                    crewMember.medicalCertificateValidUntil
                        ? formatDateTime(crewMember.medicalCertificateValidUntil)
                        : "-"
                }
            />
            <PreviewSectionItem
                label={t("crewMember.model.languageProficiencyValidUntil")}
                text={
                    crewMember.languageProficiencyValidUntil
                        ? formatDateTime(crewMember.languageProficiencyValidUntil)
                        : "-"
                }
            />
            {crewMember.synchronizedWithLeon && (
                <>
                    <PreviewSectionItem label={t("source")} text={t("leon")} />
                    <PreviewSectionItem
                        label={t("lastSynchronizedAt")}
                        text={crewMember.lastSynchronizedAt ? formatDateTime(crewMember.lastSynchronizedAt) : "-"}
                    />
                </>
            )}
            <PreviewSectionItem label={t("crewMember.model.createdBy")} text={crewMember.createdBy} />
            <PreviewSectionItem label={t("crewMember.model.createTime")} text={formatDateTime(crewMember.createTime)} />
            <PreviewSectionItem label={t("crewMember.model.updatedBy")} text={crewMember.updatedBy} />
            <PreviewSectionItem label={t("crewMember.model.updateTime")} text={formatDateTime(crewMember.updateTime)} />
        </>
    );
};
