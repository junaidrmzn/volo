import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";
import type { Marker } from "maplibre-gl";
import maplibreGL from "maplibre-gl";
import { useEffect, useMemo, useRef } from "react";
import { useMapContext } from "@voloiq/map";
import { colors } from "../../utils";

type UseCsflMarkerOptions = {
    csflData: CsflSite;
    selected?: boolean;
    onClick?: (site: CsflSite) => void;
};

export const useCsflMarker = (options: UseCsflMarkerOptions) => {
    const { csflData, onClick, selected } = options;
    const { map } = useMapContext();
    const markerElement = useRef(document.createElement("div"));

    const color = selected ? colors.brightBlue[500] : colors.blue[100];

    const thisRef = useRef({ props: { csflData, selected, onClick, color } });

    const marker: Marker = useMemo(() => {
        const markerObject = new maplibreGL.Marker({ element: markerElement.current }).setLngLat([
            csflData.lng,
            csflData.lat,
        ]);

        markerElement.current.addEventListener("click", (event: MouseEvent) => {
            thisRef.current.props.onClick?.(csflData);
            event.stopPropagation();
        });

        return markerObject;
    }, [csflData]);

    useEffect(() => {
        if (map) marker.addTo(map);
        return () => {
            marker.remove();
        };
    }, [map, marker]);

    useEffect(() => {
        markerElement.current.style.cursor = "pointer";
        markerElement.current.style.zIndex = "1";
        markerElement.current.innerHTML = `<svg height="18" width="18">
        <polygon points="9,0 17,17 0,17" style="fill:${color};stroke:${colors.blue[500]};stroke-width:1" />
      </svg>`;
        markerElement.current.dataset.testid = `csfl-marker-${csflData.name}`;
    }, [color, csflData.name]);

    return {
        markerElement,
    };
};
