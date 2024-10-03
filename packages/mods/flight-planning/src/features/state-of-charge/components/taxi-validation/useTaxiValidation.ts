import { useGetRouteFullEnergy } from "../../../../api-hooks";

export const useTaxiValidation = (selectedRouteId?: number) => {
    const routeFullEnergyQuery = useGetRouteFullEnergy(selectedRouteId);

    const isTaxiValidationValid =
        routeFullEnergyQuery.data?.taxi.taxiValid && routeFullEnergyQuery.data.taxi.taxiCsflValid;

    const taxiEnergyNeeded = routeFullEnergyQuery.data?.taxi?.taxiEnergy?.reduce(
        (accumulator, current) => accumulator + current,
        0
    );

    return {
        isTaxiValidationValid,
        taxiEnergyNeeded,
    };
};
