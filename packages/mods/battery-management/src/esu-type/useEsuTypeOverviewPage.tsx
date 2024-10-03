import { useState } from "react";
import { useGetEsuTypes } from "../api-hooks/useEsuTypeService";

export const useEsuTypeOverviewPage = () => {
    const [page, setPage] = useState(1);
    const { data, error, state, pagination, sendRequest } = useGetEsuTypes(page);

    return {
        data: data || [],
        error,
        state,
        pagination,
        setPage,
        sendRequest,
        page,
    };
};
