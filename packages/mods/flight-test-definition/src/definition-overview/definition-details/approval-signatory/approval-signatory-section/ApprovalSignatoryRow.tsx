import { HStack, Text } from "@volocopter/design-library-react";
import { PartialSignatureRecord } from "./approvalSignatoryTypes";
import { useApprovalSignatorySectionTranslation } from "./translations/useApprovalSignatorySectionTranslation";

export type ApprovalSignatoryRowProps = {
    signatureRecord: PartialSignatureRecord;
};

export const ApprovalSignatoryRow = (props: ApprovalSignatoryRowProps) => {
    const { signatureRecord } = props;

    const { t } = useApprovalSignatorySectionTranslation();

    return (
        <HStack
            w="full"
            key={signatureRecord.id}
            spacing={0}
            borderTopWidth="thin"
            borderColor="borderOnBgActionableSecondaryDefault"
            role="row"
            aria-label={`${t(signatureRecord.approvalType)} ${t("Row")}`}
        >
            <Text flex={1} fontSize="xs" p={2} line-height={6} textAlign="start" fontWeight="semibold">
                {t(signatureRecord.approvalType)}
            </Text>
            <Text
                flex={1}
                fontSize="xs"
                px={2}
                py={1}
                line-height={6}
                textAlign="start"
                role="cell"
                aria-label={t("Team")}
            >
                {signatureRecord.team ?? "-"}
            </Text>
            <Text
                flex={1}
                fontSize="xs"
                px={2}
                py={1}
                line-height={6}
                textAlign="start"
                role="cell"
                aria-label={t("Role")}
            >
                {signatureRecord.role ?? "-"}
            </Text>
            <Text
                flex={1}
                fontSize="xs"
                px={2}
                py={1}
                line-height={6}
                textAlign="start"
                role="cell"
                aria-label={t("Name")}
            >
                {signatureRecord.name ?? "-"}
            </Text>
        </HStack>
    );
};
