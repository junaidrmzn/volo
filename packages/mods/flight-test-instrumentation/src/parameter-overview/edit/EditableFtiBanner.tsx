import { Box, HStack, Icon, Stack, Text } from "@volocopter/design-library-react";
import { useFtiEditTranslation } from "./translations/useFtiEditTranslation";

export const EditableFtiBanner = () => {
    const { t } = useFtiEditTranslation();

    return (
        <Box bg="semanticInfoSubtle" padding={3} borderRadius="md" mt={3}>
            <HStack gap={3} alignItems="top">
                <Box>
                    <Icon icon="infoLight" verticalAlign="top" />
                </Box>
                <Stack spacing={0}>
                    <Text fontSize="sm" lineHeight={6} fontWeight="normal">
                        {t("editableFtiBanner")}
                    </Text>
                </Stack>
            </HStack>
        </Box>
    );
};
