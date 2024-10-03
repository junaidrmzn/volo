import { Icon, IconButton } from "@volocopter/design-library-react";

type ToggleSocPanelButtonProps = {
    handleClick: () => void;
    isActive: boolean;
    disabled: boolean;
};
export const ToggleSocPanelButton = (props: ToggleSocPanelButtonProps) => {
    const { handleClick, isActive, disabled } = props;
    return (
        <IconButton
            variant="secondary"
            onClick={handleClick}
            isActive={isActive}
            size="lg"
            aria-label="Toggle State of Charge Panel"
            data-testid="toggle-state-of-charge-panel"
            disabled={disabled}
        >
            <Icon icon="battery" />
        </IconButton>
    );
};
