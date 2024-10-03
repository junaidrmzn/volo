import {
    csflIcon,
    highestObstacleIcon,
    notamIcon,
    obstacleIcon,
    selectedCsflIcon,
    selectedVoloportIcon,
    selectedWaypointIcon,
    voloportIcon,
    waypointIcon,
} from "@voloiq/flight-planning-assets";
import type { VoloiqMap } from "../components/Map/types";

const loadSVGIcon = (svgText: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
        const img = document.createElement("img");
        const blob = URL.createObjectURL(svgBlob);
        img.src = blob;
        img.addEventListener("load", () => resolve(img));
    });
};

export const loadSVGIcons = (map: VoloiqMap) => {
    const imageMap = {
        waypoint: waypointIcon,
        "selected-waypoint": selectedWaypointIcon,
        voloport: voloportIcon,
        "selected-voloport": selectedVoloportIcon,
        csfl: csflIcon,
        "selected-csfl": selectedCsflIcon,
        notam: notamIcon,
        obstacle: obstacleIcon,
        "highest-obstacle": highestObstacleIcon,
    };

    for (const [imageName, icon] of Object.entries(imageMap)) {
        if (!map.style.getImage(imageName)) loadSVGIcon(icon).then((img) => map?.addImage(imageName, img));
    }
};
