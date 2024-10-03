/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, VStack } from "@volocopter/design-library-react";
import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useEsuSelection } from "./useEsuSelection";

export type ChargingLogPreviewProps = {
    chargingLog: ChargingLog;
    onEsuSelection: any;
};

type FilteredEsuListOption = {
    value: string | undefined;
    label: string | undefined;
};

export const ChargingLogPreview = (props: ChargingLogPreviewProps) => {
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const { chargingLog, onEsuSelection } = props;
    const {
        name,
        validFrom,
        validTo,
        id,
        chargingCycleId,
        chargingStation,
        chargingStationSlot,
        chargingType,
        esuList,
        eventType,
        uploadStatus,
        eventTimestampStart,
        eventTimestampEnd,
    } = chargingLog;
    const validFromFormatted = formatToShortDateTime(validFrom);
    const validToFormatted = validTo ? formatToShortDateTime(validTo) : "-";
    const eventTimestampStartFormatted = eventTimestampStart ? formatToShortDateTime(eventTimestampStart) : "-";
    const eventTimestampEndFormatted = eventTimestampEnd ? formatToShortDateTime(eventTimestampEnd) : "-";
    const { filteredEsuList, selectedEsu, setSelectedEsu } = useEsuSelection(esuList);
    onEsuSelection(selectedEsu);
    const uploadEligibleForReport = uploadStatus === "COMPLETE" || uploadStatus === "INCOMPLETE";

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("charging-log.overview.general")}>
                <PreviewSectionItem label={t("charging-log.model.name")} text={name} />
                <PreviewSectionItem label={t("charging-log.model.validFrom")} text={validFromFormatted} />
                <PreviewSectionItem label={t("charging-log.model.validTo")} text={validToFormatted} />
                <PreviewSectionItem label={t("charging-log.model.id")} text={id} />
                <PreviewSectionItem label={t("charging-log.model.chargingCycleId")} text={chargingCycleId} />
                <PreviewSectionItem label={t("charging-log.model.chargingStationName")} text={chargingStation.name} />
                <PreviewSectionItem
                    label={t("charging-log.model.chargingStationSlotName")}
                    text={chargingStationSlot.name}
                />
                <PreviewSectionItem label={t("charging-log.model.chargingType")} text={chargingType} />
            </PreviewSection>
            {uploadEligibleForReport && (
                <PreviewSectionItem
                    label={t("charging-log.overview.esuSerials")}
                    text={esuList?.map((esu) => `${esu}`).join(", ") || undefined}
                    fullWidth
                />
            )}
            {uploadEligibleForReport && (
                <PreviewSection headerLabel={t("charging-log.overview.esuSerialSelection")} templateColumns="1fr">
                    <Select<FilteredEsuListOption>
                        onChange={(option) => {
                            if (option) {
                                setSelectedEsu(option.value);
                            }
                        }}
                        value={{
                            label: selectedEsu,
                            value: selectedEsu,
                        }}
                        placeholder="Select ESU..."
                        options={filteredEsuList.map((esu) => {
                            return {
                                label: esu,
                                value: esu,
                            };
                        })}
                    />
                </PreviewSection>
            )}
            <PreviewSection headerLabel={t("charging-log.overview.statistics")}>
                <PreviewSectionItem label={t("charging-log.model.eventType")} text={eventType.toString()} />
                <PreviewSectionItem label={t("charging-log.model.uploadStatus")} text={uploadStatus} />
                <PreviewSectionItem
                    label={t("charging-log.model.eventTimestampStart")}
                    text={eventTimestampStartFormatted}
                />
                <PreviewSectionItem
                    label={t("charging-log.model.eventTimestampEnd")}
                    text={eventTimestampEndFormatted}
                />
            </PreviewSection>
        </VStack>
    );
};
