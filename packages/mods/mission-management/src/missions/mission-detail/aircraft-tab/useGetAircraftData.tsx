import { useEffect } from "react";
import { useGetAircraft } from "../../../api-hooks/useNetworkSchedulingService";

type UseGetAircraftDataProps = {
    aircraftId?: string;
};

export const useGetAircraftData = (props: UseGetAircraftDataProps) => {
    const { aircraftId } = props;

    const { data, refetchData } = useGetAircraft(aircraftId || "-1");

    useEffect(() => {
        if (aircraftId) refetchData();
    }, [aircraftId, refetchData]);

    return { aircraft: data };
};
