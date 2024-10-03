import { Icon, IconButton } from "@volocopter/design-library-react";

type ToggleAirspaceListButtonProps = {
    handleClick: () => void;
    isActive: boolean;
    disabled: boolean;
};

export const ToggleAirspaceListButton = (props: ToggleAirspaceListButtonProps) => {
    const { handleClick, isActive, disabled } = props;
    return (
        <IconButton
            aria-label="Toggle alerts list"
            variant="secondary"
            size="lg"
            isActive={isActive}
            onClick={handleClick}
            data-testid="toggle-alerts-list-button"
            disabled={disabled}
        >
            <Icon icon="paperPlane" />
        </IconButton>
    );
};
