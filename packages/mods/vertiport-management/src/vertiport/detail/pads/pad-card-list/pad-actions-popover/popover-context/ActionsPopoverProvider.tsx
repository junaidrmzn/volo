import { useDisclosure } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { ActionsPopoverContext } from "./ActionsPopoverContext";
import { useActionsPopoverState } from "./useActionsPopoverState";

type ActionsPopoverProviderProps = {
    children: ReactNode;
};

export const ActionsPopoverProvider = (props: ActionsPopoverProviderProps) => {
    const { children } = props;
    const { actionsPopoverState, setActionsPopoverState } = useActionsPopoverState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onClosePopover = () => {
        onClose();
        setActionsPopoverState("actions");
    };

    return (
        <ActionsPopoverContext.Provider
            value={{
                actionsPopoverState,
                setActionsPopoverState,
                isPopoverOpen: isOpen,
                onClosePopover,
                onOpenPopover: onOpen,
            }}
        >
            {children}
        </ActionsPopoverContext.Provider>
    );
};
