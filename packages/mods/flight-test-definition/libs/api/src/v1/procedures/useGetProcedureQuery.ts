import { useQuery } from "@tanstack/react-query";
import type { UseGetProcedureOptions } from "./useGetProcedure";
import { useGetProcedure } from "./useGetProcedure";

export const getProcedureQueryKey = (procedureId: string) => ["procedure", procedureId];

export const useGetProcedureQuery = (options: UseGetProcedureOptions) => {
    const { procedureId } = options;
    const { getProcedure } = useGetProcedure({ ...options, manual: true });

    const { data: procedure } = useQuery({ queryKey: getProcedureQueryKey(procedureId), queryFn: getProcedure });

    return { procedure };
};
