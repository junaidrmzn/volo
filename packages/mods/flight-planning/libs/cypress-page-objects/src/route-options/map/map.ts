import { PointGeom } from "@voloiq/map";
import { flightStatusBar } from "./flightStatusBar";
import { mapButtons } from "./mapButtons";
import { routesPanel } from "./routesPanel";
import { snappingDialog } from "./snappingDialog";
import { waypointDetailsPanel } from "./waypointDetailsPanel";
import { waypointsPanel } from "./waypointsPanel";

declare const expect: Chai.ExpectStatic;

export const map = {
    routesPanel,
    waypointsPanel,
    waypointDetailsPanel,
    snappingDialog,
    mapButtons,
    flightStatusBar,
    centerPointMarker: () => cy.findByRole("img", { name: "Center Point" }),
    getMapCanvas: (): Promise<string> => {
        return new Promise((resolve, reject) => {
            cy.window().then((window) => {
                const map = window.getMap();
                if (map) {
                    const dataUrl = map.getCanvas().toDataURL("image/jpeg", 0.1);
                    resolve(dataUrl.replace("data:image/jpeg;base64,", ""));
                }
                reject(new Error("Map object is invalid"));
            });
        });
    },
    featureShouldBeVisible: (featureCoordinates: [number, number], layerSource: string) =>
        cy.window().should((window) => {
            const { x, y } = window.getMap()?.project(featureCoordinates) ?? { x: Number.NaN, y: Number.NaN };
            const feature = window
                .getMap()
                ?.queryRenderedFeatures([x, y])
                .filter((feature) => feature.source === layerSource);
            expect(feature?.length, "feature is not rendered on map").to.be.greaterThan(0);
        }),
    dragAndDropPointOnMap: (options: { startCoordinates: [number, number]; dragX?: number; dragY?: number }) =>
        cy.window().then((window) => {
            const { startCoordinates, dragX = 0, dragY = 0 } = options;
            const { x, y } = window.getMap()?.project(startCoordinates) ?? {
                x: Number.NaN,
                y: Number.NaN,
            };
            cy.get(".maplibregl-canvas")
                .trigger("mousemove", x, y, { force: true })
                .trigger("mousedown", x, y, { force: true })
                .trigger("mousemove", x + dragX, y + dragY, { force: true })
                .trigger("mouseup", x + dragX, y + dragY, { force: true });
        }),
    validateFeatureData: (options: {
        featureCoordinates: [number, number];
        layerId: string;
        dataToValidate: { key: string; value: string | boolean };
    }) =>
        cy.window().should((window) => {
            const { featureCoordinates, layerId, dataToValidate } = options;
            const { x, y } = window.getMap()?.project(featureCoordinates) ?? {
                x: Number.NaN,
                y: Number.NaN,
            };
            const bbox: [PointGeom, PointGeom] = [
                [x - 15, y - 15],
                [x + 15, y + 15],
            ];
            const selectedFeatures = window
                .getMap()
                ?.queryRenderedFeatures(bbox, { layers: [layerId] })
                .filter((feature) => feature.properties[dataToValidate.key ?? ""] === dataToValidate.value);
            expect(selectedFeatures?.length, "Couldn't find a waypoint with the required crateria").to.be.greaterThan(
                0
            );
        }),
    clickOnMap: (options: { coordinates: [number, number]; isWaypoint?: boolean }) => {
        cy.window().then((window) => {
            const { coordinates, isWaypoint } = options;
            const { x, y } = window.getMap()?.project(coordinates) ?? {
                x: Number.NaN,
                y: Number.NaN,
            };
            if (isWaypoint) {
                cy.get(".maplibregl-canvas")
                    .trigger("mousemove", x, y, { force: true })
                    .trigger("mousedown", x, y, { force: true })
                    .trigger("mouseup", x, y, { force: true });
            } else
                cy.get(".maplibregl-canvas")
                    .trigger("mousemove", x, y, { force: true })
                    .trigger("click", x, y, { force: true });
        });
    },
    validateNumberOfWaypoints: (waypointsNumber: number) => {
        cy.window().should((window) => {
            const waypointsFeatures = window.getMap()?.querySourceFeatures("waypoints-source");
            const actualWaypointsOnMap = [
                ...new Map(waypointsFeatures?.map((item) => [item.properties.id, item])).values(),
            ];
            expect(actualWaypointsOnMap?.length, "number of waypoints doesn't match the required crateria").to.be.equal(
                waypointsNumber
            );
        });
    },
    validateObstaclePopupData: (options: { featureCoordinates: [number, number]; obstacleType: string }) => {
        cy.window().then((window) => {
            const { featureCoordinates, obstacleType } = options;
            const { x, y } = window.getMap()?.project(featureCoordinates) ?? {
                x: Number.NaN,
                y: Number.NaN,
            };
            cy.get(".maplibregl-canvas")
                .trigger("mousemove", x, y, { force: true })
                .get(".maplibregl-popup-content")
                .contains(obstacleType);
        });
    },
};
