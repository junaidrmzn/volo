import { useMemo } from "react";
import { Route, useGetQueryState } from "@voloiq/flight-planning-api/v1";
import { useParams, useSearchParams } from "@voloiq/routing";

export const useSelectedRoute = () => {
    const { routeOptionId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedRouteParams = useMemo(() => searchParams.get("selectedRoute"), [searchParams]);

    const routesQuery = useGetQueryState<Route[]>(["routeOptions", { routeOptionId }, "routes"]);

    const selectedRoute = useMemo(() => {
        if (!routesQuery.isSuccess) return undefined;
        return routesQuery.data.find((route) => `${route.id}` === selectedRouteParams);
    }, [routesQuery, selectedRouteParams]);

    const selectRoute = (routeId: number) => {
        searchParams.set("selectedRoute", `${routeId}`);
        if (!searchParams.getAll("displayedRoutes").includes(`${routeId}`))
            searchParams.append("displayedRoutes", `${routeId}`);
        setSearchParams(searchParams);
    };

    const unselectRoute = () => {
        searchParams.delete("selectedRoute");
        setSearchParams(searchParams);
    };

    return {
        selectRoute,
        unselectRoute,
        selectedRoute,
        routes: routesQuery.data || [],
        routeOptionId: Number(routeOptionId || ""),
    };
};
