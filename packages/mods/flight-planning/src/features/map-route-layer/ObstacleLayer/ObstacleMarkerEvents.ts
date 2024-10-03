import { Point } from "@turf/turf";
import { Popup } from "maplibre-gl";
import { match } from "ts-pattern";
import { MapMouseEvents, PointGeom, VoloiqMap, obstacleTranslationTypes } from "@voloiq/map";

/* eslint no-underscore-dangle: 0 */
type FeatureObstacleTypes = {
    obstacleType: "highest_obstacle" | "corridor_obstacle";
    isClearanceViolation: boolean;
    isCollision: boolean;
};
const generateObstaclePopUp = (event: MapMouseEvents) => {
    const popup = new Popup({
        closeButton: false,
        closeOnClick: false,
    });

    const map = event.target as VoloiqMap;
    const bbox: [PointGeom, PointGeom] = [
        [event.point.x - 5, event.point.y - 5],
        [event.point.x + 5, event.point.y + 5],
    ];
    const selectedFeatures = map.queryRenderedFeatures(bbox, {
        layers: ["obstacles-layer"],
    });
    if (selectedFeatures[0]) {
        const feature = selectedFeatures[0];
        const { coordinates } = feature.geometry as Point;
        const { properties } = feature;
        const featureObstacleDetails = {
            obstacleType: properties.obstacleType,
            isCollision: properties.isCollision,
            isClearanceViolation: properties.isClearanceViolation,
        };
        const formatedAltitudes = properties.altitude.toFixed(2);
        const popupText = (obstacleFeature: FeatureObstacleTypes) =>
            match(obstacleFeature)
                .with(
                    { obstacleType: "highest_obstacle", isCollision: true, isClearanceViolation: false },
                    (): obstacleTranslationTypes => "highestTerrianCollision"
                )
                .with(
                    { obstacleType: "highest_obstacle", isClearanceViolation: true, isCollision: false },
                    (): obstacleTranslationTypes => "highestClearanceViolation"
                )
                .with(
                    { obstacleType: "highest_obstacle", isClearanceViolation: false, isCollision: false },
                    (): obstacleTranslationTypes => "highest"
                )
                .with(
                    { obstacleType: "highest_obstacle", isClearanceViolation: true, isCollision: true },
                    (): obstacleTranslationTypes => "highestClearanceViolation"
                )
                .with(
                    { obstacleType: "corridor_obstacle", isCollision: true, isClearanceViolation: false },
                    (): obstacleTranslationTypes => "terrainCollision"
                )
                .with(
                    { obstacleType: "corridor_obstacle", isClearanceViolation: true, isCollision: false },
                    (): obstacleTranslationTypes => "clearanceViolation"
                )
                .with(
                    { obstacleType: "corridor_obstacle", isClearanceViolation: false, isCollision: false },
                    (): obstacleTranslationTypes => "obstacle"
                )
                .with(
                    { obstacleType: "corridor_obstacle", isClearanceViolation: true, isCollision: true },
                    (): obstacleTranslationTypes => "clearanceViolation"
                )
                .exhaustive();
        if (map && map.buildTranslatedPopUpText)
            popup
                .setLngLat({ lng: coordinates[0] ?? 0, lat: coordinates[1] ?? 0 })
                .setHTML(
                    map.buildTranslatedPopUpText({
                        obstacleType: popupText(featureObstacleDetails),
                        formatedAltitude: formatedAltitudes,
                    })
                )
                .setMaxWidth("250px")
                .addTo(map);
        popup._content.style.textAlign = "center";
        popup._content.style.zIndex = "3";
        popup.setOffset([0, -10]);
    }
};

const showObstaclePopUp = (map: VoloiqMap) => {
    map.on("mouseenter", "obstacles-layer", generateObstaclePopUp);
    map.on("mouseleave", "obstacles-layer", () => {
        const popupElement = document.querySelectorAll(".maplibregl-popup");
        if (popupElement.length > 0) {
            popupElement[0]?.remove();
        }
    });
};

export const initEvents = (map: VoloiqMap) => {
    showObstaclePopUp(map);
};
