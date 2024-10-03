import { VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { Parameter } from "../../libs/fti-api/apiModels";
import { getPlaceholderIfUndefined } from "../utils";
import { AircraftSection } from "./aircraft-section/AircraftSection";
import { useFtiPreviewTranslation } from "./translations/useFtiPreviewTranslation";

export type ParameterPreviewProps = {
    parameter: Parameter;
    onStatusChange: () => void;
};
export const ParameterPreview = (props: ParameterPreviewProps) => {
    const { parameter, onStatusChange } = props;
    const {
        aircraftZone,
        sensorType,
        parameterSource,
        ataIspec,
        requesterName,
        unit,
        minValue,
        maxValue,
        accuracy,
        minimumSamplingFrequency,
        description,
        isSafetyOfFlightCritical,
        createTime,
    } = parameter;
    const { t } = useFtiPreviewTranslation();
    const { formatDateTime } = useFormatDateTime();
    return (
        <VStack alignItems="baseline" spacing="8">
            <PreviewSection headerLabel={t("previewLabels.general")}>
                <PreviewSectionItem
                    label={t("previewLabels.aircraftZone")}
                    text={getPlaceholderIfUndefined(aircraftZone.label)}
                />
                <PreviewSectionItem
                    label={t("previewLabels.sensorType")}
                    text={getPlaceholderIfUndefined(sensorType?.label)}
                />
                <PreviewSectionItem
                    label={t("previewLabels.ataIspec2200")}
                    text={getPlaceholderIfUndefined(ataIspec?.label)}
                />
                <PreviewSectionItem
                    label={t("previewLabels.parameterSource")}
                    text={getPlaceholderIfUndefined(parameterSource?.label)}
                />

                <PreviewSectionItem label={t("previewLabels.unit")} text={getPlaceholderIfUndefined(unit?.label)} />
                <PreviewSectionItem label={t("previewLabels.minValue")} text={getPlaceholderIfUndefined(minValue)} />
                <PreviewSectionItem label={t("previewLabels.maxValue")} text={getPlaceholderIfUndefined(maxValue)} />
                <PreviewSectionItem
                    label={t("previewLabels.minSamplingFrequency")}
                    text={getPlaceholderIfUndefined(minimumSamplingFrequency)}
                />
                <PreviewSectionItem label={t("previewLabels.accuracy")} text={getPlaceholderIfUndefined(accuracy)} />
                <PreviewSectionItem
                    label={t("previewLabels.safetyOfFlight")}
                    text={isSafetyOfFlightCritical ? "Yes" : "No"}
                />

                <PreviewSectionItem
                    label={t("previewLabels.description")}
                    text={getPlaceholderIfUndefined(description)}
                    fullWidth
                />

                <PreviewSectionItem
                    label={t("previewLabels.requestedBy")}
                    text={getPlaceholderIfUndefined(requesterName)}
                />
                <PreviewSectionItem label={t("previewLabels.requestedOn")} text={formatDateTime(createTime)} />
            </PreviewSection>
            <AircraftSection parameter={parameter} onStatusChange={onStatusChange} />
        </VStack>
    );
};
