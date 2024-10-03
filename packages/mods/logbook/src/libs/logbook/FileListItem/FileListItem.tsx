import { HStack, Icon, IconButton, Stack, Tag, Text } from "@volocopter/design-library-react";
import { CardListItem } from "@voloiq/card-list-item";
import type { FileEntry } from "@voloiq/logbook-api/v6";
import { formatBytes, formatUTCDate } from "@voloiq/utils";
import { LoadingDots } from "./LoadingDots/LoadingDots";
import { TypeSelectForm } from "./TypeSelectForm";
import { useFileListItemTranslation } from "./translations/useFileListItemTranslation";
import { useFileListItem } from "./useFileListItem";

export type FileListItemProps = {
    fileEntry: FileEntry;
    onDelete: () => void;
    onUpdate: (updatedFileEntry: FileEntry) => void;
};

export const FileListItem = (props: FileListItemProps) => {
    const { fileEntry, onDelete, onUpdate } = props;
    const { editMode, setEditMode } = useFileListItem();
    const { t } = useFileListItemTranslation();
    return (
        <CardListItem key={fileEntry.file.name} variant="subtle">
            <CardListItem.Identifier>
                <HStack spacing={7}>
                    <Icon icon="file" size={9} ml={3} />
                    <Stack spacing={2}>
                        <Text fontWeight="bold" overflowWrap="anywhere">
                            {fileEntry.file.name}
                        </Text>
                        <HStack gap={3}>
                            <Text>{formatBytes(fileEntry.file.size)}</Text>
                            {fileEntry.metadataRequestStatus === "pending" && (
                                <Text>
                                    {t("loadingTimestamp")} <LoadingDots />
                                </Text>
                            )}
                            {fileEntry.metaData && <Text>{formatUTCDate(new Date(fileEntry.metaData.timestamp))}</Text>}
                            {fileEntry.metadataRequestStatus === "error" && (
                                <Text variant="error">{t("dateError")}</Text>
                            )}
                        </HStack>
                    </Stack>
                </HStack>
            </CardListItem.Identifier>
            <CardListItem.Status>
                {editMode && (
                    <TypeSelectForm
                        initialType={fileEntry.type}
                        onUpdate={(newFileType) => onUpdate({ ...fileEntry, type: newFileType })}
                    />
                )}
                {!editMode && (
                    <HStack justifyContent="end" gap={0} align="center" h="full">
                        <Tag colorScheme="gray">{fileEntry.type}</Tag>
                        <IconButton
                            m={0}
                            aria-label={t("editButton")}
                            onClick={() => setEditMode(true)}
                            variant="ghost"
                            icon={<Icon icon="edit" size={4} />}
                        />
                        <IconButton
                            m={0}
                            aria-label={t("deleteButton")}
                            onClick={() => onDelete()}
                            variant="ghost"
                            icon={<Icon icon="delete" size={4} />}
                        />
                    </HStack>
                )}
            </CardListItem.Status>
        </CardListItem>
    );
};
