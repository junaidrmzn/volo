import type { LngLatLike } from "maplibre-gl";
import { Marker } from "maplibre-gl";
import { useEffect } from "react";
import { useMapContext } from "@voloiq/map";

export const useVoloportMarker = (coords: LngLatLike) => {
    const { map, isReady } = useMapContext();

    useEffect(() => {
        if (!isReady) return () => {};
        const htmlMarker = document.createElement("div");
        htmlMarker.innerHTML = `<svg id="volocopter_icons_rgb" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
<path d="M24,46A22,22,0,1,1,46,24,22.0248,22.0248,0,0,1,24,46ZM24,4A20,20,0,1,0,44,24,20.0226,20.0226,0,0,0,24,4ZM18.4973,19.5789h2.6649l2.8691,7.73,2.8691-7.73h2.6023L25.0659,30.6316H22.9341Zm5.9972,20.9205a.4989.4989,0,0,0-.5-.5008,16.0564,16.0564,0,0,1-11.2931-4.6778.5.5,0,1,0-.7063.7074,16.976,16.976,0,0,0,11.9986,4.97A.5.5,0,0,0,24.4945,40.4994ZM36.0172,11.9718a16.976,16.976,0,0,0-11.9986-4.97.5.5,0,1,0-.0008,1,16.0559,16.0559,0,0,1,11.293,4.6778.5.5,0,1,0,.7064-.7074Zm4.4885,11.54a.4989.4989,0,0,0-.5008.5,16.0564,16.0564,0,0,1-4.6778,11.2931.5.5,0,1,0,.7074.7063,16.9771,16.9771,0,0,0,4.97-11.9986A.5.5,0,0,0,40.5057,23.5118ZM11.9781,11.9891a16.976,16.976,0,0,0-4.97,11.9986.5.5,0,1,0,1,.0008,16.0564,16.0564,0,0,1,4.6778-11.2931.5.5,0,1,0-.7074-.7063Z" fill="white"/>
  </svg>`;

        const marker = new Marker({
            element: htmlMarker,
        })
            .setLngLat(coords)
            .addTo(map!);
        htmlMarker.dataset.testid = `voloport-marker`;
        return () => {
            marker.remove();
        };
    }, [isReady, coords, map]);
};
