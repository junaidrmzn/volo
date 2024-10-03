import { VStack } from "@volocopter/design-library-react";
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSectionItem } from "@voloiq/text-layouts";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type AircraftTypePreviewProps = {
    aircraftType: AircraftType;
};

export const AircraftTypePreview = (props: AircraftTypePreviewProps) => {
    const { aircraftType } = props;
    const { t } = useResourcesTranslation();
    const { formatDateTime } = useFormatDateTime();

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSectionItem label={t("aircraft-type.model.productLine")} text={aircraftType.productLine} />
            <PreviewSectionItem
                label={t("aircraft-type.model.validFrom")}
                text={formatDateTime(aircraftType.validFrom)}
            />
            <PreviewSectionItem
                label={t("aircraft-type.model.validTo")}
                text={aircraftType?.validTo ? formatDateTime(aircraftType.validTo) : ""}
            />
            <PreviewSectionItem
                label={t("aircraft-type.model.aircraftResources passengerSeats")}
                text={aircraftType?.passengerSeats?.toString()}
            />
            <PreviewSectionItem label={t("aircraft-type.model.aircraftCount")} text={aircraftType.aircraftCount} />
            <PreviewSectionItem
                label={t("aircraft-type.model.aircraftResources performaceModel")}
                text={aircraftType?.performanceModel}
            />
            <PreviewSectionItem
                label={t("aircraft-type.model.aircraftResources maxDurationToCsfl")}
                text={aircraftType?.maxDurationToCsfl?.toString()}
            />
        </VStack>
    );
};
