import { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export const useMemoizedQueryClient = () => {
    const queryClient = useMemo(() => new QueryClient(), []);
    return { queryClient };
};
