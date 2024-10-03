import { Dispatch, SetStateAction } from "react";
import { useQuery, useQueryClient } from "react-query";
import { FlightStatus } from "../models";
import { WindScenario } from "./models";
import { useGetFullEnergy } from "./useGetFullEnergy";

type UseGetRouteFullEnergyWithWindScenarioOptions = {
    windScenario: WindScenario;
    routeId?: string | number;
    enabled: boolean;
    setFlightStatus?: Dispatch<SetStateAction<Partial<FlightStatus>>>;
};

export const useGetFullEnergyWithWindScenarioQuery = (options: UseGetRouteFullEnergyWithWindScenarioOptions) => {
    const { routeId, enabled = false, windScenario, setFlightStatus } = options;
    const queryClient = useQueryClient();

    const { refetchData } = useGetFullEnergy({
        routeId: routeId ?? 0,
        windScenario,
    });

    return useQuery({
        queryKey: ["routes", { routeId }, "energy", "windScenario", windScenario],
        enabled,
        queryFn: refetchData,
        onSuccess: async (data) => {
            if (!data) return;
            queryClient.setQueryData(["routes", { routeId }, "energy", "fullEnergy"], data);

            setFlightStatus?.({
                alerts: data.alerts,
                remainingEnergy: data.remainingEnergy,
                validationStatus: data.validationStatus,
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
