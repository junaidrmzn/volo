import { Box, Center, Spinner, Stack, Text } from "@volocopter/design-library-react";
import type { TechnicalErrorProps } from "@voloiq/error-views";
import { TechnicalError } from "@voloiq/error-views";
import type { Error } from "@voloiq/service";
import { useFtiImportTranslation } from "./translations/useFtiImportTranslation";

type UploadProgressProps = {
    error?: Error;
    fileName: string;
    uploadPercentage: number;
} & Pick<TechnicalErrorProps, "onTryAgainClick">;

export const UploadProgress = (props: UploadProgressProps) => {
    const { error, fileName, uploadPercentage, onTryAgainClick } = props;
    const { t } = useFtiImportTranslation();
    const isProcessing = uploadPercentage === 100;

    if (error) {
        return <TechnicalError error={error} onTryAgainClick={onTryAgainClick} />;
    }

    return (
        <Stack>
            <Center>
                <Spinner mr={5} />
                <Box>
                    {isProcessing ? (
                        <Text>{t("uploadProgress.processingText")}</Text>
                    ) : (
                        <>
                            <Text>
                                {t("uploadProgress.text", {
                                    fileName,
                                })}
                            </Text>
                            <Text>{uploadPercentage.toFixed(0)}%</Text>
                        </>
                    )}
                </Box>
            </Center>
        </Stack>
    );
};
