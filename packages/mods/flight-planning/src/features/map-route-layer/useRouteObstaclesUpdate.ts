import { useEffect } from "react";
import { ObstacleCorridorQuery } from "@voloiq/flight-planning-api/v1";
import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import { VoloiqMap, obstacleTranslationTypes, returnVoloiqMap, useMapContext } from "@voloiq/map";
import { obstacleMarkerLayer } from "./ObstacleLayer";
import de from "./translations/obstacles.de.translations.json";
import en from "./translations/obstacles.en.translations.json";
import { useCorridorClearanceDataOnMap } from "./useCorridorClearanceDataOnMap";

type UseRouteObstaclesProps = {
    obstaclesData: ObstacleCorridorQuery;
    isTerrainFetching: boolean;
};

const setObstacleLayersVisibility = (map: VoloiqMap, visibilityMode: string) => {
    if (!map.getLayer("obstacles-layer")) return;
    map.setLayoutProperty("obstacles-layer", "visibility", visibilityMode);
    map.setLayoutProperty("obstacles-buffer-layer", "visibility", visibilityMode);
};

export const useRouteObstaclesUpdate = (props: UseRouteObstaclesProps) => {
    const { obstaclesData, isTerrainFetching } = props;
    const { map } = useMapContext();
    const mapObject = returnVoloiqMap(map);
    const translations = { en, de };
    const { t } = useTranslation<VerifiedTranslations<typeof translations>>(translations);
    const { obstaclesQueryData } = useCorridorClearanceDataOnMap(obstaclesData);
    if (mapObject && !mapObject.buildTranslatedPopUpText) {
        const buildTranslatedPopUpText = (popupTextToTransalte: {
            obstacleType: obstacleTranslationTypes;
            formatedAltitude: number;
        }) => `${t(popupTextToTransalte.obstacleType)}<br> Obstacle height: ${popupTextToTransalte.formatedAltitude}m`;

        mapObject.buildTranslatedPopUpText = buildTranslatedPopUpText;
    }

    useEffect(() => {
        if (
            mapObject &&
            obstaclesQueryData &&
            !isTerrainFetching &&
            !obstaclesData.isFetching &&
            !mapObject.isWaypointUpdate
        ) {
            obstacleMarkerLayer({ map: returnVoloiqMap(map), obstacles: obstaclesQueryData });
            setObstacleLayersVisibility(mapObject, "visible");
        } else if (mapObject && (isTerrainFetching || obstaclesData.isFetching || mapObject.isWaypointUpdate)) {
            setObstacleLayersVisibility(mapObject, "none");
        }
    }, [mapObject, obstaclesQueryData, isTerrainFetching, obstaclesData, mapObject]);
};
