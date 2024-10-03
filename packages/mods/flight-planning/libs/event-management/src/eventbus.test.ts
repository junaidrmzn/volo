import { EventBus } from "./eventBus";
import { AirSpaceTestType, WaypointTestType } from "./types";

const eventBusObject = {
    waypoints: new EventBus<WaypointTestType>(),
    airSpace: new EventBus<AirSpaceTestType>(),
};

describe("Event bus layer", () => {
    test("subscriber callbacks are invoked when subscribed event gets published", () => {
        const spyFunction = jest.fn((args: AirSpaceTestType) => args);
        const eventbusInstance = eventBusObject.airSpace;
        eventbusInstance.subscribe({
            eventName: "AIRSPACE_SHOW",
            moduleName: "test-component",
            handler: spyFunction,
        });
        eventbusInstance.publish({
            eventName: "AIRSPACE_SHOW",
            moduleName: "no-test-component",
            component: "airSpace",
            args: { airSpaceShow: true, selectedAirspaceOptions: [], airspacesAltitudeRange: [0, 10_000] },
        });
        expect(spyFunction).toHaveBeenCalledWith({
            airSpaceShow: true,
            selectedAirspaceOptions: [],
            airspacesAltitudeRange: [0, 10_000],
        });
    });
    test("subscriber callbacks are not invoked if they are not subscribed to a published event", () => {
        const spyFunction = jest.fn((args: WaypointTestType) => args);
        const eventbusInstance = eventBusObject.waypoints;
        eventbusInstance.subscribe({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "test-component",
            handler: spyFunction,
        });
        eventbusInstance.publish({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "test-component",
            component: "airSpace",
            args: {
                id: 123,
                name: "test1",
                lat: 23.245_64,
                lng: 2.4454,
                alt: 25,
                rnp: 100,
                routeSequenceIndex: 2,
                transitionType: "fly-by",
                transitionRadius: 100,
                speed: 250,
                heading: 150,
                targetTimeOver: 0,
            },
        });
        expect(spyFunction).toBeCalledTimes(0);
    });
    test("subscriber callbacks are not invoked for the module that published the event", () => {
        const spyFunction = jest.fn((args: WaypointTestType) => args);
        const eventbusInstance = eventBusObject.waypoints;
        eventbusInstance.subscribe({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "test-component",
            handler: spyFunction,
        });
        eventbusInstance.publish({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "test-component",
            component: "waypoints",
            args: {
                id: 123,
                name: "test1",
                lat: 23.245_64,
                lng: 2.4454,
                alt: 25,
                rnp: 100,
                routeSequenceIndex: 2,
                transitionType: "fly-by",
                transitionRadius: 100,
                speed: 250,
                heading: 150,
                targetTimeOver: 0,
            },
        });
        expect(spyFunction).toBeCalledTimes(0);
    });
    test("subscriber callbacks are not invoked after unsubscribing from event", () => {
        const spyFunction = jest.fn((args: WaypointTestType) => args);
        const eventbusInstance = eventBusObject.waypoints;
        eventbusInstance.subscribe({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "test-component",
            handler: spyFunction,
        });
        eventbusInstance.unsubscribe({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "test-component",
            handler: spyFunction,
        });
        eventbusInstance.publish({
            eventName: "WAYPOINT_UPDATE",
            moduleName: "no-test-component",
            component: "waypoints",
            args: {
                id: 123,
                name: "test1",
                lat: 23.245_64,
                lng: 2.4454,
                alt: 25,
                rnp: 100,
                routeSequenceIndex: 2,
                transitionType: "fly-by",
                transitionRadius: 100,
                speed: 250,
                heading: 150,
                targetTimeOver: 0,
            },
        });
        expect(spyFunction).toBeCalledTimes(0);
    });
    test("subsciber can subscribe to multiple events", () => {
        const spyFunction = jest.fn((args: WaypointTestType) => args);
        const eventbusInstance = eventBusObject.waypoints;
        eventbusInstance.subscribe([
            {
                eventName: "WAYPOINT_CREATE",
                moduleName: "test-component",
                handler: spyFunction,
            },
            {
                eventName: "WAYPOINT_DELETE",
                moduleName: "test-component",
                handler: spyFunction,
            },
        ]);

        eventbusInstance.publish({
            eventName: "WAYPOINT_CREATE",
            moduleName: "no-test-component",
            component: "waypoints",
            args: {
                id: 123,
                name: "test1",
                lat: 23.245_64,
                lng: 2.4454,
                alt: 25,
                rnp: 100,
                routeSequenceIndex: 2,
                transitionType: "fly-by",
                transitionRadius: 100,
                speed: 250,
                heading: 150,
                targetTimeOver: 0,
            },
        });
        expect(spyFunction).toHaveBeenCalledWith({
            id: 123,
            name: "test1",
            lat: 23.245_64,
            lng: 2.4454,
            alt: 25,
            rnp: 100,
            routeSequenceIndex: 2,
            transitionType: "fly-by",
            transitionRadius: 100,
            speed: 250,
            heading: 150,
            targetTimeOver: 0,
        });
        eventbusInstance.publish({
            eventName: "WAYPOINT_DELETE",
            moduleName: "no-test-component",
            component: "waypoints",
            args: {
                id: 124,
                name: "test2",
                lat: 23.215_64,
                lng: 3.4454,
                alt: 46,
                rnp: 120,
                routeSequenceIndex: 3,
                transitionType: "fly-by",
                transitionRadius: 100,
                speed: 50,
                heading: 230,
                targetTimeOver: 0,
            },
        });
        expect(spyFunction).toHaveBeenCalledWith({
            id: 124,
            name: "test2",
            lat: 23.215_64,
            lng: 3.4454,
            alt: 46,
            rnp: 120,
            routeSequenceIndex: 3,
            transitionType: "fly-by",
            transitionRadius: 100,
            speed: 50,
            heading: 230,
            targetTimeOver: 0,
        });
    });
});
