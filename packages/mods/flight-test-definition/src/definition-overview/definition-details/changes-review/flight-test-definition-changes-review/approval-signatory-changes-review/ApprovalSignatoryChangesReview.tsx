import { VStack } from "@volocopter/design-library-react";
import { ReadonlyResourceSectionContainer } from "@voloiq/flight-test-definition-components";
import { ApprovalSignatoryTable } from "../../../approval-signatory/approval-signatory-section/ApprovalSignatoryTable";
import { SignatureRecordSections } from "../../../approval-signatory/approval-signatory-section/approvalSignatoryTypes";
import { useApprovalSignatoryChangesReviewTranslation } from "./translations/useApprovalSignatoryChangesReviewChangesReviewTranslation";

export type ApprovalSignatoryChangesReviewProps = {
    signatureRecords: SignatureRecordSections;
};

export const ApprovalSignatoryChangesReview = (props: ApprovalSignatoryChangesReviewProps) => {
    const { signatureRecords } = props;

    const { t } = useApprovalSignatoryChangesReviewTranslation();

    return (
        <VStack spacing={6}>
            <ReadonlyResourceSectionContainer sectionTitle={t("Test Request Approval")}>
                <ApprovalSignatoryTable
                    approvalSection="Test Request Approval"
                    signatureRecords={signatureRecords["Test Request Approval"]}
                />
            </ReadonlyResourceSectionContainer>

            <ReadonlyResourceSectionContainer sectionTitle={t("Flight/Ground Test Plan Approval")}>
                <ApprovalSignatoryTable
                    approvalSection="Flight/Ground Test Plan Approval"
                    signatureRecords={signatureRecords["Flight/Ground Test Plan Approval"]}
                />
            </ReadonlyResourceSectionContainer>

            <ReadonlyResourceSectionContainer sectionTitle={t("Flight Test Definition (FTD) Approval")}>
                <ApprovalSignatoryTable
                    approvalSection="Flight Test Definition (FTD) Approval"
                    signatureRecords={signatureRecords["Flight Test Definition (FTD) Approval"]}
                />
            </ReadonlyResourceSectionContainer>
        </VStack>
    );
};
