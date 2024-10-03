import { useQuery } from "@tanstack/react-query";
import { PlanProcessProgress } from "./apiModel";
import { useGetPlanProcessProgress } from "./useGetPlanProcessProgress";

type UseGetPlanProcessProgressQueryOptions = {
    processId: string;
    onSuccess: (data: PlanProcessProgress) => void;
};

export const useGetPlanProcessProgressQuery = (options: UseGetPlanProcessProgressQueryOptions) => {
    const { processId, onSuccess } = options;
    const { refetchData } = useGetPlanProcessProgress(processId);

    const queryKey = ["plan-process-progress", processId];
    const planProcessProgressQuery = useQuery({
        queryKey,
        queryFn: refetchData,
        enabled: processId !== "",
        refetchInterval: (data?: PlanProcessProgress) => {
            if (data?.status === "COMPLETED" || data?.status === "FAILED") return false;
            return 1000;
        },
        onSuccess,
        staleTime: Number.POSITIVE_INFINITY,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { status: planProcessProgressQuery.data?.status };
};
