import { Box, Button, FormControl, FormLabel, HStack, Input, Text, VStack } from "@volocopter/design-library-react";
import { UseWaypointStateOptions, useWaypointState } from "./useWaypointState";

export type ControlPanelProps = UseWaypointStateOptions;

export const ControlPanel = (props: ControlPanelProps) => {
    const {
        onSubscribeToWaypointAdd,
        onSubscribeToWaypointDelete,
        onSubscribeToWaypointUpdate,
        onAddWaypoint,
        onDeleteWaypoint,
        onUpdateWaypoint,
    } = props;

    const { addWaypoint, deleteWaypoint, updateWaypoint, waypoints } = useWaypointState({
        onSubscribeToWaypointAdd,
        onSubscribeToWaypointDelete,
        onSubscribeToWaypointUpdate,
        onAddWaypoint,
        onDeleteWaypoint,
        onUpdateWaypoint,
    });

    return (
        <VStack>
            {waypoints.map((waypoint, index) => (
                <Box background="gray.50" p={4} borderRadius="sm" minHeight="256px" key={waypoint.id}>
                    <Text>Waypoint</Text>
                    <VStack alignItems="stretch">
                        <HStack alignItems="flex-end">
                            <FormControl>
                                <FormLabel>Altitude</FormLabel>
                                <Input
                                    type="number"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = Number.parseFloat(event.target.value);
                                        updateWaypoint(index, "alt", value);
                                    }}
                                    value={waypoint.alt}
                                />
                            </FormControl>
                        </HStack>
                        <HStack alignItems="flex-end">
                            <FormControl>
                                <FormLabel>Latitude</FormLabel>
                                <Input
                                    type="number"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = Number.parseFloat(event.target.value);
                                        updateWaypoint(index, "lat", value);
                                    }}
                                    value={waypoint.lat}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Longitude</FormLabel>
                                <Input
                                    type="number"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = Number.parseFloat(event.target.value);
                                        updateWaypoint(index, "lng", value);
                                    }}
                                    value={waypoint.lng}
                                />
                            </FormControl>
                            <Button onClick={() => deleteWaypoint(waypoint)}>✖</Button>
                        </HStack>
                    </VStack>
                </Box>
            ))}
            <Button onClick={addWaypoint}>+</Button>
        </VStack>
    );
};
