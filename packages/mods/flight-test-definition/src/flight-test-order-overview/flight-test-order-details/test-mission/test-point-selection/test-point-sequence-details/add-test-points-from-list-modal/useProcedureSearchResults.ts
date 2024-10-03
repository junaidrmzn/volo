import { useGetAllProceduresQuery } from "@voloiq/flight-test-definition-api/v1";

type UseProcedureSearchResultsOptions = {
    definitionId?: string;
};

export const useProcedureSearchResults = (options: UseProcedureSearchResultsOptions) => {
    const { definitionId = "" } = options;

    const { procedures } = useGetAllProceduresQuery({ definitionId });

    return { procedures };
};
