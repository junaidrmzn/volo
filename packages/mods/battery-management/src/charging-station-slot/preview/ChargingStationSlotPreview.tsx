import { VStack } from "@volocopter/design-library-react";
import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type ChargingStationSlotPreviewProps = {
    chargingStationSlot: ChargingStationSlot;
};

export const ChargingStationSlotPreview = (props: ChargingStationSlotPreviewProps) => {
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const { chargingStationSlot } = props;
    const {
        name,
        validFrom,
        validTo,
        chargingStation,
        slotNumber,
        chargingStationSlotStatus,
        nrChargeEsu,
        supportedEsuTypes,
    } = chargingStationSlot;
    const validFromFormatted = formatToShortDateTime(validFrom);
    const validToFormatted = validTo ? formatToShortDateTime(validTo) : "-";
    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("charging-station-slot.overview.general")}>
                <PreviewSectionItem label={t("charging-station-slot.model.name")} text={name} fullWidth />
                <PreviewSectionItem label={t("charging-station-slot.model.validFrom")} text={validFromFormatted} />
                <PreviewSectionItem label={t("charging-station-slot.model.validTo")} text={validToFormatted} />
                <PreviewSectionItem
                    label={t("charging-station-slot.model.charging-station-numberslots")}
                    text={chargingStation.nrSlots.toFixed(0)}
                />
                <PreviewSectionItem
                    label={t("charging-station-slot.model.charging-station-slot-unique-number")}
                    text={slotNumber?.toFixed()}
                />
                <PreviewSectionItem
                    label={t("charging-station-slot.model.charging-station-slot-status")}
                    text={chargingStationSlotStatus}
                />
                <PreviewSectionItem
                    label={t("charging-station-slot.model.max-number-esus-charged-parallel")}
                    text={nrChargeEsu.toFixed(0)}
                />
                <PreviewSectionItem
                    label={t("charging-station-slot.model.charging-station-slot-supported-esutypes")}
                    text={supportedEsuTypes?.map((supportedEsu) => `${supportedEsu.name}`).join(", ") || undefined}
                    fullWidth
                />
            </PreviewSection>
        </VStack>
    );
};
