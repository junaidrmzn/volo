import { Flex, HStack, VStack } from "@volocopter/design-library-react";
import { AircraftReleaseConfiguration } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useConfigurationsSectionTranslation } from "./translations/useConfigurationsSectionTranslation";

export type ConfigurationCardProps = {
    configuration: AircraftReleaseConfiguration;
};

export const ConfigurationCard = (props: ConfigurationCardProps) => {
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
                <TextWithLabel fontWeight="bold" size="small" label={t("Configuration")} text={configuration.type} />
            </Flex>
            <Flex flex={3}>
                <TextWithLabel size="small" label={t("Required")} text={configuration.required || "-"} />
            </Flex>
            <Flex flex={1}>
                <TextWithLabel size="small" label={t("Status")} text={configuration.status || "-"} />
            </Flex>
            <VStack flex={1} alignItems="center">
                <TextWithLabel
                    size="small"
                    label={t("Accept?")}
                    text={configuration.accept ? t("Y") : t("N")}
                    textAlign="center"
                />
            </VStack>
            <Flex flex={3}>
                <TextWithLabel
                    size="small"
                    label={t("Comment to Deviations")}
                    text={configuration.commentOnDeviation || "-"}
                />
            </Flex>
        </HStack>
    );
};
