import type { Dispatch } from "react";
import { createContext } from "react";
import type { MapFocusControllerAction } from "../types";

export const MapFocusActionsContext = createContext<{ dispatchMapFocusController: Dispatch<MapFocusControllerAction> }>(
    {
        dispatchMapFocusController: () => {},
    }
);
