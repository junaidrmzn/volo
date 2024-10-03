import { useQueryClient } from "react-query";
import { RouteFullEnergy } from "@voloiq/flight-planning-api/v1";
import { formatIsoString } from "../../../../lib/echarts";
import { useSelectedRoute } from "../../selected-route";
import { maxDefaultTemperature } from "../battery-temperature/constants";
import { GraphType, MarkLineType } from "../types";

export const useGetWaypointMarkLines = (graphType: GraphType) => {
    const { selectedRoute } = useSelectedRoute();
    const queryClient = useQueryClient();

    const routeFullEnergy = queryClient.getQueryData<RouteFullEnergy>([
        "routes",
        { routeId: selectedRoute?.id },
        "energy",
        "fullEnergy",
    ]);

    if (!routeFullEnergy?.waypointsReference || routeFullEnergy.waypointsReference.length === 0) return [];

    const markLineData: MarkLineType[] = [];
    const minValue = graphType === "batteryCapacity" ? 0 : 15;
    const maxValue =
        graphType === "batteryCapacity"
            ? Math.max(...routeFullEnergy.mainEnergyPowercurve.map((energy) => energy.remainingEnergy))
            : maxDefaultTemperature;

    for (const { time, waypointName } of routeFullEnergy.waypointsReference) {
        const timeString = formatIsoString(time);
        if (markLineData.length === 0 || markLineData.length === routeFullEnergy.waypointsReference.length - 1) {
            // insert fake vertical lines
            markLineData.push([
                {
                    id: null,
                    name: "",
                    coord: [0, 0],
                },
                { coord: [0, 0] },
            ]);
        } else {
            markLineData.push([
                {
                    id: waypointName,
                    name: waypointName,
                    coord: [timeString, minValue],
                },
                { coord: [timeString, maxValue] },
            ]);
        }
    }
    return markLineData;
};
