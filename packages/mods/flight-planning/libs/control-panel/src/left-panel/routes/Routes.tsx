import { Box, VStack } from "@volocopter/design-library-react";
import { LayoutSection } from "@voloiq/flight-planning-components";
import { RouteCard } from "./route-card/RouteCard";
import { useRoutesTranslation } from "./translations";

type RouteOptionDetailProps = {
    routeOptionName?: string;
    routes: Route[];
};

export const Routes = (props: RouteOptionDetailProps) => {
    const { routeOptionName, routes } = props;
    const { t } = useRoutesTranslation();

    return (
        <Box w="348px" maxWidth="100%" pos="absolute" top="31vh">
            <LayoutSection
                firstLabel={routeOptionName || t("notAvailable")}
                secondLabel={t("routeOption")}
                hasAddButton
                hasActionButton
            >
                <VStack w="100%">
                    {routes.map((route) => (
                        <RouteCard key={route.id} route={route} />
                    ))}
                </VStack>
            </LayoutSection>
        </Box>
    );
};
