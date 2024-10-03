import { HStack, Icon, Text, Tooltip } from "@volocopter/design-library-react";
import { useFtiParametersTranslation } from "./translations/useFtiParametersTranslation";

export const SafetyOfFlightCriticalBadge = () => {
    const { t } = useFtiParametersTranslation();

    return (
        <Tooltip label={t("Safety of Flight Critical")} placement="bottom-start">
            <HStack
                spacing={2}
                bgColor="semanticErrorBasic"
                borderRadius="sm"
                p={1.5}
                role="status"
                aria-label={t("Safety of Flight Critical")}
            >
                <Icon icon="errorLight" size={3} color="white" />
                <Text color="white" fontSize="xs" lineHeight={3}>
                    {t("SoF")}
                </Text>
            </HStack>
        </Tooltip>
    );
};
