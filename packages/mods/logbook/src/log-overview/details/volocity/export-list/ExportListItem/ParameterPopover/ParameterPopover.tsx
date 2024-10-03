import { Box, Flex, Icon, IconButton, Popover, Tag, Tooltip } from "@volocopter/design-library-react";
import type { ExportArguments } from "@voloiq/logbook-api/v6";
import { useLogDetailsTranslation } from "../../../../translations/useLogDetailsTranslation";
import { useParameterPopover } from "./useParameterPopover";

export type ParameterPopoverProps = { exportArguments: ExportArguments };

export const ParameterPopover = (props: ParameterPopoverProps) => {
    const { exportArguments } = props;
    const { parameters } = exportArguments;
    const { t } = useLogDetailsTranslation();
    const { setShowInfoBox, showInfoBox, setIsCopyDone, isCopyDone, handleCopyClick } = useParameterPopover();

    return (
        <Popover isOpen={showInfoBox} onClose={() => setShowInfoBox(false)} onOpen={() => setShowInfoBox(true)}>
            <Popover.Trigger>
                <Box>
                    <Tag colorScheme="gray">
                        {t("exports.exportList.parameterPopover.parameterCount", {
                            count: parameters.length,
                        })}
                    </Tag>
                </Box>
            </Popover.Trigger>
            <Popover.Content>
                <Popover.Header
                    size="md"
                    closeButtonAriaLabel={t("exports.exportList.parameterPopover.header")}
                    title={t("exports.exportList.parameterPopover.header")}
                />
                <Popover.Body>
                    <Flex flexWrap="wrap" gap={2}>
                        {parameters.map((parameterId) => (
                            <Tag key={parameterId}>{parameterId}</Tag>
                        ))}
                        <Tooltip
                            label={t("exports.exportList.parameterPopover.copyDoneMessage")}
                            closeOnClick={false}
                            isOpen={isCopyDone}
                            onClose={() => setIsCopyDone(false)}
                            placement="right"
                        >
                            <IconButton
                                verticalAlign="center"
                                height="full"
                                aria-label={t("exports.exportList.parameterPopover.copyButtonLabel")}
                                variant="ghost"
                                onClick={() => handleCopyClick(parameters)}
                            >
                                <Icon icon="copy" />
                            </IconButton>
                        </Tooltip>
                    </Flex>
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};
