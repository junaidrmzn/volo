import { Box, Button, Center, Progress, Text, VStack } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../../../translations";

type UploadProgressProps = {
    percentage: number;
    fileName: string;
    cancelUpload?: () => void;
};

export const UploadProgress = (props: UploadProgressProps) => {
    const { percentage, cancelUpload, fileName } = props;
    const { t } = useFlightPlanningTranslation();

    return (
        <Center w="100%">
            <VStack w="100%" spacing="6">
                <Text>{`${t("routeDetails.simLogFileUpload.uploadingText")} '${fileName}'`}</Text>
                <Box w="100%" mt="4">
                    <Progress value={percentage} />
                </Box>
                <Text>{percentage.toFixed(0)}%</Text>
                <Button onClick={cancelUpload}>{t("common.cancel")}</Button>
            </VStack>
        </Center>
    );
};
