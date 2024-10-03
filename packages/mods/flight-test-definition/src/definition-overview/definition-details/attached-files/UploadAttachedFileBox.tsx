import { FileInput } from "@volocopter/design-library-react";
import { useAttachedFiles } from "./attached-files-context/useAttachedFiles";
import { useAttachedFilesTranslation } from "./translations/useAttachedFilesTranslation";

export type UploadAttachedFileBoxProps = {
    onFileUploadSuccess?: () => void;
};
export const UploadAttachedFileBox = (props: UploadAttachedFileBoxProps) => {
    const { onFileUploadSuccess } = props;
    const { t } = useAttachedFilesTranslation();
    const { uploadFile } = useAttachedFiles();

    return (
        <FileInput
            accept={[".pdf", ".docx"]}
            dropFilesLabel={t("Drop files here")}
            orLabel={t("or")}
            selectFilesLabel={t("Select Files")}
            rejectedFilesErrorMessage={t("Only .pdf or .docs files are supported")}
            onChange={async (files) => {
                const [file] = files;
                if (file) {
                    await uploadFile(file);
                    onFileUploadSuccess?.();
                }
            }}
        />
    );
};
