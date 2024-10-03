import { useCallback, useMemo, useRef } from "react";
import { createMarker, useMapContext } from "@voloiq/map";
import { circleMarkerTemplate } from "./layout";
import { useSupportCircleTranslation } from "./translations/useSupportCircleTranslation";

export const useCenterPointMarker = (lat: number, lng: number, color: string) => {
    const { map } = useMapContext();
    const { t } = useSupportCircleTranslation();
    const markerElement = useRef(document.createElement("div"));
    markerElement.current.innerHTML = circleMarkerTemplate(color);
    // @ts-ignore TypeSccript doesn't know about the role attribute, but it actually exists
    markerElement.current.role = "img";
    markerElement.current.ariaLabel = t("Center Point");

    const markerObject = useMemo(() => {
        return createMarker(lat, lng, markerElement.current);
    }, [lat, lng]);

    const removeMarkerFromMap = useCallback(() => {
        markerObject.remove();
    }, [markerObject]);

    return {
        addMarkerToMap: () => map && markerObject.addTo(map),
        removeMarkerFromMap,
    };
};
