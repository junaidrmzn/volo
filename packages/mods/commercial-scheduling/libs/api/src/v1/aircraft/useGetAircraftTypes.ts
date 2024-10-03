import { useGetAllService } from "@voloiq/service";
import { AIRCRAFT_TYPE_BASE_URL } from "../../serviceEndpoints";
import { AircraftType } from "./apiModels";

type UseGetAircraftTypesOptions = {
    manual?: boolean;
};

export const useGetAircraftTypes = (options?: UseGetAircraftTypesOptions) =>
    useGetAllService<AircraftType>({
        route: AIRCRAFT_TYPE_BASE_URL,
        options,
    });
