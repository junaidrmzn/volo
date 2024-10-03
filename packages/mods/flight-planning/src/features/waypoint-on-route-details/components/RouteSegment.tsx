import { Box, Button, HStack, Text, VStack } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMapStoreType } from "@voloiq/map";
import { useFlightPlanningTranslation } from "../../../translations";
import { useSegmentEditingContext } from "../../map-route-layer/segment-editing";
import { RadiusInput } from "./RadiusInput";
import { useRouteSegment } from "./useRouteSegment";

type RouteSegmentProps = {
    isEditable: boolean;
    routeSequenceIndex: number;
    selectedWaypoint: Waypoint;
    routeId: number;
    voloiqMapStore?: VoloiqMapStoreType;
};

export const RouteSegment = (props: RouteSegmentProps) => {
    const { isEditable, routeSequenceIndex, selectedWaypoint, routeId, voloiqMapStore } = props;
    const { t } = useFlightPlanningTranslation();

    const { segmentEditMode, setSegmentEditMode, isArcSegmentDirectionInverse, setIsArcSegmentDirectionInverse } =
        useSegmentEditingContext();
    const { onSaveRouteSegment, isInvalid, setIsInvalid, isLoading } = useRouteSegment({
        routeId,
        waypointId: selectedWaypoint.id,
        hasArcSegment: !!selectedWaypoint.routeSegment,
        selectedWaypoint,
        setIsArcSegmentDirectionInverse,
        voloiqMapStore,
    });

    const directButtonVariant = segmentEditMode === "direct" ? "primary" : "secondary";
    const turnButtonVariant = segmentEditMode === "turn" ? "primary" : "secondary";
    const invertButtonVariant = segmentEditMode === "turn" && isArcSegmentDirectionInverse ? "primary" : "secondary";

    return (
        <VStack gap={2} alignItems="left">
            <Text display="flex" flexDirection="row" gap="1">
                <Text fontSize="sm" fontWeight="bold">
                    {t("flight.routeSegment.headingPrefix")}
                </Text>
                <Text fontSize="sm">
                    {t("flight.routeSegment.headingSuffix")} WP{routeSequenceIndex} - WP{routeSequenceIndex + 1}
                </Text>
            </Text>

            <Box>
                <Text fontSize="xs" fontWeight="bold" color="darkBlue.500" mb={2}>
                    {t("flight.routeSegment.typeOfConnection")}
                </Text>
                <HStack>
                    <Button variant={directButtonVariant} onClick={() => setSegmentEditMode("direct")}>
                        {t("flight.routeSegment.direct")}
                    </Button>
                    <Button variant={turnButtonVariant} onClick={() => setSegmentEditMode("turn")}>
                        {t("flight.routeSegment.turn")}
                    </Button>
                </HStack>
            </Box>

            <Box>
                <Text fontSize="xs" fontWeight="bold" color="darkBlue.500" mb={2}>
                    {t("flight.routeSegment.labelArcSegmentDirection")}
                </Text>
                <Button
                    variant={invertButtonVariant}
                    onClick={() => setIsArcSegmentDirectionInverse(!isArcSegmentDirectionInverse)}
                    isDisabled={segmentEditMode !== "turn"}
                >
                    {t("flight.routeSegment.buttonLabelArcSegmentDirection")}
                </Button>
            </Box>

            <RadiusInput
                isEditable={isEditable}
                selectedWaypoint={selectedWaypoint}
                setIsInvalid={setIsInvalid}
                isInvalid={isInvalid}
            />

            <RequirePermissions resources={["Waypoint"]} actions={["update"]}>
                <Button
                    width="100%"
                    variant="primary"
                    onClick={() => onSaveRouteSegment()}
                    isDisabled={isInvalid}
                    isLoading={isLoading}
                >
                    {t("common.save")}
                </Button>
            </RequirePermissions>
        </VStack>
    );
};
