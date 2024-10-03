import { MapFocusActionsContext } from "./contexts/actions";
import { MapFocusMapContext } from "./contexts/map";
import { useMapFocusController } from "./hooks/useMapFocusController";

/**
 * To be used by the closest common ancestor of useMapFocus and useMapWithMapFocus
 * @param props children
 * @returns MapFocus context provider
 */
export const MapFocusController: FCC = (props) => {
    const { children } = props;
    const { mapFocusControllerState, dispatchMapFocusController } = useMapFocusController();

    return (
        <MapFocusMapContext.Provider
            value={{
                mapFocusControllerState,
                dispatchMapFocusController,
            }}
        >
            <MapFocusActionsContext.Provider
                value={{
                    dispatchMapFocusController,
                }}
            >
                {children}
            </MapFocusActionsContext.Provider>
        </MapFocusMapContext.Provider>
    );
};
