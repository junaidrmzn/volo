import { Box, VStack } from "@volocopter/design-library-react";
import { Weather } from "@voloiq/network-schedule-management-api/v1";
import { WeatherCardBody } from "./WeatherCardBody";
import { WeatherCardFooter } from "./WeatherCardFooter";
import { WeatherCardHeader } from "./WeatherCardHeader";
import type { WeatherInfoType } from "./WeatherInfoType";

export type WeatherCardProps = {
    weather: Weather;
    weatherInfoType: WeatherInfoType;
    vertiportCode?: string;
    estimatedDateTime?: string;
};

export const WeatherCard = (props: WeatherCardProps) => {
    const { weather, weatherInfoType } = props;
    return (
        <Box width="100%" backgroundColor="bgContentLayer" borderRadius="md">
            <VStack spacing={1.5} alignItems="flex-start" width="100%" px={3} py={1.5} gap={1.5}>
                <WeatherCardHeader {...props} />
                <WeatherCardBody weather={weather} weatherInfoType={weatherInfoType} />
                <WeatherCardFooter weather={weather} weatherInfoType={weatherInfoType} />
            </VStack>
        </Box>
    );
};
