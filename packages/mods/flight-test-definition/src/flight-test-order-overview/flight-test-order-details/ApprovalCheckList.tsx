import { Box, Card, Text, VStack } from "@volocopter/design-library-react";
import { SectionCard } from "@voloiq/flight-test-definition-components";
import { useFlightTestOrderDetailsTranslation } from "./translations/useFlightTestOrderDetailsTranslation";

// TODO: this component will be updated later on with actual values
export const ApprovalCheckList = () => {
    const { t } = useFlightTestOrderDetailsTranslation();

    return (
        <SectionCard variant="compact">
            <SectionCard.Header>
                <Box>{t("Approval Checklist")}</Box>
            </SectionCard.Header>
            <SectionCard.Content>
                <VStack alignItems="flex-start" width="full" spacing={3}>
                    <Text fontSize="xs" mb={1}>
                        {t("Test Mission Aproval")}
                    </Text>
                    <Card width="100%" py={2} px={4}>
                        <Text fontSize="sm" mb={1}>
                            CFTE/ CTP Approval
                        </Text>
                        <Text fontSize="xxs" color="fontOnBgMuted" mb={1}>
                            Test mission approval of Part 1
                        </Text>
                        <Text fontSize="xxs" color="fontOnBgMuted">
                            unassigned
                        </Text>
                        <Text fontSize="xxs" color="fontOnBgMuted">
                            Draft
                        </Text>
                    </Card>
                </VStack>
            </SectionCard.Content>
        </SectionCard>
    );
};
