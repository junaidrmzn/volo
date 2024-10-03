import { HStack, Text } from "@volocopter/design-library-react";
import { useRouteCardTranslation } from "./translations";

export type CardBodyProps = {
    distance: number;
    duration: number;
};

export const RouteCardBody = (props: CardBodyProps) => {
    const { distance, duration } = props;
    const { t } = useRouteCardTranslation();

    const flightTime = (duration / 60).toFixed(0);
    const distanceInNauticalMiles = (distance / 1852).toFixed(1);

    return (
        <HStack w="100%" gap={1} alignItems="center">
            <Text fontSize="xs" fontWeight="bold">
                {`${flightTime} min` || t("notAvailable")}
            </Text>
            <Text fontSize="xs" fontWeight="normal">
                {distanceInNauticalMiles} NM
            </Text>
        </HStack>
    );
};
