import { Icon, IconButton } from "@volocopter/design-library-react";
import type { LngLatLike } from "maplibre-gl";
import { useMapContext } from "@voloiq/map";

type LocateAircraftButtonProps = {
    isDisabled: boolean;
    coords: LngLatLike;
};
export const LocateAircraftButton = (props: LocateAircraftButtonProps) => {
    const { isDisabled, coords } = props;
    const { map } = useMapContext();
    return (
        <IconButton
            variant="secondary"
            size="lg"
            isDisabled={isDisabled}
            onClick={() => {
                map?.easeTo({ center: coords, zoom: 15 });
            }}
            aria-label="Locate"
            icon={<Icon icon="search" />}
            data-testid="locate-aircraft-button"
        />
    );
};
