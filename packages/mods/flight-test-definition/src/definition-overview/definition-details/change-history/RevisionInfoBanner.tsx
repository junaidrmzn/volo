import { Box, HStack, Icon, Stack, Text } from "@volocopter/design-library-react";
import { useChangeHistoryTranslation } from "./translations/useChangeHistoryTranslation";

export const RevisionInfoBanner = () => {
    const { t } = useChangeHistoryTranslation();
    return (
        <Box bg="semanticInfoSubtle" padding={3} borderRadius="md">
            <HStack gap={3} alignItems="top">
                <Box>
                    <Icon icon="infoLight" verticalAlign="top" />
                </Box>
                <Stack spacing={0}>
                    <Text fontSize="md" lineHeight={6} fontWeight="bold">
                        {t("revisionInfoBanner.Requirements for new revision are not met")}
                    </Text>
                    <Text fontSize="sm" lineHeight={6} fontWeight="normal">
                        {t(
                            "revisionInfoBanner.Safety approval of at least one new/edited procedure and FTQ section required"
                        )}
                    </Text>
                </Stack>
            </HStack>
        </Box>
    );
};
