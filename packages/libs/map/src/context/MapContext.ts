import { Map } from "maplibre-gl";
import { createContext } from "react";
import { VoloiqMap } from "../components/Map/types";

type MapContextProps = {
    map?: Map | VoloiqMap;
    isReady: boolean;
};

export const MapContext = createContext<MapContextProps | undefined>({ isReady: false, map: undefined });
