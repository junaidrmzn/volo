import { VStack } from "@volocopter/design-library-react";
import { ApprovalSignatorySection } from "./approval-signatory-section/ApprovalSignatorySection";
import { useGetApprovalSignatory } from "./useGetApprovalSignatory";

export const ApprovalSignatory = () => {
    const { signatureRecordSections } = useGetApprovalSignatory();

    return (
        <VStack spacing={6}>
            <ApprovalSignatorySection
                approvalSection="Test Request Approval"
                signatureRecords={signatureRecordSections["Test Request Approval"]}
            />
            <ApprovalSignatorySection
                approvalSection="Flight/Ground Test Plan Approval"
                signatureRecords={signatureRecordSections["Flight/Ground Test Plan Approval"]}
            />
            <ApprovalSignatorySection
                approvalSection="Flight Test Definition (FTD) Approval"
                signatureRecords={signatureRecordSections["Flight Test Definition (FTD) Approval"]}
            />
        </VStack>
    );
};
