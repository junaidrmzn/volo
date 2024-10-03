import type { MapEventType, MapLayerEventType } from "maplibre-gl";
import { useEffect } from "react";
import { useMapContext } from "../../../context";

export function useMapEvent<T extends keyof MapEventType>(
    eventType: T,
    callback: (event_: MapEventType[T]) => void
): void;
export function useMapEvent<T extends keyof MapLayerEventType>(
    eventType: T,
    callback: (event_: MapLayerEventType[T]) => void
) {
    const { map, isReady } = useMapContext();

    useEffect(() => {
        if (!isReady || !map) return () => {};

        map.on(eventType, callback);

        return () => {
            map.off(eventType, callback);
        };
    }, [map, eventType, callback, isReady]);
}

export function useMapLayerEvent<T extends keyof MapLayerEventType>(
    eventType: T,
    layer: string,
    callback: (event: MapLayerEventType[T]) => void
) {
    const { isReady, map } = useMapContext();
    useEffect(() => {
        if (!isReady || !map) return () => {};

        map.on(eventType, layer, callback);

        return () => {
            map.off(eventType, callback);
        };
    }, [map, eventType, callback, isReady, layer]);
}
