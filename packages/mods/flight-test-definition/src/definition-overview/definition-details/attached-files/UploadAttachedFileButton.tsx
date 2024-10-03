import { Icon, IconButton, Popover, useDisclosure } from "@volocopter/design-library-react";
import { UploadAttachedFileBox } from "./UploadAttachedFileBox";
import { useAttachedFilesTranslation } from "./translations/useAttachedFilesTranslation";

export type UploadAttachedFileButtonProps = {
    onFileUploadSuccess: () => void;
};

export const UploadAttachedFileButton = (props: UploadAttachedFileButtonProps) => {
    const { onFileUploadSuccess } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useAttachedFilesTranslation();

    const handleFileUploadSuccess = () => {
        onFileUploadSuccess();
        onClose();
    };

    return (
        <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <Popover.Trigger>
                <IconButton aria-label={t("Add attached file")} variant="ghost" size="md">
                    <Icon icon="upload" />
                </IconButton>
            </Popover.Trigger>
            <Popover.Overlay />
            <Popover.Content isFocusLockDisabled>
                <Popover.Header closeButtonAriaLabel="close" title={t("Add")} subtitle={t("Attached File")} />
                <Popover.Body>
                    <UploadAttachedFileBox onFileUploadSuccess={handleFileUploadSuccess} />
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
