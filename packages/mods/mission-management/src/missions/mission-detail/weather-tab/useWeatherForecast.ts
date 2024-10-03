import { useEffect, useState } from "react";
import { Mission, useUpdateWeather } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../hooks/useErrorToast";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type UseWeatherForecastOptions = {
    mission: Mission;
    onReloadList: () => void;
};

export const useWeatherForecast = (options: UseWeatherForecastOptions) => {
    const { mission, onReloadList } = options;
    const { id: missionId, weatherLastUpdated } = mission;

    const { sendRequest, isLoading } = useUpdateWeather({ missionId });
    const { t } = useMissionTranslations();
    const { onSuccess } = useSuccessToast();
    const { onError } = useErrorToastWithMessage();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        (() => {
            const weatherLastUpdatedTime = new Date(weatherLastUpdated).getTime();
            const currentTime = Date.now();
            const timeDifference = currentTime - weatherLastUpdatedTime;
            const fiveMinutesInMilliseconds = 5 * 60 * 1000;

            if (timeDifference < fiveMinutesInMilliseconds) {
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
        })();
    }, [weatherLastUpdated]);

    const refetchWeatherForecast = async () => {
        await sendRequest()
            .then(() => {
                setIsButtonDisabled(true);
                onSuccess(t("Weather forecast refreshed successfully"));
                onReloadList();
            })
            .catch((error) => onError(error));
    };

    return { refetchWeatherForecast, isLoading, isButtonDisabled };
};
