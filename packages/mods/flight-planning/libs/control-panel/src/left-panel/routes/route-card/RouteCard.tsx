import { Box, HStack, VStack, useToken } from "@volocopter/design-library-react";
import { RouteCardBody } from "./RouteCardBody";
import { RouteCardHeader } from "./RouteCardHeader";

export type RouteCardProps = {
    route: Route;
    key?: number;
};

export const RouteCard = (props: RouteCardProps) => {
    const { key, route } = props;

    const gray = useToken("colors", "gray.500");

    return (
        <Box key={key} w="100%" bg="bgContentLayer" borderRadius="sm" borderColor={gray} borderLeftWidth={6}>
            <HStack py={3} pl={6} pr={3}>
                <VStack w="100%">
                    <RouteCardHeader routeName={route.name} validationStatus={route.validationStatus} />
                    <RouteCardBody distance={route.distance} duration={route.duration} />
                </VStack>
            </HStack>
        </Box>
    );
};
