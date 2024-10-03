import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { MapRoute, MapRouteProps } from "./MapRoute";

const meta: Meta = {
    title: "Flight Planning/Map Route",
    component: MapRoute,
    args: {
        waypoints: [
            anyWaypoint({ lat: 41.899, lng: 12.504 }),
            anyWaypoint({ lat: 41.819, lng: 12.507 }),
            anyWaypoint({ lat: 41.82, lng: 12.274 }),
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

export const Basic: StoryFn<MapRouteProps> = (props) => <MapRoute {...props} />;
export const SmallContainer: StoryFn<MapRouteProps> = (props) => (
    <Box h="200px" w="500px">
        <MapRoute {...props} />
    </Box>
);
