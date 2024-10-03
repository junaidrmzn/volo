import { useCreateService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";

export type UseUpdateWeatherOptions = {
    missionId: string;
};

export const useUpdateWeather = (options: UseUpdateWeatherOptions) => {
    const { missionId } = options;
    const updateWeatherService = useCreateService({
        route: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/update-weather`,
    });

    return {
        ...updateWeatherService,
        isLoading: updateWeatherService.state === "pending",
    };
};
