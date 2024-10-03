import { GraphType, MarkLineReference } from "../types";
import { useGetCsflMarkLines } from "./useGetCsflMarkLines";
import { useGetWaypointMarkLines } from "./useGetWaypointMarkLines";

type UseGetMarkLinesOptions = {
    markLineReference: MarkLineReference;
    graphType: GraphType;
};
export const useGetMarkLines = (options: UseGetMarkLinesOptions) => {
    const { markLineReference, graphType } = options;

    const csflMarkLine = useGetCsflMarkLines(graphType);
    const waypointsMarkLine = useGetWaypointMarkLines(graphType);

    if (markLineReference === "waypoints") return waypointsMarkLine;

    return csflMarkLine;
};
