import { useEffect, useMemo } from "react";
import { Route, useGetQueryState } from "@voloiq/flight-planning-api/v1";
import { useParams, useSearchParams } from "@voloiq/routing";

export const useDisplayedRoutes = () => {
    const { routeOptionId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const displayedRoutesParams = useMemo(() => [...new Set(searchParams.getAll("displayedRoutes"))], [searchParams]);
    const routesQuery = useGetQueryState<Route[]>(["routeOptions", { routeOptionId }, "routes"]);

    const displayedRoutes = useMemo(() => {
        if (!routesQuery.isSuccess) return [];
        return displayedRoutesParams
            .map((routeId) => routesQuery.data.find((route) => `${route.id}` === routeId))
            .filter((route): route is Route => !!route);
    }, [routesQuery.data, routesQuery.isSuccess, displayedRoutesParams]);

    // initial filtering for invalid search params
    useEffect(() => {
        if (!routesQuery.isSuccess) return;
        searchParams.delete("displayedRoutes");
        for (const routeId of displayedRoutesParams
            .map((routeId) => `${routesQuery.data.find((route) => `${route.id}` === routeId)?.id}`)
            .filter((route) => route !== "undefined")) {
            searchParams.append("displayedRoutes", routeId);
        }
        const selectedRoute = routesQuery.data.find((route) => `${route.id}` === searchParams.get("selectedRoute"));
        searchParams.delete("selectedRoute");
        if (selectedRoute) {
            searchParams.set("selectedRoute", `${selectedRoute.id}`);
            if (!displayedRoutesParams.includes(`${selectedRoute.id}`))
                searchParams.append("displayedRoutes", `${selectedRoute.id}`);
        }
        setSearchParams(searchParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displayRoute = (route: Route) => {
        searchParams.append("displayedRoutes", `${route.id}`);
        setSearchParams(searchParams);
    };

    const undisplayRoute = (route: Route) => {
        searchParams.delete("displayedRoutes");
        for (const routeId of displayedRoutesParams.filter((routeId) => routeId !== `${route.id}`)) {
            searchParams.append("displayedRoutes", routeId);
        }
        if (searchParams.get("selectedRoute") === `${route.id}`) searchParams.delete("selectedRoute");
        setSearchParams(searchParams);
    };

    return {
        displayRoute,
        undisplayRoute,
        displayedRoutes,
        routes: routesQuery.data || [],
        routeOptionId: Number(routeOptionId),
    };
};
