import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { SignatureRecord } from "@voloiq/flight-test-definition-api/v1";
import { ApprovalSignatoryRow } from "./ApprovalSignatoryRow";
import { PartialSignatureRecord } from "./approvalSignatoryTypes";
import { useApprovalSignatorySectionTranslation } from "./translations/useApprovalSignatorySectionTranslation";

export type ApprovalSignatoryTableProps = {
    approvalSection: SignatureRecord["approvalSection"];
    signatureRecords: PartialSignatureRecord[];
};

export const ApprovalSignatoryTable = (props: ApprovalSignatoryTableProps) => {
    const { approvalSection, signatureRecords } = props;

    const { t } = useApprovalSignatorySectionTranslation();

    return (
        <VStack
            w="full"
            borderRadius="sm"
            borderWidth="thin"
            borderColor="bgNavigationLayer2"
            spacing={0}
            role="table"
            aria-label={`${t(approvalSection)} ${t("Table")}`}
        >
            <HStack w="full" borderBottomWidth="thin" borderColor="borderOnBgActionableSecondaryDefault" spacing={0}>
                <Box flex={1} p={2} />
                <Text flex={1} fontSize="xs" fontWeight="semibold" line-height={6} p={2}>
                    {t("Team")}
                </Text>
                <Text flex={1} fontSize="xs" fontWeight="semibold" line-height={6} p={2}>
                    {t("Role")}
                </Text>
                <Text flex={1} fontSize="xs" fontWeight="semibold" line-height={6} p={2}>
                    {t("Name")}
                </Text>
            </HStack>
            {signatureRecords.map((signatureRecord) => (
                <ApprovalSignatoryRow
                    key={`${signatureRecord.id}-${signatureRecord.approvalSection}-${signatureRecord.approvalType}`}
                    signatureRecord={signatureRecord}
                />
            ))}
        </VStack>
    );
};
