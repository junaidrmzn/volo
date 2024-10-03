import { HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { Weather } from "@voloiq/network-schedule-management-api/v1";
import { WeatherInfoType } from "./WeatherInfoType";
import { useWeatherCardTranslations } from "./translations/useWeatherCardTranslations";

export type WeatherCardFooterProps = {
    weather: Weather;
    weatherInfoType: WeatherInfoType;
};

export const WeatherCardFooter = (props: WeatherCardFooterProps) => {
    const { weather, weatherInfoType } = props;
    const { visibilityM, ceilingHeightAglM, relativeHumidity2mP, precipitation1hMm, weatherForecastDate } = weather;
    const { t } = useWeatherCardTranslations();
    const { formatDateTime } = useFormatDateTime();

    return (
        <VStack>
            <HStack
                width="100%"
                justifyContent="flex-end"
                alignItems="flex-end"
                gap={3}
                color="fontOnBgMuted"
                spacing={0}
            >
                <HStack gap={1} spacing={0}>
                    <Icon icon="eye" size={4} />
                    <Text fontSize="xs" fontWeight="semibold">
                        {visibilityM}
                        {t("kilometerUnit")}
                    </Text>
                </HStack>
                {weatherInfoType === "in-flight" && (
                    <HStack gap={1} spacing={0}>
                        <Icon icon="clouds" size={4} />
                        <Text fontSize="xs" fontWeight="semibold">
                            {ceilingHeightAglM}
                            {t("kilometerUnit")}
                        </Text>
                    </HStack>
                )}
                <HStack gap={1} spacing={0}>
                    <Icon icon="percentage" size={4} />
                    <Text fontSize="xs" fontWeight="semibold">
                        {relativeHumidity2mP}
                        {t("percentageUnit")}
                    </Text>
                </HStack>
                <HStack gap={1} spacing={0}>
                    <Icon icon="cloudRain" size={4} />
                    <Text fontSize="xs" fontWeight="semibold">
                        {precipitation1hMm}
                        {t("percentageUnit")}
                    </Text>
                </HStack>
            </HStack>
            <HStack gap={1}>
                <Text fontSize="xs" fontWeight="semibold">
                    {t("Forecast date")}:
                </Text>
                <Text fontSize="xs">{formatDateTime(weatherForecastDate)}</Text>
            </HStack>
        </VStack>
    );
};
