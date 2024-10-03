import { useGetAllService } from "@voloiq/service";
import { SignatureRecord } from "./apiModels";

export type UseGetSignatureRecordsOptions = {
    definitionId: string;
};

export const useGetSignatureRecords = (options: UseGetSignatureRecordsOptions) => {
    const { definitionId } = options;

    const { sendRequestWithResponseEnvelope: getSignatureRecords } = useGetAllService<SignatureRecord>({
        route: `/ftd/v1/definitions/${definitionId}/approval-signatory`,
        options: { manual: true },
    });

    return { getSignatureRecords };
};
