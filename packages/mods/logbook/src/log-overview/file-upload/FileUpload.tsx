import { Box, FileInput, Stack, Text } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { Children, isValidElement } from "react";
import type { LogbookFile } from "@voloiq/logbook-api/v6";
import { SectionHeader } from "@voloiq/text-layouts";
import type { FileEntry } from "../../libs/logbook/file-entry";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";
import type { FileEntryListItemProps } from "./FileEntryList/FileEntryList";
import { FileEntryList } from "./FileEntryList/FileEntryList";
import { useFileUpload } from "./useFileUpload";

export type FileUploadProps = {
    existingFiles?: LogbookFile[];
    fileEntries: FileEntry[];
    onFileEntriesChange: (entries: FileEntry[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FileListItem = (props: { children: (props: FileEntryListItemProps) => ReactElement | null }) => null;

export const FileUploadTemplate: FCC<FileUploadProps> = (props) => {
    const { existingFiles = [], fileEntries, onFileEntriesChange, children } = props;
    const { t } = useLogbookTranslation();
    const {
        onAdd,
        onDelete,
        onUpdate,
        duplicateErroneousFilenames,
        duplicateSelectedErroneousFilenames,
        preexistingDuplicatesErroneousFilenames,
    } = useFileUpload({
        existingFiles,
        fileEntries,
        onFileEntriesChange,
    });

    const childrenArray = Children.toArray(children).filter<ReactElement>(isValidElement);
    const renderFileListItem = childrenArray.find((child) => child.type === FileListItem)?.props.children;
    return (
        <Stack width="full">
            <FileInput
                onChange={onAdd}
                rejectedFilesErrorMessage={t("form.fileInput.rejectedFilesErrorMessage", {
                    acceptedFiles: ".bin, .binlog, .log, .mp4",
                })}
                selectFilesLabel={t("form.fileInput.selectMultipleFilesLabel")}
                dropFilesLabel={t("form.fileInput.dropMultipleFilesLabel")}
                orLabel={t("form.fileInput.orLabel")}
                accept={[".bin", ".binlog", ".log", ".csv", ".mp4"]}
                allowMultiple
            />
            <Box textAlign="right" w="full">
                {duplicateErroneousFilenames &&
                    duplicateErroneousFilenames.map((fileName) => {
                        return (
                            <Text key={fileName} variant="error" size="small" textAlign="center">
                                {t("fileUpload.duplicateName", {
                                    fileName,
                                })}
                            </Text>
                        );
                    })}
                {duplicateSelectedErroneousFilenames &&
                    duplicateSelectedErroneousFilenames.map((fileName) => {
                        return (
                            <Text key={fileName} variant="error" size="small" textAlign="center">
                                {t("fileUpload.duplicateNameSelect", {
                                    fileName,
                                })}
                            </Text>
                        );
                    })}
                {preexistingDuplicatesErroneousFilenames &&
                    preexistingDuplicatesErroneousFilenames.map((fileName) => {
                        return (
                            <Text key={fileName} variant="error" size="small" textAlign="center">
                                {t("fileUpload.preexistingFileError", {
                                    fileName,
                                })}
                            </Text>
                        );
                    })}
            </Box>
            {renderFileListItem && (
                <>
                    <SectionHeader label="Files" />
                    <FileEntryList
                        renderFileListItem={renderFileListItem}
                        entries={fileEntries}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                </>
            )}
        </Stack>
    );
};

export const FileUpload = Object.assign(FileUploadTemplate, {
    FileListItem,
});
