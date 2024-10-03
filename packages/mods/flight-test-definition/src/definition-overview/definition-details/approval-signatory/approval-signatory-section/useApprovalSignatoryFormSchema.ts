import { useMemo } from "react";
import { SignatureRecordApprovalSection, SignatureRecordApprovalType } from "@voloiq/flight-test-definition-api/v1";
import { mixed, object, string } from "@voloiq/form";
import { useApprovalSignatorySectionTranslation } from "./translations/useApprovalSignatorySectionTranslation";

export const useApprovalSignatoryFormSchema = () => {
    const { t } = useApprovalSignatorySectionTranslation();

    const formSchema = useMemo(
        () =>
            object({
                id: string(),
                approvalType: mixed<SignatureRecordApprovalType>()
                    .oneOf([
                        "Approved",
                        "Authored (DE)",
                        "Authored (FTE)",
                        "Reviewed (CVE)",
                        "Reviewed (Eng)",
                        "Reviewed (FTE)",
                        "Safety Release (SRB)",
                        "Technical Approval",
                    ])
                    .required(),
                approvalSection: mixed<SignatureRecordApprovalSection>()
                    .oneOf([
                        "Test Request Approval",
                        "Flight/Ground Test Plan Approval",
                        "Flight Test Definition (FTD) Approval",
                    ])
                    .required(),
                team: string().label(t("Team")),
                role: string().label(t("Role")),
                name: string().label(t("Name")),
            }),
        [t]
    );

    return { formSchema };
};

export type ApprovalSignatoryFormSchema = ReturnType<typeof useApprovalSignatoryFormSchema>["formSchema"];
