import { useGetRouteFullEnergy } from "../../../../api-hooks";

export const useVoltageDropValidation = (selectedRouteId?: number) => {
    const routeFullEnergyQuery = useGetRouteFullEnergy(selectedRouteId);
    return {
        voltageDrop: routeFullEnergyQuery.data?.voltageDrop,
        voltageTimeIntervals: routeFullEnergyQuery.data?.voltageTimeIntervals,
    };
};
