import { Button, Center, Text, VStack } from "@volocopter/design-library-react";
import { Link, useParams } from "@voloiq/routing";
import { useLogDetailsTranslation } from "../details/translations/useLogDetailsTranslation";

type UploadSuccessProps = {
    erroneousFiles: File[];
};

export const UploadSuccess: FCC<UploadSuccessProps> = (props) => {
    const { erroneousFiles } = props;
    const { t } = useLogDetailsTranslation();
    const { logId } = useParams();

    return (
        <Center mt="4">
            <VStack>
                <Text mb="3" fontSize="xl">
                    {erroneousFiles.length > 0 ? t("uploadFiles.finishedPartiallyText") : t("uploadFiles.finishedText")}
                </Text>
                {erroneousFiles.length > 0 && (
                    <>
                        <Text variant="error">
                            {t("uploadFiles.erroneousFilesText")}
                            {erroneousFiles.map((file) => (
                                <p key={file.name}>- {file.name}</p>
                            ))}
                        </Text>
                        <Text variant="error" pb={4}>
                            {t("uploadFiles.erroneousFilesRetryText")}
                        </Text>
                    </>
                )}
                <Link to={`/logbook/overview/${logId}`}>
                    <Button variant="primary">{t("uploadFiles.backToLogButton")}</Button>
                </Link>
            </VStack>
        </Center>
    );
};
