import { useQueryClient } from "@tanstack/react-query";
import { Flex, HStack, Text, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { BulkResourceSection, SubSection } from "@voloiq/flight-test-definition-components";
import { ConfigurationsSectionContent } from "./ConfigurationsSectionContent";
import { useConfigurationsSectionTranslation } from "./translations/useConfigurationsSectionTranslation";
import { useConfigurationsFormSchema } from "./useConfigurationsFormSchema";
import { useConfigurationsOnBulkOperations } from "./useConfigurationsOnBulkOperations";
import { useGetAircraftReleaseConfigurations } from "./useGetAircraftReleaseConfigurations";

export type ConfigurationsSectionProps = {
    flightTestOrderId: string;
};

export const ConfigurationsSection = (props: ConfigurationsSectionProps) => {
    const { flightTestOrderId } = props;
    const { t } = useConfigurationsSectionTranslation();
    const { formSchema } = useConfigurationsFormSchema();
    const { aircraftReleaseConfigurations } = useGetAircraftReleaseConfigurations({
        flightTestOrderId,
    });
    const { onBulkAddConfigurations, onBulkDeleteConfigurations, onBulkEditConfigurations } =
        useConfigurationsOnBulkOperations({ flightTestOrderId });
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const queryClient = useQueryClient();

    const flightTestOrder: FlightTestOrder | undefined = queryClient.getQueryData([
        "FlightTestOrderV2",
        flightTestOrderId,
    ]);

    const isEditable =
        flightTestOrder && (flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL");
    const hasSubSections = isFeatureFlagEnabled("vte-1520");
    return (
        <VStack width="100%" backgroundColor={hasSubSections ? "bgContentLayer" : "transparent"}>
            <BulkResourceSection
                formSchema={formSchema}
                resourceNameSingular={t("Configuration")}
                resourceNamePlural={t("Configurations")}
                renderFormControlGroup={(FormControl, index) => (
                    <HStack spacing={2.5} alignItems="flex-start">
                        <VStack flex={3}>
                            <Text
                                w="full"
                                fontSize="xs"
                                lineHeight={6}
                                fontWeight="bold"
                                color="fontOnAccentSecondaryBasic"
                                textAlign="left"
                            >
                                {t("Configuration")}
                            </Text>
                            <Flex flex={1} w="full" alignItems="center" justifyContent="flex-start">
                                <Text lineHeight={6} overflowWrap="anywhere" whiteSpace="pre-wrap">
                                    {aircraftReleaseConfigurations ? aircraftReleaseConfigurations[index]?.type : "-"}
                                </Text>
                            </Flex>
                        </VStack>
                        <Flex flex={3}>
                            <FormControl fieldName="required" />
                        </Flex>
                        <Flex flex={2}>
                            <FormControl fieldName="status" />
                        </Flex>
                        <Flex flex={4}>
                            <FormControl fieldName="commentOnDeviation" />
                        </Flex>
                        <Flex flex={1} justify="center">
                            <FormControl fieldName="accept" showFieldLabel={false} />
                        </Flex>
                    </HStack>
                )}
                onBulkAdd={onBulkAddConfigurations}
                onBulkDelete={onBulkDeleteConfigurations}
                onBulkEdit={onBulkEditConfigurations}
                getAllResources={() => Promise.resolve(aircraftReleaseConfigurations)}
                getInitialValues={() => aircraftReleaseConfigurations}
                withAddNewButton={false}
                withDeleteButton={false}
                isEditable={isEditable}
                hasSubSections={hasSubSections}
            />

            {hasSubSections ? (
                <SubSection
                    bodyContent={
                        <>
                            <HStack
                                w="full"
                                px={3}
                                alignItems="flex-start"
                                spacing={3}
                                borderRadius={9}
                                role="group"
                                aria-label={t("Configuration Info")}
                            >
                                <Flex flex={2}>
                                    <Text fontWeight="bold" fontSize="xxs" lineHeight={6} color="fontOnBgMuted">
                                        {t("Configuration")}
                                    </Text>
                                </Flex>
                                <Flex flex={3}>
                                    <Text fontWeight="bold" fontSize="xxs" lineHeight={6} color="fontOnBgMuted">
                                        {t("Required")}
                                    </Text>
                                </Flex>
                                <Flex flex={1}>
                                    <Text fontWeight="bold" fontSize="xxs" lineHeight={6} color="fontOnBgMuted">
                                        {t("Status")}
                                    </Text>
                                </Flex>
                                <VStack flex={1} alignItems="center">
                                    <Flex flex={1}>
                                        <Text fontWeight="bold" fontSize="xxs" lineHeight={6} color="fontOnBgMuted">
                                            {t("Accept?")}
                                        </Text>
                                    </Flex>
                                </VStack>
                                <Flex flex={3}>
                                    <Text fontWeight="bold" fontSize="xxs" lineHeight={6} color="fontOnBgMuted">
                                        {t("Comment to Deviations")}
                                    </Text>
                                </Flex>
                            </HStack>
                            <ConfigurationsSectionContent configurations={aircraftReleaseConfigurations} />
                        </>
                    }
                />
            ) : (
                <ConfigurationsSectionContent configurations={aircraftReleaseConfigurations} />
            )}
        </VStack>
    );
};
