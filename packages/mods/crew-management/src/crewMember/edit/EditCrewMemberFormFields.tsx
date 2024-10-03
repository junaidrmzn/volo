import type { ReactElement } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import type { FormControlProps } from "@voloiq/form";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import type { EditCrewMemberSchema } from "./useCrewMemberEditForm";

type EditCrewMemberType = {
    FormControl: (props: FormControlProps<EditCrewMemberSchema>) => ReactElement | null;
    hrId?: string;
};

export const EditCrewMemberFormFields = (props: EditCrewMemberType) => {
    const { hrId, FormControl } = props;
    const { t } = useCrewApiTranslation();
    const canUpdateCrewSensitiveInformation = useIsAuthorizedTo(["update"], ["CrewInformation"]);
    const isHibob: boolean = hrId !== null && hrId !== undefined;

    return (
        <>
            <FormControl
                fieldName="firstName"
                isNotEditable={isHibob}
                additionalInfo={t("crewMember.additionalInfo.firstName")}
            />
            {isHibob && (
                <FormControl
                    fieldName="middleName"
                    isNotEditable
                    additionalInfo={t("crewMember.additionalInfo.middleName")}
                />
            )}
            <FormControl
                fieldName="surName"
                isNotEditable={isHibob}
                additionalInfo={t("crewMember.additionalInfo.lastName")}
            />
            <FormControl
                fieldName="homeBase"
                isNotEditable={isHibob}
                additionalInfo={t("crewMember.additionalInfo.homebase")}
            />
            <FormControl
                fieldName="weight"
                additionalInfo={t("crewMember.additionalInfo.weight")}
                isNotEditable={!canUpdateCrewSensitiveInformation}
            />
            {isHibob && <FormControl fieldName="department" isNotEditable />}
            {isHibob && <FormControl fieldName="entryDate" isNotEditable />}
            {isHibob && <FormControl fieldName="exitDate" isNotEditable />}
            <FormControl
                fieldName="licenseValidUntil"
                additionalInfo={t("crewMember.additionalInfo.licenseIsValidUntil")}
            />
            <FormControl fieldName="medicalCertificateValidUntil" />
            <FormControl fieldName="languageProficiencyValidUntil" />
            <FormControl fieldName="licensedRemotePilotedFlights" />
            <FormControl fieldName="licensedPilotedFlights" />
            <FormControl
                fieldName="email"
                isNotEditable={isHibob}
                additionalInfo={t("crewMember.additionalInfo.email")}
            />
            <FormControl fieldName="phoneNumber" isNotEditable={isHibob} />
            <FormControl fieldName="validFrom" />
            <FormControl fieldName="validTo" />
        </>
    );
};
