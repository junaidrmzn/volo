import type { Dispatch } from "react";
import { createContext } from "react";
import { initialMapFocusControllerState } from "../hooks/useMapFocusController";
import type { MapFocusControllerAction, MapFocusControllerState } from "../types";

export const MapFocusMapContext = createContext<{
    mapFocusControllerState: MapFocusControllerState;
    dispatchMapFocusController: Dispatch<MapFocusControllerAction>;
}>({
    mapFocusControllerState: initialMapFocusControllerState,
    dispatchMapFocusController: () => {},
});
