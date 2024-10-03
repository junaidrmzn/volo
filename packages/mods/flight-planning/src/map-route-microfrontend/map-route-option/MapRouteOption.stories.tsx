import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { LngLatBounds } from "maplibre-gl";
import { anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { MapRouteOption, MapRouteOptionProps } from "./MapRouteOption";

const meta: Meta = {
    title: "Flight Planning/Map Route Option",
    component: MapRouteOption,
    args: {
        focusBounds: new LngLatBounds([12.3, 41.899, 12.507, 41.819]),
        routes: [
            anyRoute({
                id: 1,
                waypoints: [
                    anyWaypoint({ lat: 41.899, lng: 12.504 }),
                    anyWaypoint({ lat: 41.819, lng: 12.507 }),
                    anyWaypoint({ lat: 41.82, lng: 12.274 }),
                ],
            }),
            anyRoute({
                id: 2,
                waypoints: [
                    anyWaypoint({ lat: 41.899, lng: 12.504 }),
                    anyWaypoint({ lat: 41.85, lng: 12.3 }),
                    anyWaypoint({ lat: 41.82, lng: 12.274 }),
                ],
            }),
        ],
    },
    decorators: [
        (Story) => (
            <Box h="xl" w="100%">
                <Story />
            </Box>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<MapRouteOptionProps> = (props) => <MapRouteOption {...props} />;
export const SmallContainer: StoryFn<MapRouteOptionProps> = (props) => (
    <Box h="200px" w="500px">
        <MapRouteOption {...props} />
    </Box>
);
