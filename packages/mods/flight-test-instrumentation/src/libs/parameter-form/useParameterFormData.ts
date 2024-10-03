import {
    useGetAllAircraft,
    useGetAllAircraftZones,
    useGetAllAtaISpecs,
    useGetAllParameterSources,
    useGetAllSensorTypes,
    useGetAllUnits,
    useGetAllWorkgroups,
} from "../fti-api";
import { mergeServiceStates } from "./mergeServiceStates";

export const useParameterFormData = () => {
    const { data: aircraft, state: aircraftState } = useGetAllAircraft();
    const { data: aircraftZones, state: aircraftZoneState } = useGetAllAircraftZones();
    const { data: parameterSources, state: parameterSourceState } = useGetAllParameterSources();
    const { data: units, state: unitState } = useGetAllUnits();
    const { data: workgroups, state: workgroupState } = useGetAllWorkgroups();
    const { data: ataIspecs, state: ataIspecState } = useGetAllAtaISpecs();
    const { data: sensorTypes, state: sensorTypeState } = useGetAllSensorTypes();

    const state = mergeServiceStates([
        aircraftState,
        aircraftZoneState,
        parameterSourceState,
        unitState,
        workgroupState,
        ataIspecState,
        sensorTypeState,
    ]);

    return {
        state,
        data: {
            aircraft,
            aircraftZones,
            parameterSources,
            units,
            workgroups,
            ataIspecs,
            sensorTypes,
        },
    };
};
