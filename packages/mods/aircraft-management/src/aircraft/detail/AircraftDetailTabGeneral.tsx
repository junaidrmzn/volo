import { VStack } from "@volocopter/design-library-react";
import { Service } from "@voloiq-typescript-api/aircraft-management-types/dist";
import { match } from "ts-pattern";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { DetailItem } from "../../components";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";

type AircraftDetailGeneralProps = {
    aircraft: Aircraft;
};

export const AircraftDetailTabGeneral = (props: AircraftDetailGeneralProps) => {
    const { aircraft } = props;
    const { t } = useAircraftTranslation();
    const { formatDateTime } = useFormatDateTime();

    const serviceValue = aircraft?.services
        ?.map((service) =>
            match(service)
                .with(Service.CARGO, () => t("model.service Cargo"))
                .with(Service.PASSENGER, () => t("model.service Passenger"))
                .with(Service.TEST, () => t("model.service Test"))
                .with(Service.TRAINING, () => t("model.service Training"))
                .with(Service.FERRY_FLIGHT, () => t("model.service FerryFlight"))
                .with(Service.CARPOOL, () => t("model.service Carpool"))
                .with(Service.UNKNOWN, () => t("model.unknown"))
                .exhaustive()
        )
        .join(", ");
    return (
        <VStack padding="6" alignItems="flex-start" fontWeight="400" fontSize="16">
            <DetailItem label={t("model.aircraftType")} value={aircraft?.aircraftTypeName} />
            <DetailItem label={t("model.registration")} value={aircraft?.registration || "N/A"} />
            <DetailItem label={t("model.service")} value={serviceValue} />
            <DetailItem
                label={t("model.validFrom")}
                value={aircraft.validFrom ? formatDateTime(aircraft.validFrom) : ""}
            />
            <DetailItem label={t("model.validTo")} value={aircraft.validTo ? formatDateTime(aircraft.validTo) : ""} />
            <DetailItem label={t("model.technicalStatus")} value={aircraft?.technicalStatus} />
            <DetailItem label={t("model.homebase")} value={aircraft?.homebaseVertiportName} />
            <DetailItem label={t("model.crewConfiguration")} value={aircraft?.crewConfiguration} />
            <DetailItem label={t("model.passengerSeats")} value={aircraft?.passengerSeats} />
            {aircraft.synchronizedWithLeon && (
                <>
                    <DetailItem label={t("source")} value={t("leon")} />
                    <DetailItem
                        label={t("lastSynchronizedAt")}
                        value={aircraft.lastSynchronizedAt ? formatDateTime(aircraft.lastSynchronizedAt) : "-"}
                    />
                </>
            )}
            <DetailItem label={t("model.createBy")} value={aircraft?.createdBy} />
            <DetailItem label={t("model.createTime")} value={formatDateTime(aircraft?.createTime)} />
            <DetailItem label={t("model.updatedBy")} value={aircraft?.updatedBy} />
            <DetailItem label={t("model.updateTime")} value={formatDateTime(aircraft?.updateTime)} />
        </VStack>
    );
};
