import { Heading, VStack } from "@volocopter/design-library-react";
import {
    AltitudeValueWithUnit,
    DensityValueWithUnit,
    DistanceValueWithUnit,
    PercentageValueWithUnit,
    SpeedValueWithUnit,
    TemperatureValueWithUnit,
} from "@volocopter/unit-inputs-react";
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { ShortDistanceValueWithUnit } from "@voloiq/distance-unit-input";
import { DetailItem } from "../../components";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

type AircraftDetailTabWeatherProps = {
    aircraftType: AircraftType;
};

export const AircraftTypeDetailTabWeather = (props: AircraftDetailTabWeatherProps) => {
    const { aircraftType } = props;

    const { t } = useResourcesTranslation();

    return (
        <>
            <Heading as="h3">{t("aircraft-type.weather attributes")}</Heading>
            <VStack padding="6" alignItems="flex-start" fontWeight="400" fontSize="16">
                <DetailItem
                    label={t("aircraft-type.model.minimumTemperature")}
                    value={
                        <TemperatureValueWithUnit
                            baseUnit="°C"
                            displayUnit="°C"
                            baseValue={aircraftType?.minimumTemperature}
                        />
                    }
                />
                <DetailItem
                    label={t("aircraft-type.model.maximumTemperature")}
                    value={
                        <TemperatureValueWithUnit
                            baseUnit="°C"
                            displayUnit="°C"
                            baseValue={aircraftType?.maximumTemperature}
                        />
                    }
                />
                <DetailItem
                    label={t("aircraft-type.model.windSpeed")}
                    value={<SpeedValueWithUnit baseUnit="m/s" displayUnit="m/s" baseValue={aircraftType?.windSpeed} />}
                />
                <DetailItem
                    label={t("aircraft-type.model.relativeHumidity")}
                    value={
                        <PercentageValueWithUnit
                            baseUnit="%"
                            displayUnit="%"
                            baseValue={aircraftType?.relativeHumidity}
                        />
                    }
                />
                <DetailItem
                    label={t("aircraft-type.model.rain")}
                    value={<ShortDistanceValueWithUnit baseUnit="mm" displayUnit="mm" baseValue={aircraftType?.rain} />}
                />
                <DetailItem
                    label={t("aircraft-type.model.visibility")}
                    value={<DistanceValueWithUnit baseUnit="m" displayUnit="m" baseValue={aircraftType?.visibility} />}
                />

                <DetailItem
                    label={t("aircraft-type.model.cloudCeilingHeight")}
                    value={
                        <AltitudeValueWithUnit
                            baseUnit="m"
                            displayUnit="m"
                            baseValue={aircraftType?.cloudCeilingHeight}
                        />
                    }
                />

                <DetailItem
                    label={t("aircraft-type.model.airDensity")}
                    value={
                        <DensityValueWithUnit
                            baseUnit="kg/m³"
                            displayUnit="kg/m³"
                            baseValue={aircraftType?.airDensity}
                        />
                    }
                />
            </VStack>
        </>
    );
};
