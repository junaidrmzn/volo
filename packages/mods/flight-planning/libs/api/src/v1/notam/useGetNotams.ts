import { useGetService } from "@voloiq/service";
import { Notam } from "./models";

type UseGetNotamsOptions = {
    routeOptionId: string | number;
    latitude: number;
    longitude: number;
    manual: boolean;
};
export const useGetNotams = (options: UseGetNotamsOptions) => {
    const { routeOptionId, latitude, longitude, manual } = options;

    return useGetService<Notam>({
        route: `/route-options/${routeOptionId}/notams-job`,
        resourceId: "",
        params: { latitude, longitude },
        options: { manual },
    });
};
