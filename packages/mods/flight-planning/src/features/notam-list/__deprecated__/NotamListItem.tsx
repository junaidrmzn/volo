import { Button, Divider, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { NotamFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import type { LngLatLike } from "maplibre-gl";
import { useRefocusMap } from "@voloiq/map";
import { useFlightPlanningTranslation } from "../../../translations";

type NotamListItemProps = { notamFeature: NotamFeatureAllOf };

export const NotamListItem = (props: NotamListItemProps) => {
    const { t: translate, i18n } = useFlightPlanningTranslation();
    const { temporaryFocusMap } = useRefocusMap();
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    const { notamFeature } = props;

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
            <Text>{notamFeature.properties.text!}</Text>

            {notamFeature.properties.effectiveStart && (
                <HStack width="100%">
                    <Text fontSize="smaller" fontWeight="bold">
                        {translate("notam.properties.effectiveStart")}:
                    </Text>
                    <Text fontSize="smaller">
                        {dateFormatter.format(new Date(notamFeature.properties.effectiveStart))}
                    </Text>
                </HStack>
            )}
            {notamFeature.properties.effectiveEnd && (
                <HStack>
                    <Text fontSize="smaller" fontWeight="bold">
                        {translate("notam.properties.effectiveEnd")}:
                    </Text>
                    <Text fontSize="smaller">
                        {dateFormatter.format(new Date(notamFeature.properties.effectiveEnd))}
                    </Text>
                </HStack>
            )}
            {notamFeature.properties.schedule && (
                <HStack>
                    <Text fontSize="smaller" fontWeight="bold">
                        {translate("notam.properties.schedule")}:
                    </Text>
                    <Text fontSize="smaller"> {notamFeature.properties.schedule}</Text>
                </HStack>
            )}
            <Button
                onClick={handleFocusOnNotam}
                data-testid={`notam-list-item-${notamFeature.properties.externalId}-focus-button`}
            >
                {translate("notam.list.showNotam")}
            </Button>
            <Divider />
        </VStack>
    );
};
