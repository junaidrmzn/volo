import { Flex, HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { FlightTestDefinitionOverviewResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { DefinitionStatusTag } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useDefinitionListItemTranslation } from "./translations/useDefinitionListItemTranslation";

export type DefinitionListItemTitleProps = {
    flightTestDefinitionModified: FlightTestDefinitionOverviewResponseBody;
};

export const DefinitionListItemTitle = (props: DefinitionListItemTitleProps) => {
    const { flightTestDefinitionModified } = props;
    const { title, ftdId, testType, ata, status } = flightTestDefinitionModified;
    const { t } = useDefinitionListItemTranslation();

    return (
        <HStack spacing={3} boxSize="full">
            <HStack spacing={6} flex={1}>
                <VStack spacing={0} alignItems="flex-start">
                    <Text fontSize="xs" lineHeight={6} fontWeight="bold">
                        {title}
                    </Text>
                    <Text fontSize="xs" lineHeight={6}>
                        {ftdId}
                    </Text>
                </VStack>
                <Spacer />
                <TextWithLabel
                    size="small"
                    label={t("Test Type")}
                    text={match(testType)
                        .with("FLIGHT", () => t("Flight"))
                        .with("GROUND", () => t("Ground"))
                        .exhaustive()}
                />
                <TextWithLabel size="small" label={t("ATA")} text={ata} />
            </HStack>
            <Flex justifyContent="flex-end" width={40}>
                <DefinitionStatusTag status={status} />
            </Flex>
        </HStack>
    );
};
