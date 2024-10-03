import { usePatchService } from "@voloiq/service";
import type { SignatureRecord, SignatureRecordPatch } from "./apiModels";

export type UseBulkEditSignatureRecordsOptions = {
    definitionId: string;
};

export const useBulkEditSignatureRecords = (options: UseBulkEditSignatureRecordsOptions) => {
    const { definitionId } = options;

    const { sendRequest, state } = usePatchService<SignatureRecordPatch[], SignatureRecord[]>({
        route: `/ftd/v1/definitions/${definitionId}/approval-signatory`,
    });

    const bulkEditSignatureRecords = (signatureRecords: SignatureRecordPatch[], editSessionId: string) =>
        sendRequest({
            data: signatureRecords,
            params: { editSessionId },
        });

    return { bulkEditSignatureRecords, isLoading: state === "pending" };
};
