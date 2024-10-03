import { Box, Icon, IconButton, ListItem, OrderedList, Tag } from "@volocopter/design-library-react";
import type { FileEntry } from "../../../libs/logbook/file-entry";
import { useLogbookTranslation } from "../../translations/useLogbookTranslation";

export type FileEntryListOldProps = {
    entries: FileEntry[];
    onDelete: (index: number) => void;
};

export const FileEntryListOld = (props: FileEntryListOldProps) => {
    const { entries, onDelete } = props;
    const { t } = useLogbookTranslation();

    return (
        <Box pt={3} textAlign="center">
            <OrderedList styleType="none" aria-label={t("fileUpload.fileEntryListOld.ariaLabel")}>
                {entries.length === 0 && (
                    <ListItem key={-1}>{t("fileUpload.fileEntryListOld.emptyListLabel")}</ListItem>
                )}
                {entries.map((entry, index) => (
                    <ListItem key={entry.file.name + entry.type}>
                        {entry.file.name}
                        <Tag colorScheme="gray" ml={2}>
                            {entry.type}
                        </Tag>
                        <IconButton
                            ml={2}
                            variant="ghost"
                            icon={<Icon icon="close" />}
                            title={t("fileUpload.fileEntryListOld.deleteButtonTooltip")}
                            aria-label={t("fileUpload.fileEntryListOld.deleteButtonTooltip")}
                            onClick={() => onDelete(index)}
                        />
                    </ListItem>
                ))}
            </OrderedList>
        </Box>
    );
};
