import { Button, Center, HStack, Icon, IconButton, Popover, Text, VStack } from "@volocopter/design-library-react";
import { useLogDetailsTranslation } from "../../../translations/useLogDetailsTranslation";
import type { useFileListStatusPopoverProps } from "./useFileListStatusPopover";
import { useFileListStatusPopover } from "./useFileListStatusPopover";

export type FileListStatusPopoverProps = useFileListStatusPopoverProps & {
    statusDescription?: string;
};
export const FileListStatusPopover = (props: FileListStatusPopoverProps) => {
    const { statusDescription, ...hookProps } = props;
    const { t } = useLogDetailsTranslation();

    const { showInfoBox, setShowInfoBox, state, errorColor, handleRetryButtonPress } =
        useFileListStatusPopover(hookProps);

    return (
        <Popover isOpen={showInfoBox} onClose={() => setShowInfoBox(false)} onOpen={() => setShowInfoBox(true)}>
            <HStack spacing={2}>
                <Popover.Trigger>
                    <IconButton
                        variant="ghost"
                        icon={<Icon icon="errorLight" />}
                        color={errorColor}
                        aria-label="hey"
                        className="info-icon"
                        minWidth={0}
                        height="auto"
                        onClick={() =>
                            !!statusDescription || !!handleRetryButtonPress
                                ? setShowInfoBox((previousState) => !previousState)
                                : null
                        }
                    />
                </Popover.Trigger>
                <Text variant="error">{t("files.fileList.statusPopover.error")} </Text>
            </HStack>

            <Popover.Content>
                <Popover.Header
                    title={t("files.fileList.statusPopover.error")}
                    closeButtonAriaLabel={t("files.fileList.statusPopover.closeButton")}
                />
                <Popover.Body>
                    <VStack spacing={2}>
                        {!!statusDescription && <Text size="small">{statusDescription}</Text>}
                        {!!handleRetryButtonPress && (
                            <Center>
                                <Button
                                    variant="primary"
                                    onClick={handleRetryButtonPress}
                                    isLoading={state === "pending"}
                                    loadingText={t("files.fileList.statusPopover.retryButtonText")}
                                >
                                    {t("files.fileList.statusPopover.retryButtonText")}
                                </Button>
                            </Center>
                        )}
                    </VStack>
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
