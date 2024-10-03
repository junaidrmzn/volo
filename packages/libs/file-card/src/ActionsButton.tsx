import { Button, Icon, IconButton, Popover, VStack, useDisclosure } from "@volocopter/design-library-react";
import { useFileCardTranslations } from "./translations/useFileCardTranslations";

type DeletableFileProps = {
    isDeletable: true;
    onDelete: () => void | Promise<void>;
};

type UnDeletableFileProps = {
    isDeletable?: never;
    onDelete?: never;
};

export type ActionsButtonProps = {
    fileName: string;
    onDownload: () => void | Promise<void>;
} & (DeletableFileProps | UnDeletableFileProps);

export const ActionsButton = (props: ActionsButtonProps) => {
    const { isDeletable, onDownload, onDelete, fileName } = props;

    const { t } = useFileCardTranslations();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <Popover.Trigger>
                <IconButton aria-label={t("Actions for file", { fileName })} variant="ghost" size="md">
                    <Icon icon="ellipsis" size={4} />
                </IconButton>
            </Popover.Trigger>
            <Popover.Overlay />
            <Popover.Content>
                <Popover.Header closeButtonAriaLabel="close" title={t("Actions")} />
                <Popover.Body as={VStack} alignItems="start" spacing={3}>
                    <Button
                        variant="ghost"
                        size="lg"
                        leftIcon={<Icon icon="download" />}
                        onClick={() => {
                            onDownload();
                            onClose();
                        }}
                    >
                        {t("Download file")}
                    </Button>
                    {isDeletable && (
                        <Button
                            variant="ghost"
                            size="lg"
                            leftIcon={<Icon icon="delete" />}
                            onClick={() => {
                                onDelete?.();
                                onClose();
                            }}
                        >
                            {t("Delete")}
                        </Button>
                    )}
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
