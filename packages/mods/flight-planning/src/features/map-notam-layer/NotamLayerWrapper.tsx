import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { ErrorPage, LoadingSpinner } from "../../components";
import { useSelectedRoute } from "../selected-route";
import { NotamLayer } from "./NotamLayer";

export const NotamLayerWrapper = () => {
    const { routeOptionId } = useSelectedRoute();
    const { data, isLoading, isError } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const { lat, lng } = data?.departureExternalVertiport || {};

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if ((!isLoading && isError) || !data || !lat || !lng) {
        return <ErrorPage error="Error fetching flights data which results in notams not being able to fetch" />;
    }

    return <NotamLayer routeOptionId={routeOptionId} latitude={lat} longitude={lng} />;
};
