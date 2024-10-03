import { METERS_TO_FEET, formatNumber } from "@voloiq/flight-planning-utils";

type DistanceAltitudeTuple = [number, number];

type CorridorWaypointDataType = {
    departureVertiport: DistanceAltitudeTuple;
    departureFunnelWaypoints?: DistanceAltitudeTuple[] | DistanceAltitudeTuple;
    cruisingAltitudeWaypoints: DistanceAltitudeTuple[];
    arrivalFunnelWaypoints?: DistanceAltitudeTuple[] | DistanceAltitudeTuple;
    arrivalVertiport: DistanceAltitudeTuple;
    arrivalVertiportSurfaceWaypoint: DistanceAltitudeTuple;
    arrivalVertiportSurfaceBufferWaypoint: DistanceAltitudeTuple;
    arrivalVertiportCorridorLowerEdgeAltitude: DistanceAltitudeTuple;
    arrivalVertiportCorridorUpperEdgeAltitude: DistanceAltitudeTuple;
    cruisingCorridoeBuffer: DistanceAltitudeTuple[];
    depatureVertiportCorridorUpperEdgeAltitude: DistanceAltitudeTuple;
    depatureVertiportCorridorLowerEdgeAltitude: DistanceAltitudeTuple;
    departureVertiportSurfaceBufferWaypoint: DistanceAltitudeTuple;
    departureVertiportSurfaceWaypoint: DistanceAltitudeTuple;
};

const flattenArray = (array: (DistanceAltitudeTuple | DistanceAltitudeTuple[])[]) => {
    let flatArray: DistanceAltitudeTuple[] = [];
    for (const value of array) {
        if (value[0] && Array.isArray(value[0])) {
            flatArray = [...flatArray, ...flattenArray(value as DistanceAltitudeTuple[])];
        } else {
            flatArray.push(value as DistanceAltitudeTuple);
        }
    }
    return flatArray;
};
const interpolateFlightAltitudeOutsideFunnel = (props: {
    routeLength: number;
    originAltitude: number;
    altitudeDifference: number;
    distanceToInterpolate: number;
}): number => {
    const { routeLength, originAltitude, altitudeDifference, distanceToInterpolate } = props;
    const altitudeDifferenceFactor = altitudeDifference / routeLength;
    return originAltitude + distanceToInterpolate * altitudeDifferenceFactor;
};
const interpolateFunnelWaypoints = (props: {
    startOfArrivalFunnel: number;
    endOfDepartureFunnel: number;
    haveCruisingAltitudeWaypoints: boolean;
    extrusionConstInFT: number;
    corridorDistanceInNM: number;
    verticalCorridorGapInFt: number;
    departureVertiport: DistanceAltitudeTuple;
    arrivalVertiport: DistanceAltitudeTuple;
    lastCruisingWaypoint: DistanceAltitudeTuple;
    firstCruisingWaypoint: DistanceAltitudeTuple;
    firstWaypointInArrivalFunnel?: DistanceAltitudeTuple;
    lastWaypointInDepartureFunnel?: DistanceAltitudeTuple;
}) => {
    const {
        startOfArrivalFunnel,
        endOfDepartureFunnel,
        haveCruisingAltitudeWaypoints,
        extrusionConstInFT,
        corridorDistanceInNM,
        verticalCorridorGapInFt,
        departureVertiport,
        arrivalVertiport,
        lastCruisingWaypoint,
        firstCruisingWaypoint,
        firstWaypointInArrivalFunnel,
        lastWaypointInDepartureFunnel,
    } = props;
    const arrivalVertiportCorridorUpperEdgeAltitude = [
        startOfArrivalFunnel,
        arrivalVertiport[1] + verticalCorridorGapInFt,
    ] as DistanceAltitudeTuple;
    const arrivalVertiportCorridorLowerEdgeAltitude = [
        startOfArrivalFunnel,
        haveCruisingAltitudeWaypoints
            ? interpolateFlightAltitudeOutsideFunnel({
                  routeLength: firstWaypointInArrivalFunnel
                      ? firstWaypointInArrivalFunnel[0] - lastCruisingWaypoint[0]
                      : arrivalVertiport[0] - lastCruisingWaypoint[0],
                  originAltitude: firstWaypointInArrivalFunnel ? firstWaypointInArrivalFunnel[1] : arrivalVertiport[1],
                  altitudeDifference: firstWaypointInArrivalFunnel
                      ? lastCruisingWaypoint[1] - firstWaypointInArrivalFunnel[1]
                      : lastCruisingWaypoint[1] - arrivalVertiport[1],
                  distanceToInterpolate: firstWaypointInArrivalFunnel
                      ? firstWaypointInArrivalFunnel[0] - startOfArrivalFunnel
                      : corridorDistanceInNM,
              }) - extrusionConstInFT
            : interpolateFlightAltitudeOutsideFunnel({
                  routeLength: arrivalVertiport[0],
                  originAltitude: departureVertiport[1],
                  altitudeDifference: arrivalVertiport[1] - departureVertiport[1],
                  distanceToInterpolate: startOfArrivalFunnel,
              }) - extrusionConstInFT,
    ] as DistanceAltitudeTuple;
    const depatureVertiportCorridorLowerEdgeAltitude = [
        endOfDepartureFunnel,
        haveCruisingAltitudeWaypoints
            ? interpolateFlightAltitudeOutsideFunnel({
                  routeLength: lastWaypointInDepartureFunnel
                      ? firstCruisingWaypoint[0] - lastWaypointInDepartureFunnel[0]
                      : firstCruisingWaypoint[0] - departureVertiport[0],
                  originAltitude: lastWaypointInDepartureFunnel
                      ? lastWaypointInDepartureFunnel[1]
                      : departureVertiport[1],
                  altitudeDifference: lastWaypointInDepartureFunnel
                      ? firstCruisingWaypoint[1] - lastWaypointInDepartureFunnel[1]
                      : firstCruisingWaypoint[1] - departureVertiport[1],
                  distanceToInterpolate: lastWaypointInDepartureFunnel
                      ? endOfDepartureFunnel - lastWaypointInDepartureFunnel[0]
                      : endOfDepartureFunnel,
              }) - extrusionConstInFT
            : interpolateFlightAltitudeOutsideFunnel({
                  routeLength: arrivalVertiport[0],
                  originAltitude: departureVertiport[1],
                  altitudeDifference: arrivalVertiport[1] - departureVertiport[1],
                  distanceToInterpolate: endOfDepartureFunnel,
              }) - extrusionConstInFT,
    ] as DistanceAltitudeTuple;
    const depatureVertiportCorridorUpperEdgeAltitude = [
        endOfDepartureFunnel,
        departureVertiport[1] + verticalCorridorGapInFt,
    ] as DistanceAltitudeTuple;
    return {
        arrivalVertiportCorridorUpperEdgeAltitude,
        arrivalVertiportCorridorLowerEdgeAltitude,
        depatureVertiportCorridorLowerEdgeAltitude,
        depatureVertiportCorridorUpperEdgeAltitude,
    };
};

