import { useReducer } from "react";
import type { MapFocusControllerAction, MapFocusControllerState } from "../types";

export const initialMapFocusControllerState: MapFocusControllerState = {
    refocusTriggered: false,
    pointCollections: {},
};

const reduceMapFocus = (state: MapFocusControllerState, action: MapFocusControllerAction) => {
    const newState = { ...state };
    switch (action.type) {
        case "triggerRefocus": {
            newState.refocusTriggered = true;
            break;
        }
        case "updatePointCollectionAndTriggerRefocus": {
            newState.pointCollections[action.pointCollectionName] = action.pointCollection;
            // refocus only if there are points to focus on
            if (Object.entries(newState.pointCollections).some((entry) => entry[1].length > 0)) {
                newState.refocusTriggered = true;
            }
            break;
        }
        case "temporaryFocusCoordinates": {
            newState.temporaryFocusedCoordinates = action.coordinates;
            // refocus only if there are points to focus on
            if (newState.temporaryFocusedCoordinates) newState.refocusTriggered = true;
            break;
        }
        case "resetTriggerSignal": {
            newState.refocusTriggered = false;
            newState.temporaryFocusedCoordinates = undefined;
            break;
        }
        default: {
            throw new Error("invalid action");
        }
    }
    if (JSON.stringify(newState) === JSON.stringify(state)) {
        // preserve object reference if nothing changed
        return state;
    }
    return newState;
};

export const useMapFocusController = () => {
    const [mapFocusControllerState, dispatchMapFocusController] = useReducer(
        reduceMapFocus,
        initialMapFocusControllerState
    );
    return { mapFocusControllerState, dispatchMapFocusController };
};
