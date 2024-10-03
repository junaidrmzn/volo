import { EmptyState, Skeleton } from "@volocopter/design-library-react";
import { ServiceProviders } from "../../ServiceProviders";
import { useGetRoutes } from "../../api-hooks";
import { MapRouteOption } from "./MapRouteOption";
import { useMapRouteOptionTranslation } from "./translations";
import { useFocusBounds } from "./useFocusBounds";

export type MapRouteOptionWithDataProps = {
    routeOptionId: string;
};

const MapRouteOptionWithDataWithoutProvider = (props: MapRouteOptionWithDataProps) => {
    const { routeOptionId } = props;
    const { t } = useMapRouteOptionTranslation();

    const { focusBounds, isLoadingRouteOption, isErrorRouteOption, routeOption } = useFocusBounds(+routeOptionId);

    const {
        data: routes,
        isLoading: isLoadingRoutes,
        isError: isErrorRoutes,
    } = useGetRoutes(routeOptionId, true, !!routeOptionId);

    if (isErrorRouteOption || isErrorRoutes)
        return <EmptyState title={t("routes.error.title")} description={t("routes.error.description")} />;

    return (
        <Skeleton isLoading={isLoadingRouteOption || isLoadingRoutes} height="100%" width="100%">
            {routeOption && routes && (
                <MapRouteOption focusBounds={focusBounds} routeOption={routeOption} routes={routes} />
            )}
        </Skeleton>
    );
};

export const MapRouteOptionWithData = (props: MapRouteOptionWithDataProps) => (
    <ServiceProviders>
        <MapRouteOptionWithDataWithoutProvider {...props} />
    </ServiceProviders>
);
