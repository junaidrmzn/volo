import { useCallback, useState } from "react";
import type { SelectOption } from "@voloiq/form";
import type { FileType, LogbookFile } from "@voloiq/logbook-api/v6";
import type { FileEntry } from "../../libs/logbook/file-entry";
import { getFileType } from "./utils";

const removeArrayDuplicates = (array: string[]) => [...new Set(array)];

export type FormData = {
    type: SelectOption<FileType | "auto">;
    files: File[];
};

export type UseFileUploadProps = {
    existingFiles?: LogbookFile[];
    fileEntries: FileEntry[];
    onFileEntriesChange: (entries: FileEntry[]) => void;
};

export const useFileUpload = (props: UseFileUploadProps) => {
    const { existingFiles = [], fileEntries, onFileEntriesChange } = props;
    const [duplicateErroneousFilenames, setDuplicateErroneousFilenames] = useState<string[]>([]);
    const [duplicateSelectedErroneousFilenames, setDuplicateSelectedErroneousFilenames] = useState<string[]>([]);
    const [preexistingDuplicatesErroneousFilenames, setPreexistingDuplicatesErroneousFilenames] = useState<string[]>(
        []
    );

    const filterDuplicatedFiles = (files: File[]) => {
        const duplicates = removeArrayDuplicates(
            [...files]
                .filter((file) => fileEntries.some((entry) => entry.file.name === file.name))
                .map((file) => file.name)
        );
        const duplicateSelections = removeArrayDuplicates(
            [...files]
                .filter((file) => files.filter((otherFile) => otherFile.name === file.name).length > 1)
                .map((file) => file.name)
        );
        const preexistingDuplicates = files
            .filter((file) => existingFiles.some((logbookFile) => logbookFile.fileName === file.name))
            .map((file) => file.name);

        setDuplicateErroneousFilenames(duplicates);
        setDuplicateSelectedErroneousFilenames(duplicateSelections);
        setPreexistingDuplicatesErroneousFilenames(preexistingDuplicates);

        return files.filter(
            (file) =>
                !duplicates.includes(file.name) &&
                !duplicateSelections.includes(file.name) &&
                !preexistingDuplicates.includes(file.name)
        );
    };

    const handleAutomaticFileDetection = useCallback(
        async (files: File[]) => {
            const erroneousFilenames: string[] = [];
            const fileEntriesToBeAdded: FileEntry[] = [];
            let filesRemainingForTypeDetection = files.length;

            const done = () => {
                onFileEntriesChange([...fileEntries, ...fileEntriesToBeAdded]);
            };

            for (const file of files) {
                try {
                    // eslint-disable-next-line no-await-in-loop
                    const type = await getFileType(file);
                    fileEntriesToBeAdded.push({ type, file });
                } catch {
                    erroneousFilenames.push(file.name);
                } finally {
                    filesRemainingForTypeDetection -= 1;
                    if (filesRemainingForTypeDetection === 0) {
                        done();
                    }
                }
            }
        },
        [fileEntries, onFileEntriesChange]
    );

    const onAdd = (files: File[]) => {
        setDuplicateErroneousFilenames([]);
        setDuplicateSelectedErroneousFilenames([]);
        setPreexistingDuplicatesErroneousFilenames([]);
        const uniqueFiles = filterDuplicatedFiles(files);

        handleAutomaticFileDetection(uniqueFiles);
    };

    const onDelete = (index: number) => {
        const newEntries = [...fileEntries];
        newEntries.splice(index, 1);
        onFileEntriesChange(newEntries);
    };

    const onUpdate = (index: number, updatedFileEntry: FileEntry) => {
        const newEntries = [...fileEntries];
        newEntries[index] = updatedFileEntry;
        onFileEntriesChange(newEntries);
    };

    return {
        onAdd,
        onDelete,
        onUpdate,
        duplicateErroneousFilenames,
        duplicateSelectedErroneousFilenames,
        preexistingDuplicatesErroneousFilenames,
    };
};
