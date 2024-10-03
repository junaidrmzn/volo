import { P, match } from "ts-pattern";
import { useGetAllService } from "@voloiq/service";
import type { AttachedFile } from "./apiModels";

export const useGetAllAttachedFiles = (definitionId: string) => {
    const {
        data,
        sendRequest: refetchAttachedFiles,
        pagination,
    } = useGetAllService<AttachedFile>({
        route: `/ftd/v1/definitions/${definitionId}/files`,
        config: {
            params: {
                orderBy: "createTime:desc",
                size: 100_000,
            },
        },
    });

    const attachedFilesCount = match(pagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => undefined);

    const attachedFiles = data.map((attachedFile) => ({
        ...attachedFile,
        uploadDate: new Date(attachedFile.createTime),
    }));

    return { attachedFiles, refetchAttachedFiles, attachedFilesCount };
};
