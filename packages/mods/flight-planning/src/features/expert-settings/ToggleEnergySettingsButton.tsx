import { Icon, IconButton } from "@volocopter/design-library-react";

type ToggleEnergySettingsButtonProps = {
    handleClick: () => void;
    isActive: boolean;
    disabled: boolean;
};

export const ToggleEnergySettingsButton = (props: ToggleEnergySettingsButtonProps) => {
    const { handleClick, isActive, disabled } = props;

    return (
        <IconButton
            aria-label="toggle energy-settings"
            variant="secondary"
            size="lg"
            isActive={isActive}
            onClick={handleClick}
            data-testid="toggle-energy-settings-button"
            disabled={disabled}
        >
            <Icon icon="settings" />
        </IconButton>
    );
};
