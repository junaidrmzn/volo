import { Icon, IconButton } from "@volocopter/design-library-react";
import type { Dispatch, SetStateAction } from "react";

type ToggleFocusAircraftButtonProps = {
    toggleAircraftCentered: () => void;
    setShowFlightPath: Dispatch<SetStateAction<boolean>>;
};

export const ToggleFocusAircraftButton = (props: ToggleFocusAircraftButtonProps) => {
    const { toggleAircraftCentered, setShowFlightPath } = props;
    return (
        <IconButton
            variant="secondary"
            key="centerMapButton"
            aria-label="centerMapButton"
            size="lg"
            icon={<Icon icon="reticle" />}
            onClick={() => {
                toggleAircraftCentered();
                setShowFlightPath(true);
            }}
            data-testid="toggle-focus-aircraft-button"
            bottom="2px"
        />
    );
};
