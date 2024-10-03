import { VStack } from "@volocopter/design-library-react";
import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type ChargingStationPreviewProps = {
    chargingStation: ChargingStation;
};

export const ChargingStationPreview = (props: ChargingStationPreviewProps) => {
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();

    const { chargingStation } = props;
    const {
        name,
        validFrom,
        validTo,
        chargingStationStatus,
        vertiport,
        id,
        transferTimeVtol,
        transferTimeStorage,
        maxPower,
        nrSlots,
        facilityId,
        edgeDeviceId,
    } = chargingStation;
    const validFromFormatted = formatToShortDateTime(validFrom);
    const validToFormatted = validTo ? formatToShortDateTime(validTo) : "-";

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("charging-station.overview.general")}>
                <PreviewSectionItem label={t("charging-station.model.name")} text={name} fullWidth />
                <PreviewSectionItem label={t("charging-station.model.validFrom")} text={validFromFormatted} />
                <PreviewSectionItem label={t("charging-station.model.validTo")} text={validToFormatted} />
                <PreviewSectionItem label={t("charging-station.model.status")} text={chargingStationStatus} />
                <PreviewSectionItem label={t("charging-station.model.vertiport")} text={vertiport?.name} />
                <PreviewSectionItem label={t("charging-station.model.facilityId")} text={facilityId} />
                <PreviewSectionItem label={t("charging-station.model.edgeDeviceId")} text={edgeDeviceId} />
            </PreviewSection>

            <PreviewSection headerLabel={t("charging-station.overview.statistics")}>
                <PreviewSectionItem label={t("charging-station.model.id")} text={id} fullWidth />
                <PreviewSectionItem label={t("charging-station.model.nrSlots")} text={nrSlots.toString()} />
                <PreviewSectionItem label={t("charging-station.model.maxPower")} text={maxPower.toString()} />
                <PreviewSectionItem
                    label={t("charging-station.model.transferTimeStorage")}
                    text={transferTimeStorage.toString()}
                />
                <PreviewSectionItem
                    label={t("charging-station.model.transferTimeVtol")}
                    text={transferTimeVtol.toString()}
                />
            </PreviewSection>
        </VStack>
    );
};
