import { Feature, useGetNotamsQuery } from "@voloiq/flight-planning-api/v1";
import { ErrorPage } from "../../../components";
import { useMapRouteOptionTranslation } from "../translations";
import { NotamMarker } from "./NotamMarker";
import { useNotamLayer } from "./useNotamLayer";

type NotamLayerProps = {
    routeOptionId: number;
    latitude: number;
    longitude: number;
};

export const NotamLayer: React.FC<NotamLayerProps> = (props) => {
    const { routeOptionId, latitude, longitude } = props;
    const { t } = useMapRouteOptionTranslation();

    const { isError, query: notamsQueryData } = useGetNotamsQuery({
        routeOptionId,
        latitude,
        longitude,
        isEnabled: !!latitude && !!longitude,
    });

    useNotamLayer(notamsQueryData.data);

    if (isError || (notamsQueryData.isSuccess && notamsQueryData.data?.features.length === 0))
        return <ErrorPage error={t("notams.error.title")} />;

    return (
        <>
            {notamsQueryData.data?.features.map((feature: Feature) => (
                <NotamMarker
                    key={feature.properties.externalId}
                    id={`${feature.properties.externalId}`}
                    latitude={feature.properties.lat}
                    longitude={feature.properties.lon}
                    description={feature.properties.text}
                />
            ))}
        </>
    );
};
