import type { LngLatLike } from "maplibre-gl";
import { Marker } from "maplibre-gl";
import { useEffect } from "react";
import { useMapContext } from "@voloiq/map";

export const useBirdMarker = (coords: LngLatLike, type: string) => {
    const { map, isReady } = useMapContext();

    const flyingBirdIcon = `<svg display="block" width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3636 5C17.0909 5 22 12 22 12C22 12 17.0909 19 11.3636 19C9.41068 19 7.53771 18.2625 6.15676 16.9497C4.77581 15.637 4 13.8565 4 12C4 10.1435 4.77581 8.36301 6.15676 7.05025C7.53771 5.7375 9.41068 5 11.3636 5Z" fill="#F3FEFF" stroke="#00143C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 8.0966C12 6.56923 12.9539 5.03301 14.0783 3.78453C14.6229 3.17979 15.1705 2.6834 15.5828 2.33806C15.6128 2.31294 15.642 2.28866 15.6704 2.26523C15.6988 2.28866 15.7281 2.31294 15.758 2.33806C16.1703 2.6834 16.7179 3.17979 17.2626 3.78453C18.3869 5.03301 19.3409 6.56923 19.3409 8.0966C19.3409 9.15029 18.9425 10.1513 18.2481 10.8817C17.5554 11.6103 16.6271 12.0096 15.6704 12.0096C14.7138 12.0096 13.7854 11.6103 13.0927 10.8817C12.3984 10.1513 12 9.15029 12 8.0966Z" fill="#00143C" stroke="#00143C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <line x1="19" y1="15.5" x2="23" y2="15.5" stroke="#00143C" />
                            <circle cx="9" cy="11" r="1" fill="#00143C" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99035 10.2943C3.84406 10.2943 3.70662 10.3334 3.58832 10.402L1.69638 11.4943C1.31239 11.716 1.18036 12.2088 1.40205 12.5927C1.47521 12.7194 1.57802 12.8185 1.69659 12.8867L3.58833 13.9793C3.97232 14.201 4.46505 14.069 4.68675 13.6851C4.75988 13.5584 4.79471 13.4198 4.79444 13.283L4.79447 11.0983C4.79449 10.655 4.43374 10.2943 3.99035 10.2943Z" fill="#00143C" />
                            </svg>`;
    const standingBirdIcon = `<svg display="block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3636 5C17.0909 5 22 12 22 12C22 12 17.0909 19 11.3636 19C9.41068 19 7.53771 18.2625 6.15676 16.9497C4.77581 15.637 4 13.8565 4 12C4 10.1435 4.77581 8.36301 6.15676 7.05025C7.53771 5.7375 9.41068 5 11.3636 5Z" fill="#F3FEFF" stroke="#00143C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <line x1="11.5" y1="19" x2="11.5" y2="22" stroke="#00143C" />
                            <line x1="9" y1="22.5" x2="14" y2="22.5" stroke="#00143C" />
                            <circle cx="9" cy="11" r="1" fill="#00143C" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99035 10.2943C3.84406 10.2943 3.70662 10.3334 3.58832 10.402L1.69638 11.4943C1.31239 11.716 1.18036 12.2088 1.40205 12.5927C1.47521 12.7194 1.57802 12.8185 1.69659 12.8867L3.58833 13.9793C3.97232 14.201 4.46505 14.069 4.68675 13.6851C4.75988 13.5584 4.79471 13.4198 4.79444 13.283L4.79447 11.0983C4.79449 10.655 4.43374 10.2943 3.99035 10.2943Z" fill="#00143C" />
                            </svg>`;

    useEffect(() => {
        if (!isReady) return () => {};
        const htmlMarker = document.createElement("div");
        if (type === "flying") {
            htmlMarker.innerHTML = flyingBirdIcon;
        }
        if (type === "standing") {
            htmlMarker.innerHTML = standingBirdIcon;
        }

        htmlMarker.style.cursor = "pointer";
        htmlMarker.addEventListener("click", (event: MouseEvent) => {
            map?.easeTo({ center: coords, zoom: 15 });
            event.stopPropagation();
        });

        const marker = new Marker({
            element: htmlMarker,
        })
            .setLngLat(coords)
            .addTo(map!);
        htmlMarker.dataset.testid = `bird-marker-${Math.random()}`;
        return () => {
            marker.remove();
        };
    }, [isReady, coords, map, type, flyingBirdIcon, standingBirdIcon]);
};
