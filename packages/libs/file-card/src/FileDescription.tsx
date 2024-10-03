import { HStack, Text, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import { getFileSizeString } from "./getFileSize";
import { useFileCardTranslations } from "./translations/useFileCardTranslations";

type UploadedFileProps = {
    uploadDate: Date;
    isUploading?: never;
};

type UploadingFileProps = {
    uploadDate?: never;
    isUploading: true;
};

const isUploadedFileProps = (props: FileDescriptionProps): props is FileDescriptionProps & UploadedFileProps =>
    props.isUploading === undefined;
const isUploadingFileProps = (props: FileDescriptionProps): props is FileDescriptionProps & UploadingFileProps =>
    props.isUploading === true;

export type FileDescriptionProps = {
    fileName: string;
    fileSize: number;
} & (UploadedFileProps | UploadingFileProps);
export const FileDescription = (props: FileDescriptionProps) => {
    const { fileName, fileSize } = props;

    const { formatDate } = useFormatDateTime();
    const { t } = useFileCardTranslations();

    return (
        <VStack spacing={2} alignItems="flex-start">
            <Text fontWeight="bold" fontSize="sm" lineHeight={6}>
                {fileName}
            </Text>
            <HStack spacing={3} alignItems="flex-start">
                <Text fontSize="sm" lineHeight={6}>
                    {getFileSizeString(fileSize)}
                </Text>
                <Text fontSize="xs" lineHeight="double">
                    {match(props)
                        .when(isUploadedFileProps, (props) => {
                            const { uploadDate } = props;
                            return `${t("Uploaded")} ${formatDate(uploadDate)}`;
                        })
                        .when(isUploadingFileProps, () => `${t("Uploading")}...`)
                        .exhaustive()}
                </Text>
            </HStack>
        </VStack>
    );
};
