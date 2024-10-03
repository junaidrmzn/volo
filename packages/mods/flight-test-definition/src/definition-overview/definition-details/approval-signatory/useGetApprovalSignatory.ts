import { useGetSignatureRecordsQuery } from "@voloiq/flight-test-definition-api/v1";
import { useDefinition } from "../definition-context/useDefinition";
import { groupSignatureRecordsBySection } from "./groupSignatureRecordsBySection";

export const useGetApprovalSignatory = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();

    const { signatureRecords } = useGetSignatureRecordsQuery({ definitionId });

    return {
        signatureRecordSections: groupSignatureRecordsBySection(signatureRecords),
    };
};
