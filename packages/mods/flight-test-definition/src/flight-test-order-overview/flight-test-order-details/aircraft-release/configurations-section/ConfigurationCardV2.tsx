import { Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import { AircraftReleaseConfiguration } from "@voloiq/flight-test-definition-api/v1";
import { useConfigurationsSectionTranslation } from "./translations/useConfigurationsSectionTranslation";

export type ConfigurationCardV2Props = {
    configuration: AircraftReleaseConfiguration;
};

export const ConfigurationCardV2 = (props: ConfigurationCardV2Props) => {
    const { configuration } = props;

    const { t } = useConfigurationsSectionTranslation();

    return (
        <HStack
            w="full"
            background="decorative1Muted"
            p={3}
            alignItems="flex-start"
            spacing={3}
            borderRadius={9}
            role="group"
            aria-label={t("Configuration Info")}
        >
            <Flex flex={2}>
                <Text fontWeight="bold" fontSize="xs" lineHeight={6}>
                    {configuration.type}
                </Text>
            </Flex>
            <Flex flex={3}>
                <Text fontSize="xs" lineHeight={6}>
                    {configuration.required || "-"}
                </Text>
            </Flex>
            <Flex flex={1}>
                <Text fontSize="xs" lineHeight={6}>
                    {configuration.status || "-"}
                </Text>
            </Flex>
            <VStack flex={1} alignItems="center" lineHeight={6}>
                <Text fontSize="xs">{configuration.accept ? t("Y") : t("N")}</Text>
            </VStack>
            <Flex flex={3} lineHeight={6}>
                <Text fontSize="xs">{configuration.commentOnDeviation || "-"}</Text>
            </Flex>
        </HStack>
    );
};
