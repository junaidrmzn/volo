import { Box, Popover, useDisclosure } from "@volocopter/design-library-react";
import { NotificationIconButtonWithCount } from "./NotificationIconButtonWithCount";
import { NotificationPopover } from "./notification-popover/NotificationPopover";

export const NotificationButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="right-end" variant="notPadded">
            <Popover.Trigger>
                {/* Box is needed for the trigger to work, for some reason a forwardRef on the NotificationIconButtonWithCount component doesn't work */}
                <Box>
                    <NotificationIconButtonWithCount />
                </Box>
            </Popover.Trigger>
            <Popover.Overlay />
            <Popover.Content minWidth="xs">
                <Popover.Body alignItems="start" boxShadow="sm" bg="bgNavigationLayer2" borderRadius="sm" width="sm">
                    {/* This is required so that the notifications unmount on closing the popover, as this triggers them to
                    be set to read. This is not very beautiful and ideally we should switch to having a bulk endpoint
                    that marks multiple notifications as read that can be invoked when closing the popover */}
                    {isOpen && <NotificationPopover />}
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
