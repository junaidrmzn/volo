import { useState } from "react";
import { useGetEsus } from "../api-hooks/useEsuService";

export const useEsuOverviewPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, state, pagination, sendRequest } = useGetEsus(page);

    return {
        data: data || [],
        error,
        state,
        pagination,
        setPage,
        sendRequest,
    };
};
