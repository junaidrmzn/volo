import { useGetAllService } from "@voloiq/service";
import type { ImportantNote } from "./apiModels";

export type UseGetAllImportantNotesOptions = {
    definitionId: string;
    procedureId: string;
    params?: Record<string, string | number>;
};

export const useGetAllImportantNotes = (options: UseGetAllImportantNotesOptions) => {
    const { definitionId, procedureId, params } = options;

    const { sendRequest: getAllImportantNotes } = useGetAllService<ImportantNote>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
        options: { manual: true },
        params: {
            orderBy: "createTime:asc",
            ...params,
        },
    });

    return { getAllImportantNotes };
};
