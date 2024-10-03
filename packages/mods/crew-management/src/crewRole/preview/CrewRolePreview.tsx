import { VStack } from "@volocopter/design-library-react";
import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { PreviewSectionCheckbox } from "./PreviewSectionCheckbox";

export type CrewRolePreviewProps = {
    crewRole: CrewRole;
};

export const CrewRolePreview = (props: CrewRolePreviewProps) => {
    const { crewRole } = props;
    const { t } = useCrewApiTranslation();
    const { formatDateTime } = useFormatDateTime();
    const validFrom = formatDateTime(crewRole.validFrom);
    const validTo = crewRole.validTo ? formatDateTime(crewRole.validTo) : "-";

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("crewRole.overview.heading")}>
                <PreviewSectionItem label={t("crewRole.model.description")} text={crewRole.description} />
                <PreviewSectionCheckbox
                    label={t("crewRole.model.requiresAircraftType")}
                    isChecked={Boolean(crewRole.requiresAircraftType)}
                />
                <PreviewSectionCheckbox
                    label={t("crewRole.model.requiresWeight")}
                    isChecked={Boolean(crewRole.requiresWeight)}
                />
                <PreviewSectionCheckbox
                    label={t("crewRole.model.requiresLicense")}
                    isChecked={Boolean(crewRole.requiresLicense)}
                />
                <PreviewSectionCheckbox
                    label={t("crewRole.model.canBecomePilotInCharge")}
                    isChecked={Boolean(crewRole.canBecomePilotInCharge)}
                />
                <PreviewSectionItem label={t("crewRole.model.validFrom")} text={validFrom} />
                <PreviewSectionItem label={t("crewRole.model.validTo")} text={validTo} />
                <PreviewSectionItem label={t("crewRole.model.createdBy")} text={crewRole.createdBy} />
                <PreviewSectionItem label={t("crewRole.model.createTime")} text={formatDateTime(crewRole.createTime)} />
                <PreviewSectionItem label={t("crewRole.model.updatedBy")} text={crewRole.updatedBy} />
                <PreviewSectionItem label={t("crewRole.model.updateTime")} text={formatDateTime(crewRole.updateTime)} />
            </PreviewSection>
        </VStack>
    );
};
