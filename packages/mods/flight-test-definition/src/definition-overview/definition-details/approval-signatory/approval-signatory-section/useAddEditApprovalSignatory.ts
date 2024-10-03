import { useQueryClient } from "@tanstack/react-query";
import type { SignatureRecordInsert, SignatureRecordPatch } from "@voloiq/flight-test-definition-api/v1";
import {
    getSignatureRecordsQueryKey,
    useBulkAddSignatureRecords,
    useBulkEditSignatureRecords,
} from "@voloiq/flight-test-definition-api/v1";
import { OnBulkAdd, OnBulkEdit } from "@voloiq/form";
import { useDefinition } from "../../definition-context/useDefinition";
import { useDefinitionEditSessionId } from "../../definition-edit-session-id-context/useDefinitionEditSessionId";
import { ApprovalSignatoryFormSchema } from "./useApprovalSignatoryFormSchema";

export const useAddEditApprovalSignatory = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();

    const { bulkAddSignatureRecords } = useBulkAddSignatureRecords({ definitionId });
    const { bulkEditSignatureRecords } = useBulkEditSignatureRecords({ definitionId });
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();
    const queryClient = useQueryClient();

    const invalidateSignatureRecordsQuery = () => {
        queryClient.invalidateQueries(getSignatureRecordsQueryKey(definitionId));
    };

    const handleAddEditSignatureRecords = async (
        signatureRecords: (SignatureRecordInsert | SignatureRecordPatch)[]
    ) => {
        const editedSignatureRecords: SignatureRecordPatch[] = signatureRecords.filter(
            (signatureRecord): signatureRecord is SignatureRecordPatch =>
                "id" in signatureRecord && !!signatureRecord.id
        );
        const addedSignatureRecords: SignatureRecordInsert[] = signatureRecords.filter(
            (signatureRecord): signatureRecord is SignatureRecordInsert =>
                !("id" in signatureRecord) || !signatureRecord.id
        );

        if (editedSignatureRecords.length > 0) {
            await bulkEditSignatureRecords(editedSignatureRecords, editSessionId);
        }

        if (addedSignatureRecords.length > 0) {
            await bulkAddSignatureRecords(addedSignatureRecords, editSessionId);
        }
    };

    const onBulkAddSignatureRecords: OnBulkAdd<ApprovalSignatoryFormSchema> = async (signatureRecords) => {
        await handleAddEditSignatureRecords(signatureRecords);
    };

    const onBulkEditSignatureRecords: OnBulkEdit<ApprovalSignatoryFormSchema> = async (signatureRecords) => {
        await handleAddEditSignatureRecords(signatureRecords);
    };

    return { onBulkAddSignatureRecords, onBulkEditSignatureRecords, invalidateSignatureRecordsQuery };
};
