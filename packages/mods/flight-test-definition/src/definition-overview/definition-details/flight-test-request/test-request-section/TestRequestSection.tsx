import { HStack, VStack } from "@volocopter/design-library-react";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { StatusTag } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { TestRequestSectionActionsPopoverButton } from "./TestRequestSectionActionsPopoverButton";
import { FlightTestRequestSectionBody } from "./TestRequestSectionBody";
import { useTestRequestSectionTranslation } from "./translations/useTestRequestSectionTranslation";

export type FlightTestRequestSectionProps = {
    definition: FlightTestDefinitionResponseBody;
    isReadonly?: boolean;
};

export const FlightTestRequestSection = (props: FlightTestRequestSectionProps) => {
    const { definition, isReadonly = false } = props;
    const { t } = useTestRequestSectionTranslation();

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader label={t("Test Request Section")}>
                <HStack spacing={3}>
                    <StatusTag status={definition.requestStatus} />
                    {!isReadonly && <TestRequestSectionActionsPopoverButton definition={definition} />}
                </HStack>
            </SectionHeader>
            <FlightTestRequestSectionBody definition={definition} />
        </VStack>
    );
};
