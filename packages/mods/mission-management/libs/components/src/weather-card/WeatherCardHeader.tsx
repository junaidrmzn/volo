import { Flex, HStack, Icon, IconButton, Tag, Text } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import { Weather } from "@voloiq/network-schedule-management-api/v1";
import type { WeatherInfoType } from "./WeatherInfoType";
import { useWeatherCardTranslations } from "./translations/useWeatherCardTranslations";

export type WeatherCardHeaderProps = {
    weather: Weather;
    weatherInfoType: WeatherInfoType;
    vertiportCode?: string;
    estimatedDateTime?: string;
};

export const WeatherCardHeader = (props: WeatherCardHeaderProps) => {
    const { weather, weatherInfoType, vertiportCode, estimatedDateTime } = props;
    const { weatherSeverity } = weather;
    const { formatTime } = useFormatDateTime();
    const { t } = useWeatherCardTranslations();

    return (
        <Flex width="100%">
            <HStack width="80%">
                <Text fontSize="xxs" lineHeight={3} fontWeight="semibold">
                    {match(weatherInfoType)
                        .with(
                            "take-off",
                            () =>
                                `${t("takeOffLabel")} (${vertiportCode}) • ${
                                    estimatedDateTime && formatTime(estimatedDateTime)
                                }`
                        )
                        .with("in-flight", () => `${t("inFlightLabel")}`)
                        .with(
                            "landing",
                            () =>
                                `${t("landingLabel")} (${vertiportCode}) • ${
                                    estimatedDateTime && formatTime(estimatedDateTime)
                                }`
                        )
                        .exhaustive()}
                </Text>
            </HStack>
            <HStack width="20%" justifyContent="flex-end">
                {match(weatherSeverity)
                    .with("GOOD", () => (
                        <Tag colorScheme="blue-subtle">
                            <IconButton aria-label={weatherSeverity} variant="ghost" size="sm">
                                <Icon icon="thumbsUp" size={3} />
                            </IconButton>
                        </Tag>
                    ))
                    .with("WARNING", () => (
                        <Tag colorScheme="warning-subtle">
                            <IconButton aria-label={weatherSeverity} variant="ghost" size="sm">
                                <Icon icon="alert" size={3} />
                            </IconButton>
                        </Tag>
                    ))
                    .with("ALERT", () => (
                        <Tag colorScheme="error-subtle">
                            <IconButton aria-label={weatherSeverity} variant="ghost" size="sm">
                                <Icon icon="thumbsDown" size={3} />
                            </IconButton>
                        </Tag>
                    ))
                    .with("UNKNOWN", () => (
                        <Tag colorScheme="gray-subtle">
                            <IconButton aria-label={weatherSeverity} variant="ghost" size="sm">
                                <Icon icon="infoLight" size={3} />
                            </IconButton>
                        </Tag>
                    ))
                    .exhaustive()}
            </HStack>
        </Flex>
    );
};
