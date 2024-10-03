import { Flex, HStack, Text } from "@volocopter/design-library-react";
import { SignatureRecord } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceSection } from "@voloiq/flight-test-definition-components";
import { ApprovalSignatoryTable } from "./ApprovalSignatoryTable";
import type { PartialSignatureRecord } from "./approvalSignatoryTypes";
import { useApprovalSignatorySectionTranslation } from "./translations/useApprovalSignatorySectionTranslation";
import { useAddEditApprovalSignatory } from "./useAddEditApprovalSignatory";
import { useApprovalSignatoryFormSchema } from "./useApprovalSignatoryFormSchema";

export type ApprovalSignatorySectionProps = {
    approvalSection: SignatureRecord["approvalSection"];
    signatureRecords: PartialSignatureRecord[];
};

export const ApprovalSignatorySection = (props: ApprovalSignatorySectionProps) => {
    const { approvalSection, signatureRecords = [] } = props;

    const { t } = useApprovalSignatorySectionTranslation();
    const { onBulkEditSignatureRecords, onBulkAddSignatureRecords, invalidateSignatureRecordsQuery } =
        useAddEditApprovalSignatory();
    const { formSchema } = useApprovalSignatoryFormSchema();

    return (
        <>
            <BulkResourceSection
                formSchema={formSchema}
                resourceNameSingular={t(approvalSection)}
                resourceNamePlural={t(approvalSection)}
                renderFormControlGroup={(FormControl, index) => (
                    <HStack
                        role="row"
                        aria-label={
                            signatureRecords[index]?.approvalType
                                ? // The null check already exists but TypeScript is not able to infer it.
                                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                  `${t(signatureRecords[index]?.approvalType!)} ${t("Row Form")}`
                                : `${t("Row Form")} #${index + 1}`
                        }
                    >
                        <input type="hidden" name="approvalType" value={signatureRecords[index]?.approvalType} />
                        <input type="hidden" name="approvalSection" value={signatureRecords[index]?.approvalSection} />
                        <Flex flex={1}>
                            <Text fontSize="xs" fontWeight="semibold">
                                {signatureRecords[index]?.approvalType
                                    ? // The null check already exists but TypeScript is not able to infer it.
                                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                      t(signatureRecords[index]?.approvalType!)
                                    : "-"}
                            </Text>
                        </Flex>
                        <Flex flex={1} role="cell" aria-label={t("Team")}>
                            <FormControl fieldName="team" />
                        </Flex>
                        <Flex flex={1} role="cell" aria-label={t("Role")}>
                            <FormControl fieldName="role" />
                        </Flex>
                        <Flex flex={1} role="cell" aria-label={t("Name")}>
                            <FormControl fieldName="name" />
                        </Flex>
                    </HStack>
                )}
                onBulkAdd={(items) => onBulkAddSignatureRecords(items)}
                onBulkDelete={Promise.resolve}
                onBulkEdit={(items) => onBulkEditSignatureRecords(items)}
                getAllResources={() => Promise.resolve(signatureRecords)}
                getInitialValues={() => signatureRecords}
                withAddNewButton={false}
                withDeleteButton={false}
                overrideOnAfterSubmit={invalidateSignatureRecordsQuery}
            />
            <ApprovalSignatoryTable approvalSection={approvalSection} signatureRecords={signatureRecords} />
        </>
    );
};