const createCorridorWaypointsData = (
    waypointAltitudes: DistanceAltitudeTuple[],
    verticalObstacleClearance: number
): CorridorWaypointDataType => {
    const corridorDistanceInNM = 1.823;
    const extrusionConstInFT = 200;
    const surfaceExtrusionConstInFT = 100;
    const verticalClearanceSettingInMeters = verticalObstacleClearance;
    const verticalClearanceSettingInFeet = verticalClearanceSettingInMeters * METERS_TO_FEET;
    const verticalCorridorGapInFt = 500 - verticalClearanceSettingInFeet; // 500 - give\wn vertical clearance value => ft

    const arrivalVertiport = waypointAltitudes.at(-1) as DistanceAltitudeTuple;
    const departureVertiport = waypointAltitudes.at(0) as DistanceAltitudeTuple;

    const departureVertiportCorridor = formatNumber(departureVertiport[0] + corridorDistanceInNM);
    const arrivalVertiportCorridor = formatNumber(arrivalVertiport[0] - corridorDistanceInNM);
    const cruisingAltitudeWaypoints = waypointAltitudes.filter(
        (waypoint) => waypoint[0] > departureVertiportCorridor && waypoint[0] < arrivalVertiportCorridor
    );
    const arrivalFunnelWaypoints = waypointAltitudes.filter(
        (waypoint) => waypoint[0] > arrivalVertiportCorridor && waypoint[0] < arrivalVertiport[0]
    );
    const departureFunnelWaypoints = waypointAltitudes.filter(
        (waypoint) => waypoint[0] > departureVertiport[0] && waypoint[0] < departureVertiportCorridor
    );

    const haveCruisingAltitudeWaypoints = cruisingAltitudeWaypoints.length > 0;
    const cruisingAltitudeWaypointsData =
        cruisingAltitudeWaypoints.length > 0
            ? cruisingAltitudeWaypoints
            : ([
                  [
                      arrivalVertiport[0] / 2,
                      interpolateFlightAltitudeOutsideFunnel({
                          routeLength: arrivalVertiport[0],
                          originAltitude: departureVertiport[1],
                          altitudeDifference: arrivalVertiport[1] - departureVertiport[1],
                          distanceToInterpolate: arrivalVertiport[0] / 2,
                      }),
                  ],
              ] as DistanceAltitudeTuple[]);
    const lastCruisingWaypoint = cruisingAltitudeWaypointsData.at(-1) as DistanceAltitudeTuple;
    const firstCruisingWaypoint = cruisingAltitudeWaypointsData.at(0) as DistanceAltitudeTuple;
    const firstWaypointInArrivalFunnel = arrivalFunnelWaypoints ? arrivalFunnelWaypoints.at(0) : undefined;
    const lastWaypointInDepartureFunnel = departureFunnelWaypoints ? departureFunnelWaypoints.at(-1) : undefined;
    const {
        arrivalVertiportCorridorUpperEdgeAltitude,
        arrivalVertiportCorridorLowerEdgeAltitude,
        depatureVertiportCorridorLowerEdgeAltitude,
        depatureVertiportCorridorUpperEdgeAltitude,
    } = interpolateFunnelWaypoints({
        startOfArrivalFunnel: arrivalVertiportCorridor,
        endOfDepartureFunnel: departureVertiportCorridor,
        haveCruisingAltitudeWaypoints,
        extrusionConstInFT,
        corridorDistanceInNM,
        verticalCorridorGapInFt,
        departureVertiport,
        arrivalVertiport,
        lastCruisingWaypoint,
        firstCruisingWaypoint,
        firstWaypointInArrivalFunnel,
        lastWaypointInDepartureFunnel,
    });
    const corridorWaypointsData = {
        departureVertiport,
        departureFunnelWaypoints: departureFunnelWaypoints.length > 0 ? departureFunnelWaypoints : departureVertiport,
        cruisingAltitudeWaypoints: cruisingAltitudeWaypointsData,
        arrivalFunnelWaypoints: arrivalFunnelWaypoints.length > 0 ? arrivalFunnelWaypoints : arrivalVertiport,
        arrivalVertiport,
        arrivalVertiportSurfaceWaypoint: [arrivalVertiport[0], arrivalVertiport[1]] as DistanceAltitudeTuple,
        arrivalVertiportSurfaceBufferWaypoint: [
            arrivalVertiport[0],
            arrivalVertiport[1] - surfaceExtrusionConstInFT,
        ] as DistanceAltitudeTuple,
        arrivalVertiportCorridorUpperEdgeAltitude,
        arrivalVertiportCorridorLowerEdgeAltitude,
        cruisingCorridoeBuffer: [...cruisingAltitudeWaypointsData]
            .reverse()
            .map((waypoint) => [waypoint[0], waypoint[1] - extrusionConstInFT] as DistanceAltitudeTuple),
        depatureVertiportCorridorLowerEdgeAltitude,
        depatureVertiportCorridorUpperEdgeAltitude,
        departureVertiportSurfaceBufferWaypoint: [
            departureVertiport[0],
            departureVertiport[1] - surfaceExtrusionConstInFT,
        ] as DistanceAltitudeTuple,
        departureVertiportSurfaceWaypoint: [departureVertiport[0], departureVertiport[1]] as DistanceAltitudeTuple,
    };
    return corridorWaypointsData;
};

const genrateCorridorGraphData = (corridorData: CorridorWaypointDataType) => {
    const corridorvalues = Object.values(corridorData);
    return flattenArray(corridorvalues);
};

export const calculateObstacleClearanceCorridor = (
    waypointAltitudes: DistanceAltitudeTuple[],
    verticalObstacleClearance: number
) => {
    const corridorData = createCorridorWaypointsData(waypointAltitudes, verticalObstacleClearance);
    const corridorGraphData = genrateCorridorGraphData(corridorData);
    return corridorGraphData;
};
