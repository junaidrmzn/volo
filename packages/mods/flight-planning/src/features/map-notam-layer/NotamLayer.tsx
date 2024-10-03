import React from "react";
import { Feature, useGetNotamsQuery } from "@voloiq/flight-planning-api/v1";
import { ErrorPage } from "../../components";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";
import { NotamMarker } from "./NotamMarker";
import { useNotamLayer } from "./useNotamLayer";

type NotamLayerProps = {
    routeOptionId: number | string;
    latitude: number;
    longitude: number;
};

export const NotamLayer: React.FC<NotamLayerProps> = (props) => {
    const { routeOptionId, latitude, longitude } = props;

    const {
        isFetching,
        isError,
        query: notamsQueryData,
    } = useGetNotamsQuery({
        routeOptionId,
        latitude,
        longitude,
        isEnabled: !!latitude && !!longitude,
    });
    const { t: translate } = useFlightPlanningTranslation();

    useNotamLayer(notamsQueryData.data);

    if (isFetching || isError || (notamsQueryData.isSuccess && !notamsQueryData.data))
        return <ErrorPage error={translate("notam.error.message")} />;

    return (
        <>
            {notamsQueryData &&
                notamsQueryData?.data?.features.map((feature: Feature) => (
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
