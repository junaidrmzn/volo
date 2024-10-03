import { GridItem, Stack, Text, VStack } from "@volocopter/design-library-react";
import type { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export type CrewMemberPreviewNewProps = {
    crewMember: CrewMemberWithNames;
};

export const CrewMemberPreview = (props: CrewMemberPreviewNewProps) => {
    const { crewMember } = props;
    const { t } = useCrewApiTranslation();
    const { formatDateTime } = useFormatDateTime();
    const canReadCrewSensitiveInformation = useIsAuthorizedTo(["read"], ["CrewInformation"]);
    const roleList: string[] = [];
    const numberOfAssignments = crewMember.roleAssignments == null ? 0 : crewMember.roleAssignments?.length;
    for (let index = 0; index < numberOfAssignments; index++) {
        if (crewMember.roleAssignments !== undefined && crewMember.roleAssignments[index] !== undefined)
            roleList.push(crewMember.roleAssignments[index] ?? "-");
    }
    const isHiBob: boolean = crewMember.hrId !== null && crewMember.hrId !== undefined;

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("crewMember.overview.heading")}>
                <PreviewSectionItem
                    label={t("crewMember.model.firstName")}
                    text={crewMember.firstName ?? t("generic.not available")}
                />
                {isHiBob && (
                    <PreviewSectionItem
                        label={t("crewMember.model.middleName")}
                        text={crewMember.middleName ?? t("generic.not available")}
                    />
                )}
                <PreviewSectionItem
                    label={t("crewMember.model.surName")}
                    text={crewMember.surName ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("crewMember.model.hrAccountName")}
                    text={crewMember.hrAccountName ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("crewMember.model.homeBase")}
                    text={crewMember.homebaseName ?? t("generic.not available")}
                />
                <Stack spacing="0">
                    <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                        {t("crewMember.model.email")}
                    </Text>
                    {crewMember.email ? (
                        <Text
                            textDecoration="underline"
                            onClick={() => {
                                window.location.href = `mailto:${crewMember.email}`;
                            }}
                        >
                            {crewMember.email}
                        </Text>
                    ) : (
                        <Text size="medium" overflowWrap="anywhere">
                            {t("generic.not available")}
                        </Text>
                    )}
                </Stack>
                {crewMember.weight != null && (
                    <PreviewSectionItem
                        label={t("crewMember.model.weight")}
                        text={
                            canReadCrewSensitiveInformation
                                ? `${crewMember.weight.toString()} kg`
                                : t("generic.restricted")
                        }
                    />
                )}
                <PreviewSectionItem
                    label={t("crewMember.model.licenseValidUntil")}
                    text={
                        crewMember.licenseValidUntil
                            ? formatDateTime(crewMember.licenseValidUntil)
                            : t("generic.not available")
                    }
                    fullWidth
                />
                <PreviewSectionItem
                    label={t("crewMember.model.medicalCertificateValidUntil")}
                    text={
                        crewMember.medicalCertificateValidUntil
                            ? formatDateTime(crewMember.medicalCertificateValidUntil)
                            : t("generic.not available")
                    }
                    fullWidth
                />
                <PreviewSectionItem
                    label={t("crewMember.model.languageProficiencyValidUntil")}
                    text={
                        crewMember.languageProficiencyValidUntil
                            ? formatDateTime(crewMember.languageProficiencyValidUntil)
                            : t("generic.not available")
                    }
                    fullWidth
                />
                {isHiBob && (
                    <VStack alignItems="flex-start" wordBreak="break-all" width="100%">
                        <PreviewSectionItem
                            label={t("crewMember.model.phoneNumber")}
                            text={crewMember.phoneNumber ?? t("generic.not available")}
                        />
                        <PreviewSectionItem
                            label={t("crewMember.model.department")}
                            text={crewMember.department ?? t("generic.not available")}
                        />
                        <PreviewSectionItem
                            label={t("crewMember.model.entryDate")}
                            text={crewMember.entryTime ?? t("generic.not available")}
                        />
                        <PreviewSectionItem
                            label={t("crewMember.model.exitDate")}
                            text={crewMember.exitTime ?? t("generic.not available")}
                        />
                    </VStack>
                )}
                <GridItem gridColumn="unset">
                    <Stack spacing="0">
                        <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                            {t("crewMember.model.roles")}
                        </Text>
                        {roleList !== undefined && roleList.length > 0 ? (
                            roleList.map((role) => (
                                <Text size="medium" overflowWrap="anywhere" key={role}>
                                    {`${role} `}
                                </Text>
                            ))
                        ) : (
                            <Text size="medium" overflowWrap="anywhere">
                                {t("generic.not available")}
                            </Text>
                        )}
                    </Stack>
                </GridItem>
            </PreviewSection>
        </VStack>
    );
};
