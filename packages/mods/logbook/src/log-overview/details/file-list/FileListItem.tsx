import { Grid, GridItem, HStack, Icon, IconButton, Stack, Tag, Text } from "@volocopter/design-library-react";
import { CardListItem } from "@voloiq/card-list-item";
import type { LogbookFile } from "@voloiq/logbook-api/v6";
import { FileTypeEnum } from "@voloiq/logbook-api/v6";
import { TextWithLabel } from "@voloiq/text-layouts";
import { formatUTCDate } from "@voloiq/utils/src";
import { useLogDetailsTranslation } from "../translations/useLogDetailsTranslation";
import { FileListStatusPopover } from "./FileStatusInfo/FileListStatusPopover/FileListStatusPopover";
import { StatusInfo } from "./FileStatusInfo/StatusInfo";

export type FileListItemProps = {
    file: LogbookFile;
    handleDownloadEvent: (logId: string, resourceId: string) => void;
    handleClickPlay: () => void;
};

export const FileListItem = (props: FileListItemProps) => {
    const { file, handleDownloadEvent, handleClickPlay } = props;

    const { t } = useLogDetailsTranslation();

    return (
        <CardListItem key={file.fileName} variant="subtle">
            <CardListItem.Identifier>
                <HStack spacing={7}>
                    <Icon icon="file" size={9} ml={3} />
                    <Stack spacing={2}>
                        <Text fontWeight="bold" overflowWrap="anywhere">
                            {file.fileName}
                        </Text>
                        <StatusInfo status={file.status}>
                            <StatusInfo.StatusErrorContent>
                                {() => (
                                    <FileListStatusPopover
                                        logId={file.logId}
                                        fileId={file.id}
                                        statusDescription={file.statusDescription}
                                    />
                                )}
                            </StatusInfo.StatusErrorContent>
                        </StatusInfo>
                    </Stack>
                </HStack>
            </CardListItem.Identifier>
            {file.status === "PROCESSED" && (
                <CardListItem.AdditionalContent>
                    <Grid templateColumns="repeat(2, 1fr)" columnGap={6} width="full">
                        <GridItem colSpan={1}>
                            <TextWithLabel
                                label={t("files.fileList.createTime")}
                                text={formatUTCDate(new Date(file.createTime))}
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <TextWithLabel
                                label={t("files.fileList.updateTime")}
                                text={formatUTCDate(new Date(file.updateTime))}
                            />
                        </GridItem>
                    </Grid>
                </CardListItem.AdditionalContent>
            )}

            <CardListItem.Status>
                <HStack justifyContent="end" align="center" h="full">
                    {file.fileType === FileTypeEnum.MEDIA && file.fileName.toLowerCase().endsWith(".mp4") && (
                        <IconButton
                            m={0}
                            aria-label={t("files.fileList.playButtonAriaLabel")}
                            onClick={() => handleClickPlay()}
                            variant="ghost"
                            icon={<Icon icon="playCircle" size={4} />}
                        />
                    )}
                    <IconButton
                        m={0}
                        aria-label={t("files.fileList.downloadButtonAriaLabel")}
                        onClick={() => handleDownloadEvent(file.logId, file.id)}
                        variant="ghost"
                        icon={<Icon icon="download" size={4} />}
                    />

                    <Tag colorScheme="gray">{file.fileType}</Tag>
                </HStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
