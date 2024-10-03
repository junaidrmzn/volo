import { useCreateService } from "@voloiq/service";
import type { Location, LocationInsert } from "./apiModels";

export const useAddLocation = () => {
    const {
        data: location,
        sendRequest: addLocation,
        statusCode,
        error,
        state,
    } = useCreateService<LocationInsert, Location>({ route: "/locations" });

    return { location, addLocation, statusCode, error, state };
};
