import { useCreateService } from "@voloiq/service";
import type { SignatureRecord, SignatureRecordInsert } from "./apiModels";

export type UseBulkAddSignatureRecordsOptions = {
    definitionId: string;
};

export const useBulkAddSignatureRecords = (options: UseBulkAddSignatureRecordsOptions) => {
    const { definitionId } = options;

    const { sendRequest, state } = useCreateService<SignatureRecordInsert[], SignatureRecord[]>({
        route: `/ftd/v1/definitions/${definitionId}/approval-signatory`,
    });

    const bulkAddSignatureRecords = (signatureRecords: SignatureRecordInsert[], editSessionId: string) =>
        sendRequest({
            data: signatureRecords,
            params: { editSessionId },
        });

    return { bulkAddSignatureRecords, isLoading: state === "pending" };
};
