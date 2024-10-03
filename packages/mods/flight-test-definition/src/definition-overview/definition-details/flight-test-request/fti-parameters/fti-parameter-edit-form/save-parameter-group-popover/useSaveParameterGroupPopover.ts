import { useDisclosure } from "@volocopter/design-library-react";
import { useState } from "react";

export const useSaveParameterGroupPopover = () => {
    const [groupName, setGroupName] = useState<string>("");

    const { onOpen, onClose: onCloseDisclosure, isOpen } = useDisclosure();

    const onClose = () => {
        setGroupName("");
        onCloseDisclosure();
    };

    return {
        groupName,
        setGroupName,
        onClose,
        onOpen,
        isOpen,
    };
};
