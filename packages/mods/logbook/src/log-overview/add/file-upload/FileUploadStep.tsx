import { FileListItem } from "../../../libs/logbook/FileListItem/FileListItem";
import type { FileUploadProps } from "../../file-upload/FileUpload";
import { FileUpload } from "../../file-upload/FileUpload";
import { useFileUploadStep } from "./useFileUploadStep";

type FileUploadStepProps = FileUploadProps;

export const FileUploadStep = (props: FileUploadStepProps) => {
    const { fileEntries, onFileEntriesChange } = props;
    useFileUploadStep({ fileEntries });

    return (
        <FileUpload fileEntries={fileEntries} onFileEntriesChange={onFileEntriesChange}>
            <FileUpload.FileListItem>
                {(props) => <FileListItem key={JSON.stringify(props)} {...props} />}
            </FileUpload.FileListItem>
        </FileUpload>
    );
};
