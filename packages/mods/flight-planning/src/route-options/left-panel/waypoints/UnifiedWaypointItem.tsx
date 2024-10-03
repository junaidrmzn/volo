import { Box, Grid, GridItem, HStack, Icon, IconButton, Text } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { formatTtoFromSeconds } from "../../../utils";
import { DeleteWaypoint } from "../modal-popups/DeleteWaypoint";
import { EditSegment } from "../modal-popups/EditSegment";
import { EditWaypoint } from "./EditWaypoint";
import { useWaypointItem } from "./hooks/useWaypointItem";
import { useWaypointsTranslation } from "./translations";
import { getWaypointName } from "./utils/getWaypointName";

export type UnifiedWaypointItemProps = {
    item: Waypoint;
    nextItem?: Waypoint;
    distanceToNext?: number;
    distanceTillYet?: number;
    onInvalidateRoute: () => void;
    selectedRouteId: number;
};

export const UnifiedWaypointItem = (props: UnifiedWaypointItemProps) => {
    const { item, nextItem, distanceToNext, distanceTillYet, selectedRouteId, onInvalidateRoute } = props;
    const { t } = useWaypointsTranslation();
    const { selectedWaypoint, modalType, handleEdit, handleDelete, handleClose } = useWaypointItem();
    const isSegment = !!nextItem;
    const iconSize = 3.5;

    return (
        <>
            <Box
                borderRadius="lg"
                overflow="hidden"
                w="348px"
                marginBottom={1}
                px={2}
                py={1}
                {...(isSegment && { bg: "gray.300" })}
            >
                <Grid
                    templateColumns="min-content 1fr auto auto auto"
                    gap={1}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <GridItem>
                        <IconButton size="sm" variant="ghost" aria-label={t("icon")}>
                            {!isSegment && <Icon icon={item.isVertiport ? "voloport" : "bars"} size={iconSize} />}
                        </IconButton>
                    </GridItem>

                    <GridItem flexGrow={1}>
                        <Text fontSize="xs" textAlign="left">
                            {!isSegment
                                ? getWaypointName(item)
                                : `${getWaypointName(item)} - ${getWaypointName(nextItem)}`}
                        </Text>
                    </GridItem>

                    <GridItem>
                        {!isSegment && (
                            <Text fontSize="xs" textAlign="right">
                                {`${distanceTillYet?.toFixed(2)} NM `}
                            </Text>
                        )}
                    </GridItem>

                    <GridItem>
                        <Text fontSize="xs" textAlign="right">
                            {!isSegment
                                ? `${formatTtoFromSeconds(item.targetTimeOver)}`
                                : `+${formatTtoFromSeconds(nextItem.targetTimeOver - item.targetTimeOver)}`}
                        </Text>
                    </GridItem>

                    <GridItem>
                        <HStack spacing={0.5}>
                            <IconButton
                                size="sm"
                                variant="ghost"
                                aria-label={t("edit")}
                                onClick={() => handleEdit(item, isSegment)}
                            >
                                <Icon icon="penWithBox" size={iconSize} />
                            </IconButton>

                            <IconButton
                                size="sm"
                                variant="ghost"
                                aria-label={t("delete")}
                                onClick={() => handleDelete(item)}
                            >
                                {!isSegment && <Icon icon="trash" size={iconSize} />}
                            </IconButton>
                        </HStack>
                    </GridItem>
                </Grid>
            </Box>
            {/* Modals */}
            {selectedWaypoint && modalType === "edit" && (
                <EditWaypoint
                    waypoint={selectedWaypoint}
                    selectedRouteId={selectedRouteId}
                    onClose={handleClose}
                    onInvalidateRoute={onInvalidateRoute}
                    isOpen
                />
            )}

            {isSegment && selectedWaypoint && modalType === "editSegment" && (
                <EditSegment
                    waypoint={item}
                    nextWaypoint={nextItem}
                    onClose={handleClose}
                    distanceToNextWayPoint={distanceToNext}
                    isOpen
                />
            )}

            {selectedWaypoint && modalType === "delete" && (
                <DeleteWaypoint selectedWaypoint={selectedWaypoint} isOpen onClose={handleClose} />
            )}
        </>
    );
};
