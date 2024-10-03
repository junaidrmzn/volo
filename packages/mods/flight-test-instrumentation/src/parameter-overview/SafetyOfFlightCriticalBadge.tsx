import { HStack, Icon, Text } from "@volocopter/design-library-react";
import { useFtiOverviewTranslation } from "./translations/useFtiTranslation";

export const SafetyOfFlightCriticalBadge = () => {
    const { t } = useFtiOverviewTranslation();

    return (
        <HStack spacing={2} bgColor="semanticErrorBasic" borderRadius={6} px={1.5} py={0.5}>
            <Icon icon="errorLight" size={3} color="white" />
            <Text color="white" fontSize="sm">
                {t("SoF")}
            </Text>
        </HStack>
    );
};
