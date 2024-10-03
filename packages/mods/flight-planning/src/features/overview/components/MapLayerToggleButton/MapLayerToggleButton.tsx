import { Icon, IconButton } from "@volocopter/design-library-react";

type MapLayerToggleButtonProps = {
    handleClick: () => void;
    isActive: boolean;
};

export const MapLayerToggleButton = (props: MapLayerToggleButtonProps) => {
    const { handleClick, isActive } = props;
    return (
        <IconButton
            variant="secondary"
            onClick={handleClick}
            isActive={isActive}
            size="lg"
            aria-label="Toggle Map Layer Panel"
            data-testid="toggle-map-layer-panel"
        >
            <Icon icon="layer" />
        </IconButton>
    );
};
