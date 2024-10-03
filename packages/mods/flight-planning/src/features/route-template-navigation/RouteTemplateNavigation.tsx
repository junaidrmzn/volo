import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { ErrorPage, LoadingSpinner } from "../../components";
import { useSelectedRoute } from "../selected-route";
import { RouteTemplateNavigationContent } from "./RouteTemplateNavigationContent";

export const RouteTemplateNavigation = () => {
    const { routeOptionId } = useSelectedRoute();
    const routeOptionQuery = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });

    if (routeOptionQuery.isError) {
        return <ErrorPage error={routeOptionQuery.error.message} />;
    }

    if (routeOptionQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {routeOptionQuery.isSuccess && routeOptionQuery.data && (
                <RouteTemplateNavigationContent routeOption={routeOptionQuery.data} />
            )}
        </>
    );
};
