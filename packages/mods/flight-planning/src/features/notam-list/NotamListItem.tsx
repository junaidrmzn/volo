import { Button, Divider, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { LngLatLike } from "maplibre-gl";
import { Feature } from "@voloiq/flight-planning-api/v1";
import { useRefocusMap } from "@voloiq/map";
import { useFlightPlanningTranslation } from "../../translations";

type NotamListItemProps = {
    notamFeature: Feature;
};

export const NotamListItem = (props: NotamListItemProps) => {
    const { notamFeature } = props;
    const { t, i18n } = useFlightPlanningTranslation();
    const { temporaryFocusMap } = useRefocusMap();
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleFocusOnNotam = () => {
        if (notamFeature.properties.lon === undefined || notamFeature.properties.lat === undefined) return;
        const notamCoordinates: LngLatLike = { lng: notamFeature.properties.lon, lat: notamFeature.properties.lat };
        temporaryFocusMap([notamCoordinates]);
    };

    return (
        <VStack
            px={3}
            width="100%"
            textAlign="left"
            alignItems="left"
            data-testid={`notam-list-item-${notamFeature.properties.externalId}`}
        >
            <Text>{notamFeature.properties.text}</Text>

            {notamFeature.properties.effectiveStart && (
                <HStack width="100%">
                    <Text fontSize="smaller" fontWeight="bold">
                        {t("notam.properties.effectiveStart")}:
                    </Text>
                    <Text fontSize="smaller">
                        {dateFormatter.format(new Date(notamFeature.properties.effectiveStart))}
                    </Text>
                </HStack>
            )}
            {notamFeature.properties.effectiveEnd && (
                <HStack>
                    <Text fontSize="smaller" fontWeight="bold">
                        {t("notam.properties.effectiveEnd")}:
                    </Text>
                    <Text fontSize="smaller">
                        {dateFormatter.format(new Date(notamFeature.properties.effectiveEnd))}
                    </Text>
                </HStack>
            )}
            {notamFeature.properties.schedule && (
                <HStack>
                    <Text fontSize="smaller" fontWeight="bold">
                        {t("notam.properties.schedule")}:
                    </Text>
                    <Text fontSize="smaller"> {notamFeature.properties.schedule}</Text>
                </HStack>
            )}
            <Button onClick={handleFocusOnNotam}>{t("notam.list.showNotam")}</Button>
            <Divider />
        </VStack>
    );
};
