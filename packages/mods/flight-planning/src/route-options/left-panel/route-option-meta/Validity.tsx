import { Box, HStack, Text, useColorModeValue, useDisclosure } from "@volocopter/design-library-react";
import { WeatherTypes } from "@voloiq/flight-planning-api/v1";
import { LayoutSection } from "@voloiq/flight-planning-components";
// import { RouteOptionMeta } from ".";
// import { useDisplayedRoutes } from "../../../features/displayed-routes";
import { useSelectedRoute } from "../../../features/selected-route";
import { useWeatherTypes } from "../../custom-hooks/useWeatherTypes";
import { WeatherScenarios } from "../generic/WeatherScenarios";
// import { RouteOptionMetaItem } from "./RouteOptionMetaItem";
import { useRouteOptionMetaTranslation } from "./translations";

export const Validity = () => {
    const { isOpen } = useDisclosure({ defaultIsOpen: true });
    const toggleWidth = isOpen ? "348px" : "0px";
    const { t } = useRouteOptionMetaTranslation();
    const white = useColorModeValue("white", "gray.800");
    const grey = useColorModeValue("gray.200", "gray.300");
    const { selectedRoute } = useSelectedRoute();
    const { scenario, setScenario } = useWeatherTypes();
    // const { routeOptionId, routes } = useDisplayedRoutes();
    // const { data: routeOption } = useGetQueryState<RouteOption>(["route-options", { routeOptionId }]);

    const handleWeatherChange = (type: WeatherTypes) => {
        setScenario(type);
    };

    return (
        <Box
            w={toggleWidth}
            backgroundColor={grey}
            overflow="scroll"
            h="400px"
            transition="top 0.3s ease"
            order={3}
            position="absolute"
            top="69vh"
        >
            <Box>
                <LayoutSection firstLabel={`${t("validity.title")}`} hasCollapseButton hasActionButton>
                    <Box backgroundColor={grey} w="100%" borderRadius="6" m="10" padding="4">
                        <Text mb="4">{selectedRoute?.name}</Text>
                        <Box bgColor={white} w="100%">
                            <Text fontSize="small" p="2">
                                {t("weatherScenario.title")}
                            </Text>
                            <HStack pt={3} p="2">
                                <WeatherScenarios
                                    selectedScenario={scenario ?? "Standard"}
                                    onScenarioChange={handleWeatherChange}
                                />
                            </HStack>
                        </Box>
                        {/* <Box>
                            <HStack>
                                <RouteOptionMeta aircraftType={routeOption?.aircraftType} />
                                <RouteOptionMetaItem label={t("settings.title")} text={t("settings.type.standard")} />
                            </HStack>
                        </Box> */}
                    </Box>
                </LayoutSection>
            </Box>
        </Box>
    );
};
