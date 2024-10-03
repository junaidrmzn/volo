import type { Meta, StoryFn } from "@storybook/react";
import { anyMission } from "@voloiq/network-schedule-management-api/v1";
import { FlightPlanTab, FlightPlanTabProps } from "./FlightPlanTab";

const meta: Meta = {
    title: "Mission Management/Flight Plan Tab",
    component: FlightPlanTab,
    args: {
        mission: anyMission(),
    },
};
export default meta;
const waypoints = [
    {
        validationResult: {
            time: 1,
            remainingDistance2d: 10,
            remainingDistance3d: 10,
            remainingEnergy: 10,
        },
    },
    {
        validationResult: {
            time: 10,
            remainingDistance2d: 0,
            remainingDistance3d: 0,
            remainingEnergy: 0,
        },
    },
];

export const WithoutAnyRoutes: StoryFn<FlightPlanTabProps> = (props) => <FlightPlanTab {...props} />;
WithoutAnyRoutes.args = {
    mission: anyMission({
        assignments: {
            id: "",
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            routeOption: { id: 1, routes: [] },
        },
    }),
};

export const WithValidRoutes: StoryFn<FlightPlanTabProps> = (props) => <FlightPlanTab {...props} />;
WithValidRoutes.args = {
    mission: anyMission({
        assignments: {
            id: "",
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            routeOption: {
                id: 1,
                routes: [
                    {
                        id: 1,
                        status: "valid",
                        waypoints,
                    },
                ],
            },
        },
    }),
};

export const WithInvalidRoutes: StoryFn<FlightPlanTabProps> = (props) => <FlightPlanTab {...props} />;
WithInvalidRoutes.args = {
    mission: anyMission({
        assignments: {
            id: "",
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            routeOption: {
                id: 1,
                routes: [
                    {
                        id: 1,
                        status: "invalid",
                        waypoints,
                    },
                ],
            },
        },
    }),
};

export const WithInvalidAndValidRoutes: StoryFn<FlightPlanTabProps> = (props) => <FlightPlanTab {...props} />;
WithInvalidAndValidRoutes.args = {
    mission: anyMission({
        assignments: {
            id: "",
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
            routeOption: {
                id: 1,
                routes: [
                    {
                        id: 1,
                        status: "invalid",
                        waypoints,
                    },
                    {
                        id: 2,
                        status: "valid",
                        waypoints,
                    },
                    {
                        id: 3,
                        status: "invalid",
                        waypoints,
                    },
                    {
                        id: 4,
                        status: "valid",
                        waypoints,
                    },
                ],
            },
        },
    }),
};
