import { Grid } from "@volocopter/design-library-react";
import { IconCard } from "@voloiq/network-scheduling-components";
import { useRoutesSectionTranslation } from "./translations/useRoutesSectionTranslation";

const secondsToTimeString = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const roundToTwoDigits = (number: number): number => {
    return Math.round(number * 100) / 100;
};

const metersToKilometers = (meters: number) => roundToTwoDigits(meters / 1000);

export type ValidationStatisticsProps = {
    totalEnergyInKWh: number;
    totalTimeInSeconds: number;
    totalDistanceInMeters: number;
};

export const ValidationStatistics = (props: ValidationStatisticsProps) => {
    const { totalEnergyInKWh, totalDistanceInMeters, totalTimeInSeconds } = props;
    const { t } = useRoutesSectionTranslation();

    return (
        <Grid gridTemplateColumns="2fr 1fr 1fr" gap={2}>
            <IconCard label={`${roundToTwoDigits(totalEnergyInKWh)} kWh`} helpText={t("est. total energy")} />
            <IconCard label={`${secondsToTimeString(totalTimeInSeconds)}`} helpText={t("est. total time")} />
            <IconCard label={`${metersToKilometers(totalDistanceInMeters)} km`} helpText={t("est. total distance")} />
        </Grid>
    );
};
