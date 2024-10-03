import { useQuery } from "@tanstack/react-query";
import { UseGetRevisionProcedureProps, useGetRevisionProcedure } from "./useGetRevisionProcedure";

export const getRevisionProcedureQueryKey = (definitionId: string, procedureId: string) => [
    "revision",
    [definitionId, procedureId],
];

export const useGetRevisionProcedureQuery = (options: UseGetRevisionProcedureProps) => {
    const { definitionId, procedureId } = options;
    const { refetchProcedure: getProcedure } = useGetRevisionProcedure({ ...options, manual: true });

    const { data: procedure, isLoading: isProcedureLoading } = useQuery({
        queryKey: getRevisionProcedureQueryKey(definitionId, procedureId),
        queryFn: getProcedure,
    });

    return {
        procedure,
        isProcedureLoading,
    };
};
