import { Button, HStack, Heading, Link, Text, VStack } from "@volocopter/design-library-react";
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { DetailItem } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

type AircraftDetailTabFlightplanningProps = {
    aircraftType: AircraftType;
};

export const AircraftTypeDetailTabFlightplanning = (props: AircraftDetailTabFlightplanningProps) => {
    const { aircraftType } = props;

    const { t } = useResourcesTranslation();

    return (
        <>
            <Heading as="h3">{t("aircraft-type.flight attributes")}</Heading>
            <VStack padding="6" alignItems="flex-start" fontWeight="400" fontSize="16">
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning climbAcceleration")}
                    value={aircraftType?.climbAcceleration}
                />
                <DetailItem label={t("aircraft-type.model.flightPlanning climbRate")} value={aircraftType?.climbRate} />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning descendAcceleration")}
                    value={aircraftType?.descendAcceleration}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning descendRate")}
                    value={aircraftType?.descendRate}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumAirspeed")}
                    value={aircraftType?.maximumAirspeed}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumLoadFactor")}
                    value={aircraftType?.maximumLoadFactor}
                />

                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumTranslationalAcceleration")}
                    value={aircraftType?.maximumTranslationalAcceleration}
                />

                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumTurnAccelerationInCoordinatedFlight")}
                    value={aircraftType?.maximumTurnAccelerationInCoordinatedFlight}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumTurnRateInCoordinatedFlight")}
                    value={aircraftType?.maximumTurnRateInCoordinatedFlight}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumYawAccelerationInHover")}
                    value={aircraftType?.maximumYawAccelerationInHover}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning maximumYawRateInHover")}
                    value={aircraftType?.maximumYawRateInHover}
                />
                <DetailItem
                    label={t("aircraft-type.model.flightPlanning wakeTurbulenceCategory")}
                    value={aircraftType?.wakeTurbulenceCategory}
                />
            </VStack>
            {aircraftType.performanceDataFileUrl !== undefined && (
                <>
                    <Heading as="h3">{t("aircraft-type.performance data")}</Heading>
                    <VStack padding="6" alignItems="flex-start">
                        <HStack w="full" justifyContent="space-between" align="center">
                            <Text whiteSpace="nowrap">
                                {t("aircraft-type.model.flightPlanning performance data file download")}:
                            </Text>
                            <VStack align="flex-end" spacing={0} maxWidth="max-content">
                                <Link href={aircraftType.performanceDataFileUrl} download="download">
                                    <Button>{t("aircraft-type.model.download")}</Button>
                                </Link>
                            </VStack>
                        </HStack>
                        <DetailItem
                            label={t("aircraft-type.model.flightPlanning performanceDataFileVersion")}
                            value={aircraftType?.performanceDataFileVersion}
                        />
                    </VStack>
                </>
            )}
        </>
    );
};
