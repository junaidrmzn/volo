import { Center, Text } from "@volocopter/design-library-react";
import { useTestPointOverviewTranslation } from "./translations/useTestPointOverviewTranslation";

export const NoTestPointAttemptsFound = () => {
    const { t } = useTestPointOverviewTranslation();
    return (
        <Center my={5} w="full">
            <Text lineHeight={4} fontSize="xs" color="darkBlue.500">
                {t("No Test Point Attempts found")}
            </Text>
        </Center>
    );
};
