import { VStack } from "@volocopter/design-library-react";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";

type aircraftProps = { aircraft: Aircraft };

const AircraftPreview = (props: aircraftProps) => {
    const { aircraft } = props;
    const {
        msn,
        services,
        aircraftTypeName,
        technicalStatus,
        homebaseVertiportName,
        crewConfiguration,
        passengerSeats,
        validFrom,
        validTo,
    } = aircraft;
    const { t } = useAircraftTranslation();

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("model.general")}>
                <PreviewSectionItem label={t("model.aircraftType")} text={aircraftTypeName} />
                <PreviewSectionItem label={t("model.msn")} text={msn} />
                <PreviewSectionItem label={t("model.service")} text={services ? services.join(", ") : ""} />
                <PreviewSectionItem label={t("model.technicalStatus")} text={technicalStatus} />
                <PreviewSectionItem label={t("model.validFrom")} text={validFrom} />
                <PreviewSectionItem label={t("model.validTo")} text={validTo} />
                <PreviewSectionItem label={t("model.homebase")} text={homebaseVertiportName} />
                <PreviewSectionItem label={t("model.crewConfiguration")} text={crewConfiguration} />
                <PreviewSectionItem label={t("model.passengerSeats")} text={passengerSeats?.toString()} />
            </PreviewSection>
        </VStack>
    );
};

export { AircraftPreview };
