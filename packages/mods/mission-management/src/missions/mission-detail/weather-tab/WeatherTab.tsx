import { Box, Button, Flex, HStack, Spinner, Text } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { useFormatDateTime } from "@voloiq/dates";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { WeatherCard } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { useWeatherForecast } from "./useWeatherForecast";

type WeatherTabProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const WeatherTab = (props: WeatherTabProps) => {
    const { mission, onReloadList } = props;
    const {
        departureWeather,
        inFlightWeather,
        arrivalWeather,
        departureVertiportCode,
        arrivalVertiportCode,
        estimatedDepartureDateTime,
        estimatedArrivalDateTime,
        weatherLastUpdated,
        statusOfMission,
    } = mission;

    const { t } = useMissionTranslations();

    const { refetchWeatherForecast, isLoading, isButtonDisabled } = useWeatherForecast({ mission, onReloadList });
    const { formatDateTime } = useFormatDateTime();

    return (
        <Box width="100%" backgroundColor="bgNavigationLayer1" borderRadius="md" p={1.5}>
            {weatherLastUpdated && (
                <HStack justifyContent="space-between" p={1.5}>
                    <HStack>
                        <Text fontSize="sm" fontWeight="semibold">
                            {t("Last updated")}:
                        </Text>
                        <Text fontSize="sm">{formatDateTime(weatherLastUpdated)}</Text>
                    </HStack>
                    {statusOfMission !== StatusOfMission.CANCELLED && (
                        <Button
                            size="sm"
                            variant="primary"
                            isDisabled={isLoading || isButtonDisabled}
                            onClick={() => refetchWeatherForecast()}
                        >
                            {isLoading && <Spinner size="sm" mr={1.5} />}
                            {t("buttons.refetch weather forecast")}
                        </Button>
                    )}
                </HStack>
            )}
            <Flex width="100%" p={1.5} gap={1.5}>
                {departureWeather && (
                    <HStack>
                        <WeatherCard
                            weatherInfoType="take-off"
                            weather={departureWeather}
                            vertiportCode={departureVertiportCode}
                            estimatedDateTime={estimatedDepartureDateTime}
                        />
                    </HStack>
                )}
                {inFlightWeather && (
                    <HStack justifyContent="space-between">
                        <WeatherCard weatherInfoType="in-flight" weather={inFlightWeather} />
                    </HStack>
                )}
                {arrivalWeather && (
                    <HStack>
                        <WeatherCard
                            weatherInfoType="landing"
                            weather={arrivalWeather}
                            vertiportCode={arrivalVertiportCode}
                            estimatedDateTime={estimatedArrivalDateTime}
                        />
                    </HStack>
                )}
            </Flex>
        </Box>
    );
};
