import type { Waypoint } from "@voloiq-typescript-api/flight-planning-types";
import { getDistanceFromLatLonInKm } from "../getDistanceFromLatLonInKm";

const mockWaypoint1: Waypoint = {
    id: 1,
    name: "bruchsal",
    lat: 49.139_294_903_096_186,
    lng: 8.585_145_698_059_245,
    rnp: 0.2,
    alt: 0,
};

const mockWaypoint2: Waypoint = {
    id: 2,
    name: "norderstedt",
    lat: 53.708_932_780_488_85,
    lng: 10.022_601_507_521_54,
    rnp: 0.2,
    alt: 0,
};

test("distance in km between two points", async () => {
    const value = getDistanceFromLatLonInKm(mockWaypoint1.lat, mockWaypoint1.lng, mockWaypoint2.lat, mockWaypoint2.lng);
    expect(value).toEqual(517.773_662_938_385_2);
});
