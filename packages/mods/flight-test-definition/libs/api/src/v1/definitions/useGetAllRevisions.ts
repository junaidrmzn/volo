import { useGetAllService } from "@voloiq/service";
import { Revision } from "./apiModels";

export type UseGetAllRevisions = {
    definitionId: string;
    manual?: boolean;
};

export const useGetAllRevisions = (props: UseGetAllRevisions) => {
    const { definitionId, manual = true } = props;

    const { sendRequest, data: revisions } = useGetAllService<Revision>({
        route: `/ftd/v1/definitions/${definitionId}/revisions`,
        options: {
            manual,
        },
    });

    return { revisions, sendRequest };
};
