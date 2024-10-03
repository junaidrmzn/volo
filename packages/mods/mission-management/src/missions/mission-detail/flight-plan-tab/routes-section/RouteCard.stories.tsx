import type { Meta, StoryFn } from "@storybook/react";
import type { RouteCardProps } from "./RouteCard";
import { RouteCard } from "./RouteCard";

const meta: Meta = {
    title: "Mission Management/RouteCard",
    component: RouteCard,
    args: {
        route: {
            id: "routeId",
            waypoints: [
                {
                    validationResult: {
                        remainingDistance3d: 100,
                        remainingEnergy: 100,
                        time: 100,
                    },
                },
                {
                    validationResult: {
                        remainingDistance3d: 200,
                        remainingEnergy: 200,
                        time: 200,
                    },
                },
            ],
        },
        routeName: "Route A",
    },
};
export default meta;

export const Basic: StoryFn<RouteCardProps> = (props) => <RouteCard {...props} />;
