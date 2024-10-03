import { Icon, IconButton } from "@volocopter/design-library-react";

type ToggleNotamListButtonProps = {
    handleClick: () => void;
    isActive: boolean;
};

export const ToggleNotamListButton = (props: ToggleNotamListButtonProps) => {
    const { handleClick, isActive } = props;
    return (
        <IconButton
            aria-label="Toggle notam list"
            variant="secondary"
            size="lg"
            isActive={isActive}
            onClick={handleClick}
            data-testid="toggle-notam-list-button"
        >
            <Icon icon="notifications" />
        </IconButton>
    );
};
