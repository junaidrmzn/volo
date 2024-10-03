import { CardList, Center, Text } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import type { FileEntry } from "../../../libs/logbook/file-entry";
import { useLogbookTranslation } from "../../translations/useLogbookTranslation";

export type FileEntryListItemProps = {
    fileEntry: FileEntry;
    onDelete: () => void;
    onUpdate: (updatedFileEntry: FileEntry) => void;
};

export type FileEntryListProps = {
    entries: FileEntry[];
    onDelete: (index: number) => void;
    onUpdate: (index: number, updatedFileEntry: FileEntry) => void;
    renderFileListItem: (props: FileEntryListItemProps) => ReactNode;
};

export const FileEntryList = (props: FileEntryListProps) => {
    const { entries, onDelete, renderFileListItem, onUpdate } = props;
    const { t } = useLogbookTranslation();

    return (
        <>
            {entries.length > 0 ? (
                <CardList mt={6} aria-label={t("fileUpload.fileEntryListOld.ariaLabel")}>
                    {entries.map((fileEntry, index) =>
                        renderFileListItem({
                            fileEntry,
                            onDelete: () => onDelete(index),
                            onUpdate: (updatedFileEntry) => onUpdate(index, updatedFileEntry),
                        })
                    )}
                </CardList>
            ) : (
                <Center>
                    <Text>{t("fileUpload.fileEntryList.emptyListLabel")}</Text>
                </Center>
            )}
        </>
    );
};
