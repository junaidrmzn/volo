import { useGetCsflSitesQuery } from "@voloiq/flight-planning-api/v1";
import { formatIsoString } from "../../../../lib/echarts";
import { useGetRouteFullEnergy } from "../../../api-hooks";
import { useSelectedRoute } from "../../selected-route";
import { maxDefaultTemperature } from "../battery-temperature/constants";
import { GraphType, MarkLineType } from "../types";

export const useGetCsflMarkLines = (graphType: GraphType) => {
    const { selectedRoute } = useSelectedRoute();
    const batteryCurveQuery = useGetRouteFullEnergy(selectedRoute?.id);
    const { data: allCsflSitesData } = useGetCsflSitesQuery({
        routeId: selectedRoute?.id || 0,
        isEnabled: !!selectedRoute?.id,
    });

    if (batteryCurveQuery.isFetching || !batteryCurveQuery.isSuccess || !batteryCurveQuery.data?.csflPowerCurve)
        return [];

    const markLineData: MarkLineType[] = [];
    const minValue = graphType === "batteryCapacity" ? 0 : 15;
    const maxValue =
        graphType === "batteryCapacity"
            ? Math.max(...batteryCurveQuery.data.mainEnergyPowercurve.map((energy) => energy.remainingEnergy))
            : maxDefaultTemperature;

    for (const { time, bestReachableCsflSiteName } of batteryCurveQuery.data.csflPowerCurve) {
        const timeString = formatIsoString(time);
        if (markLineData.length === 0 || markLineData.length === batteryCurveQuery.data.csflPowerCurve.length - 1) {
            // insert fake vertical lines
            markLineData.push([{ id: null, name: "", coord: [0, 0] }, { coord: [0, 0] }]);
        } else if (markLineData[markLineData.length - 1]![0].id! !== bestReachableCsflSiteName) {
            markLineData.push([
                {
                    id: bestReachableCsflSiteName,
                    name:
                        allCsflSitesData?.find((csfl) => csfl.name === bestReachableCsflSiteName)?.name ||
                        bestReachableCsflSiteName!,
                    coord: [timeString, minValue],
                },
                { coord: [timeString, maxValue] },
            ]);
        }
    }

    return markLineData;
};
