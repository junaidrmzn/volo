import { Box, VStack } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { LayoutSection, RouteCard } from "@voloiq/flight-planning-components";
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
                hasActionItem
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
