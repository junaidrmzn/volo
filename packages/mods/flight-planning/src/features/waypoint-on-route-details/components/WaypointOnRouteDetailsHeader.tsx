import {
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    Text,
} from "@volocopter/design-library-react";
import _ from "lodash";
import { RequirePermissions } from "@voloiq/auth";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap, VoloiqMapStoreType, deselectAllWaypoints, updateSelectedWaypoint } from "@voloiq/map";
import { useFlightPlanningTranslation } from "../../../translations";
import { useWaypointOnRouteDetailsHeader } from "../hooks";

type WaypointOnRouteDetailsHeaderProps = {
    isEditable: boolean;
    routeId: number;
    waypoint: Waypoint;
    voloiqMapStore?: VoloiqMapStoreType;
    onSuccessfulDelete?: () => unknown;
};
export const WaypointOnRouteDetailsHeader = (props: WaypointOnRouteDetailsHeaderProps) => {
    const { isEditable, routeId, waypoint, onSuccessfulDelete, voloiqMapStore } = props;
    const { t: translate } = useFlightPlanningTranslation();
    const { handleDeleteWaypoint, deselectWaypoint } = useWaypointOnRouteDetailsHeader({
        routeId,
        voloiqMapStore,
        onSuccessfulDelete,
    });
    const map = (window.getMap() as VoloiqMap) ?? undefined;
    if (map && map.waypointsHashMap) updateSelectedWaypoint(map, map.waypointsHashMap[waypoint.id]);
    const title = waypoint.name ?? "Details";

    return (
        <HStack justifyContent="space-between" h="48px" p={3} flex="0 1 auto">
            <IconButton
                onClick={() => {
                    deselectWaypoint();
                    deselectAllWaypoints(window.getMap());
                }}
                variant="ghost"
                size="lg"
                aria-label={translate("waypointDetails.back")}
                data-testid="waypoint-details-back-button"
                icon={<Icon icon="chevronLeft" />}
            />
            <Text
                data-testid="waypoint-details-heading"
                size="small"
                fontWeight="bold"
                textAlign="center"
                pos="absolute"
                left="50%"
                transform="translateX(-50%)"
            >
                {_.truncate(title, { length: 20 })}
            </Text>
            <RequirePermissions resources={["Waypoint"]} actions={["delete"]}>
                <Menu placement="right-start">
                    <MenuButton
                        as={IconButton}
                        aria-label={translate("waypointDetails.menu.open")}
                        icon={<Icon icon="ellipsisVertical" />}
                        variant="ghost"
                        size="lg"
                        data-testid="waypoint-details-menu-button"
                    />
                    <Portal>
                        <MenuList>
                            <MenuItem
                                data-testid="waypoint-details-menu-delete"
                                icon={<Icon icon="delete" />}
                                onClick={() => handleDeleteWaypoint(waypoint)}
                                isDisabled={!isEditable}
                            >
                                {translate("waypointDetails.menu.deleteWaypoint")}
                            </MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </RequirePermissions>
        </HStack>
    );
};
