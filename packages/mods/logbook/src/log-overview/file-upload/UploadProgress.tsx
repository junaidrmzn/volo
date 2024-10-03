import { Box, Button, Center, Spinner, Stack, Text } from "@volocopter/design-library-react";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";
import type { useUploadFiles } from "./useUploadFiles";

type UploadProgressProps = {
    onCancel: () => void;
} & Pick<ReturnType<typeof useUploadFiles>, "uploadState">;

export const UploadProgress = (props: UploadProgressProps) => {
    const {
        onCancel,
        uploadState: { file, fileIndex, percentage, fileCount },
    } = props;
    const { t } = useLogbookTranslation();

    return (
        <Stack>
            <Center>
                <Spinner mr={5} />
                <Box>
                    <Text>
                        {t("fileUpload.uploadProgress.text", {
                            fileName: file?.name,
                            current: fileIndex,
                            total: fileCount,
                        })}
                    </Text>
                    <Text>{percentage.toFixed(0)}%</Text>
                </Box>
            </Center>
            <Center mr={2}>
                <Button onClick={onCancel}>{t("fileUpload.uploadProgress.cancelButtonLabel")}</Button>
            </Center>
        </Stack>
    );
};
