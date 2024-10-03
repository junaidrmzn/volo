import { useMemo } from "react";
import { useGetAllAircraftQuery } from "./useGetAllAircraftQuery";
import { useGetAllAircraftZonesQuery } from "./useGetAllAircraftZonesQuery";
import { useGetAllAtaIspecsQuery } from "./useGetAllAtaIspecsQuery";
import { useGetAllParameterSourcesQuery } from "./useGetAllParameterSourcesQuery";
import { useGetAllSensorTypesQuery } from "./useGetAllSensorTypesQuery";
import { useGetAllUnitsQuery } from "./useGetAllUnitsQuery";
import { useGetWorkGroupsQuery } from "./useGetWorkGroupsQuery";

export const useFilters = () => {
    const { aircrafts, isAircraftLoading } = useGetAllAircraftQuery();
    const { workGroups, isWorkGroupsLoading } = useGetWorkGroupsQuery();
    const { aircraftZones, isAircraftZonesLoading } = useGetAllAircraftZonesQuery();
    const { parameterSources, isparameterSourcesLoading } = useGetAllParameterSourcesQuery();
    const { ataIspecs, isAtaIspecsLoading } = useGetAllAtaIspecsQuery();
    const { sensorTypes, isSensorTypesLoading } = useGetAllSensorTypesQuery();
    const { units, isUnitsLoading } = useGetAllUnitsQuery();

    const isFilterLoading = useMemo(() => {
        if (
            isAircraftLoading ||
            isWorkGroupsLoading ||
            isAircraftZonesLoading ||
            isparameterSourcesLoading ||
            isAtaIspecsLoading ||
            isSensorTypesLoading ||
            isUnitsLoading
        ) {
            return true;
        }
        return false;
    }, [
        isAircraftLoading,
        isWorkGroupsLoading,
        isAircraftZonesLoading,
        isparameterSourcesLoading,
        isAtaIspecsLoading,
        isSensorTypesLoading,
        isUnitsLoading,
    ]);

    return { aircrafts, units, ataIspecs, aircraftZones, sensorTypes, parameterSources, workGroups, isFilterLoading };
};
