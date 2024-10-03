import { Box, Button, Center, Spinner, Stack, Text } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../../translations";
import type { UploadStatus } from "../types";

type UploadProgressProps = {
    uploadStatus: UploadStatus;
};

export const UploadProgress = (props: UploadProgressProps) => {
    const { uploadStatus } = props;
    const { t } = useFlightPlanningTranslation();

    return (
        <Stack>
            <Center>
                <Spinner mr={5} />
                <Box>
                    <Text>File is uploading..</Text>
                    <Text>{uploadStatus.percentage?.toFixed(0)}%</Text>
                </Box>
            </Center>
            <Center mr={2}>
                <Button onClick={() => null}>{t("vfrLayer.cancelUploadModal.confirmButtonLabel")}</Button>
            </Center>
        </Stack>
    );
};
