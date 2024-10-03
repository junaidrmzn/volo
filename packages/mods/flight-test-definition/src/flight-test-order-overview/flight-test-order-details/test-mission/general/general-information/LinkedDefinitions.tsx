import { Button, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { LinkedDefinition } from "@voloiq/flight-test-definition-api/v2";
import { useGeneralInformationTranslation } from "./translations/useGeneralInformationTranslation";

export type LinkedDefinitionsProps = {
    linkedDefinitions: LinkedDefinition[];
};

export const LinkedDefinitions = (props: LinkedDefinitionsProps) => {
    const { linkedDefinitions } = props;
    const { t } = useGeneralInformationTranslation();

    return linkedDefinitions?.length && linkedDefinitions.length > 0 ? (
        <VStack width="100%" alignItems="flex-start" pl={2}>
            {linkedDefinitions.map((linkedDefinition) => (
                <HStack key={linkedDefinition.id} justifyContent="space-between" width="100%">
                    <Text fontSize="xs" lineHeight="xl" aria-label={t("Linked Definition")}>
                        • {linkedDefinition.title}
                    </Text>
                    <Button
                        p={0}
                        size="sm"
                        rightIcon={<Icon size={3} icon="externalLink" />}
                        variant="link"
                        onClick={() => window.open(`/flight-test-definition/overview/${linkedDefinition.id}`, "_blank")}
                    >
                        {linkedDefinition.ftdId}
                    </Button>
                </HStack>
            ))}
        </VStack>
    ) : (
        <>-</>
    );
};
