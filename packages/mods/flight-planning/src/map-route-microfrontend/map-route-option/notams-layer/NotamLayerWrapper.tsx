import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { ErrorPage } from "../../../components";
import { useMapRouteOptionTranslation } from "../translations";
import { NotamLayer } from "./NotamLayer";

type NotamLayerWrapperProps = {
    routeOption: RouteOption;
};

export const NotamLayerWrapper = (props: NotamLayerWrapperProps) => {
    const { routeOption } = props;
    const { t } = useMapRouteOptionTranslation();

    const { lat, lng } = routeOption?.departureExternalVertiport || {};

    if (!lat || !lng) return <ErrorPage error={t("routes.error.description")} />;

    return <NotamLayer routeOptionId={routeOption.id} latitude={lat} longitude={lng} />;
};
