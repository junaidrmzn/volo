import { Box, Center, Spinner, Text } from "@volocopter/design-library-react";
import { useSoftwareConfigTranslations } from "../translations/useSoftwareConfigTranslations";

type LoadingMessageProps = {
    fileUploadPercentage: number;
};

export const LoadingMessage = (props: LoadingMessageProps) => {
    const { fileUploadPercentage } = props;
    const { t } = useSoftwareConfigTranslations();

    return (
        <Center>
            <Spinner mr={5} />
            <Box>
                <Text>
                    {t("addSoftwareConfiguration.uploadProgressText", {
                        percentage: fileUploadPercentage.toFixed(2),
                    })}
                </Text>
            </Box>
        </Center>
    );
};
