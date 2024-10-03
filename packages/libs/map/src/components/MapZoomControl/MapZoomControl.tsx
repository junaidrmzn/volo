import { ButtonGroup, Icon, IconButton } from "@volocopter/design-library-react";
import { useZoomControl } from "./useZoomControl";

type MapZoomcontrolProps = {
    map: maplibregl.Map;
};

export const MapZoomControl = (props: MapZoomcontrolProps) => {
    const { map } = props;
    const { zoomIn, zoomOut } = useZoomControl(map);
    if (!map) return null;
    return (
        <ButtonGroup isVertical isAttached>
            <IconButton data-testid="zoomIn" variant="secondary" size="lg" onClick={zoomIn} aria-label="Map Zoom In">
                <Icon icon="plus" />
            </IconButton>
            <IconButton
                data-testid="zoomOut"
                variant="secondary"
                size="lg"
                onClick={zoomOut}
                aria-label="Map Zoom Out"
                top="2px"
            >
                <Icon icon="minus" />
            </IconButton>
        </ButtonGroup>
    );
};
