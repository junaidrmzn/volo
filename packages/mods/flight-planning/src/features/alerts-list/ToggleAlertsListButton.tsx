import { Icon, IconButton, useColorModeValue } from "@volocopter/design-library-react";
import { useFlightStatusContext } from "../../contexts/flight-status";

type ToggleAlertsListButtonProps = {
    handleClick: () => void;
    isActive: boolean;
    disabled: boolean;
};

export const ToggleAlertsListButton = (props: ToggleAlertsListButtonProps) => {
    const { handleClick, isActive, disabled } = props;
    const colorAlert = useColorModeValue("red.700", "red.300");
    const { alerts } = useFlightStatusContext();

    return (
        <IconButton
            aria-label="Toggle alerts list"
            variant="secondary"
            color={alerts?.length > 0 ? colorAlert : ""}
            size="lg"
            isActive={isActive}
            onClick={handleClick}
            data-testid="toggle-alerts-list-button"
            disabled={disabled}
        >
            <Icon icon="errorLight" />
        </IconButton>
    );
};
