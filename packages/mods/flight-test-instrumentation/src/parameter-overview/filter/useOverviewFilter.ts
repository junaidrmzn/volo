import type {
    Aircraft,
    AircraftZone,
    AtaIspec,
    ParameterSource,
    SensorType,
    Unit,
    Workgroup,
} from "@voloiq-typescript-api/fti-types";
import {
    useGetAllAircraftManual,
    useGetAllAircraftZonesManual,
    useGetAllAtaISpecsManual,
    useGetAllParameterSourcesManual,
    useGetAllSensorTypesManual,
    useGetAllUnitsManual,
    useGetAllWorkgroupsManual,
} from "../../libs/fti-api";

export const useOverviewFilter = (): {
    getAllUnits: () => Promise<Unit[] | undefined>;
    getAllAircraft: () => Promise<Aircraft[] | undefined>;
    getAllAircraftZones: () => Promise<AircraftZone[] | undefined>;
    getAllWorkgroups: () => Promise<Workgroup[] | undefined>;
    getAllParameterSources: () => Promise<ParameterSource[] | undefined>;
    getAllAtaiSpecs: () => Promise<AtaIspec[] | undefined>;
    getAllSensorTypes: () => Promise<SensorType[] | undefined>;
} => {
    const { sendRequest: getAllUnits } = useGetAllUnitsManual();
    const { sendRequest: getAllAircraft } = useGetAllAircraftManual();
    const { sendRequest: getAllAircraftZones } = useGetAllAircraftZonesManual();
    const { sendRequest: getAllWorkgroups } = useGetAllWorkgroupsManual();
    const { sendRequest: getAllParameterSources } = useGetAllParameterSourcesManual();
    const { sendRequest: getAllAtaiSpecs } = useGetAllAtaISpecsManual();
    const { sendRequest: getAllSensorTypes } = useGetAllSensorTypesManual();

    return {
        getAllUnits,
        getAllAircraft,
        getAllAircraftZones,
        getAllWorkgroups,
        getAllParameterSources,
        getAllAtaiSpecs,
        getAllSensorTypes,
    };
};
