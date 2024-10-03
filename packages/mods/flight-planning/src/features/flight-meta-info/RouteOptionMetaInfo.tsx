import { Box, HStack, Icon, IconButton, Text, VStack, useColorModeValue } from "@volocopter/design-library-react";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { useNavigate } from "@voloiq/routing";
import { ValidForOperationTag } from "../../components/ValidForOperationTag";
import { useFlightPlanningTranslation } from "../../translations";
import { useSelectedRoute } from "../selected-route";
import { AircraftTypeInfo } from "./AircraftTypeInfo";

export const RouteOptionMetaInfo = () => {
    const navigate = useNavigate();
    const { routeOptionId } = useSelectedRoute();
    const bgColor = useColorModeValue("white", "gray.900");
    const { t: translate } = useFlightPlanningTranslation();
    const { data: routeOptionQueryData } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });

    return (
        <VStack bgColor={bgColor} w="100%" boxShadow="lg" borderRadius="lg" alignItems="normal" pointerEvents="auto">
            <HStack justifyContent="space-between" minHeight="44px" p={3} flex="0 1 auto">
                <IconButton
                    onClick={() => navigate(`../route-options/${routeOptionId}`)}
                    variant="ghost"
                    size="lg"
                    aria-label={translate("common.back")}
                    data-testid="flight-meta-info-back-button"
                    icon={<Icon icon="chevronLeft" />}
                />
                <Text data-testid="flight-meta-info-heading" size="medium" fontWeight="bold">
                    {routeOptionQueryData?.name}
                </Text>
                <Box width="24px" height="24px" />
            </HStack>
            {routeOptionQueryData && (
                <>
                    <HStack px={4} pb={0} justify="space-between">
                        <Text fontWeight="bold" fontSize="sm">
                            {translate("routeOption.metaInfo.status")}:
                        </Text>
                        <ValidForOperationTag validForOperation={routeOptionQueryData.validForOperation} />
                    </HStack>
                    <AircraftTypeInfo routeOption={routeOptionQueryData} />
                </>
            )}
        </VStack>
    );
};
