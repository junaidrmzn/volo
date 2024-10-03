import { useState } from "react";

export const useParameterPopover = () => {
    const [showInfoBox, setShowInfoBox] = useState(false);
    const [isCopyDone, setIsCopyDone] = useState(false);

    const handleCopyClick = (values: string[]) => {
        navigator.clipboard.writeText(values.join(", ")).then(() => setIsCopyDone(true));
    };

    return {
        showInfoBox,
        setShowInfoBox,
        isCopyDone,
        setIsCopyDone,
        handleCopyClick,
    };
};
