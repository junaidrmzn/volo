import { useColorModeValue, useToast } from "@volocopter/design-library-react";
import { useState } from "react";
import { useRetryFileProcessing } from "@voloiq/logbook-api/v6";
import { useLogbookTranslation } from "../../../../translations/useLogbookTranslation";
import { useLogContext } from "../../../log-context";

export type useFileListStatusPopoverProps = {
    logId: string;
    fileId: string;
};
export const useFileListStatusPopover = (props: useFileListStatusPopoverProps) => {
    const { logId, fileId } = props;
    const toast = useToast();
    const { t } = useLogbookTranslation();
    const [showInfoBox, setShowInfoBox] = useState(false);
    const errorColor = useColorModeValue("red.700", "red.300");
    const { refresh } = useLogContext();
    const { retryFileProcessing, error, state } = useRetryFileProcessing({ logId, fileId });
    const handleRetryButtonPress = async () => {
        try {
            await retryFileProcessing();
            toast({
                status: "success",
                title: t("logDetails.tabs.files.fileCardInfo.retrySuccessTitle"),
                description: t("logDetails.tabs.files.fileCardInfo.retrySuccessDescription"),
            });
            refresh();
        } catch {
            toast({
                status: "error",
                title: t("errorManagement.title"),
                description: t("errorManagement.technicalError"),
            });
        }
    };

    return { handleRetryButtonPress, error, state, showInfoBox, setShowInfoBox, errorColor };
};
