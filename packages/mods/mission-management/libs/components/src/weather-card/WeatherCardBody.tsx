import { Box, Flex, HStack, Icon, Text, VStack, WeatherIcon } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { Weather } from "@voloiq/network-schedule-management-api/v1";
import type { WeatherInfoType } from "./WeatherInfoType";
import { TranslationLabel, useWeatherCardTranslations } from "./translations/useWeatherCardTranslations";

export type WeatherCardBodyProps = {
    weather: Weather;
    weatherInfoType: WeatherInfoType;
};

export const WeatherCardBody = (props: WeatherCardBodyProps) => {
    const { weather, weatherInfoType } = props;
    const {
        weatherSymbol,
        temperature100mC,
        temperature2mC,
        temperature250mC,
        windSpeed100mKn,
        windSpeed10mKn,
        windSpeed250mKn,
        sunriseDateTime,
        sunsetDateTime,
        dewPoint100mC,
        dewPoint2mC,
        dewPoint250mC,
        windGusts100m1hKn,
        windGusts10m1hKn,
        windGusts250m1hKn,
    } = weather;
    const { formatTime } = useFormatDateTime();
    const { t } = useWeatherCardTranslations();
    // eslint-disable-next-line no-restricted-syntax
    enum WeatherSymbol {
        CLOUDY = "cloudy",
        PARTLY_CLOUDY = "partlyCloudy",
        RAINY = "rainy",
        SNOWY = "snowy",
        CLEAR_SKY = "sunny",
        THUNDERSTORM = "thunderstorm",
        WINDY = "windy",
        UNKNOWN = "unknown",
        LIGHT_CLOUDS = "partlyCloudy",
        LIGHT_FOG = "foggy",
        DENSE_FOG = "foggy",
        RAINY_AND_SNOWY_SLEET = "snowy",
        PARTIAL_RAIN_SHOWER = "showers",
        PARTIAL_SNOW_SHOWER = "showers",
        PARTIAL_SLEET_SHOWER = "showers",
        SAND_STORM = "windy",
        DRIZZLE = "thunderstorm",
        FREEZING_RAIN = "rainy",
    }

    const renderTemperature = (temperature: number, label: TranslationLabel) => (
        <Text fontSize="md">
            {temperature}
            {t(label)}
        </Text>
    );

    const renderWindSpeed = (windSpeed: number, label: TranslationLabel) => (
        <Text fontSize="md">
            {windSpeed}
            {t(label)}
        </Text>
    );

    const renderTemperatureComparison = (temperature: number, label: TranslationLabel) => (
        <HStack w="full" justifyContent="space-between" alignItems="baseline">
            <Text fontSize="xxs" lineHeight={3} color="fontOnBgMuted">
                {t(label)}
            </Text>
            <Text fontSize="xxs" lineHeight={3} fontWeight="semibold">
                {temperature}
                {t("temperatureUnit")}
            </Text>
        </HStack>
    );

    const renderWindSpeedComparison = (windSpeed: number, label: TranslationLabel) => (
        <HStack w="full" justifyContent="space-between" alignItems="baseline">
            <Text fontSize="xxs" lineHeight={3} color="fontOnBgMuted">
                {t(label)}
            </Text>
            <Text fontSize="xxs" lineHeight={3} fontWeight="semibold">
                {windSpeed}
                {t("windUnit")}
            </Text>
        </HStack>
    );

    return (
        <Box width="100%" backgroundColor="bgNavigationLayer1" borderRadius="md">
            <VStack spacing={1.5} alignItems="flex-start">
                <Flex width="100%" mb={1}>
                    <VStack spacing={0} alignItems="flex-start" width="100%" px={2} py={1}>
                        <HStack width="100%">
                            {weatherSymbol !== "UNKNOWN" && (
                                <WeatherIcon weatherCondition={WeatherSymbol[weatherSymbol]} size={8} />
                            )}
                            {renderTemperature(temperature100mC, "temperatureUnit")}
                            {weatherInfoType === "in-flight" && (
                                <VStack spacing={0}>
                                    {renderTemperatureComparison(temperature2mC, "2mLabel")}
                                    {renderTemperatureComparison(temperature250mC, "250mLabel")}
                                </VStack>
                            )}
                            <Icon icon="arrowUp" size={4} />
                            {renderWindSpeed(windSpeed100mKn, "windUnit")}
                            {weatherInfoType === "in-flight" && (
                                <VStack spacing={0}>
                                    {renderWindSpeedComparison(windSpeed10mKn, "10mLabel")}
                                    {renderWindSpeedComparison(windSpeed250mKn, "250mLabel")}
                                </VStack>
                            )}
                        </HStack>
                        {weatherInfoType === "in-flight" && (
                            <HStack justifyContent="space-between">
                                <Icon icon="droplet" size={4} marginLeft={2.5} marginRight={1} />
                                {renderTemperature(dewPoint100mC, "temperatureUnit")}
                                <VStack spacing={0}>
                                    {renderTemperatureComparison(dewPoint2mC, "2mLabel")}
                                    {renderTemperatureComparison(dewPoint250mC, "250mLabel")}
                                </VStack>

                                <Icon icon="wind" size={4} />
                                {renderWindSpeed(windGusts100m1hKn, "windUnit")}
                                <VStack spacing={0}>
                                    {renderWindSpeedComparison(windGusts10m1hKn, "10mLabel")}
                                    {renderWindSpeedComparison(windGusts250m1hKn, "250mLabel")}
                                </VStack>
                            </HStack>
                        )}
                        {weatherInfoType === "take-off" && (
                            <HStack width="100%" justifyContent="flex-end">
                                <Icon icon="sunrise" size={4} />
                                <Text fontSize="xs" lineHeight={6}>
                                    {formatTime(sunriseDateTime)}
                                </Text>
                            </HStack>
                        )}
                        {weatherInfoType === "landing" && (
                            <HStack width="100%" justifyContent="flex-end">
                                <Icon icon="sunset" size={4} />
                                <Text fontSize="xs" lineHeight={6}>
                                    {formatTime(sunsetDateTime)}
                                </Text>
                            </HStack>
                        )}
                    </VStack>
                </Flex>
            </VStack>
        </Box>
    );
};
