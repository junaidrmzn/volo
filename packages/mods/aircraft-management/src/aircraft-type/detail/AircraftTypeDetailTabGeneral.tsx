import { VStack } from "@volocopter/design-library-react";
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { DetailItem } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

type AircraftDetailGeneralProps = {
    aircraftType: AircraftType;
};

export const AircraftTypeDetailTabGeneral = (props: AircraftDetailGeneralProps) => {
    const { aircraftType } = props;
    const { t } = useResourcesTranslation();
    const { formatDateTime } = useFormatDateTime();

    return (
        <VStack padding="6" alignItems="flex-start" fontWeight="400" fontSize="16">
            <DetailItem label={t("aircraft-type.model.productLine")} value={aircraftType?.productLine} />
            <DetailItem
                label={t("aircraft-type.model.validFrom")}
                value={aircraftType.validFrom ? formatDateTime(aircraftType.validFrom) : ""}
            />
            <DetailItem
                label={t("aircraft-type.model.validTo")}
                value={aircraftType.validTo ? formatDateTime(aircraftType.validTo) : ""}
            />
            <DetailItem
                label={t("aircraft-type.model.aircraftResources passengerSeats")}
                value={aircraftType?.passengerSeats}
            />
            <DetailItem label={t("aircraft-type.model.createBy")} value={aircraftType?.createdBy} />
            <DetailItem label={t("aircraft-type.model.createTime")} value={formatDateTime(aircraftType?.createTime)} />
            <DetailItem label={t("aircraft-type.model.updatedBy")} value={aircraftType?.updatedBy} />
            <DetailItem label={t("aircraft-type.model.updateTime")} value={formatDateTime(aircraftType?.updateTime)} />
            <DetailItem
                label={t("aircraft-type.model.aircraftResources performaceModel")}
                value={aircraftType?.performanceModel}
            />
            <DetailItem
                label={t("aircraft-type.model.aircraftResources maxDurationToCsfl")}
                value={aircraftType?.maxDurationToCsfl?.toString() ?? t("aircraft-type.model.unknownValue")}
            />
            <DetailItem
                label={t("aircraft-type.model.aircraftResources voltageThreshold")}
                value={aircraftType?.voltageThreshold?.toString() ?? t("aircraft-type.model.unknownValue")}
            />
        </VStack>
    );
};
