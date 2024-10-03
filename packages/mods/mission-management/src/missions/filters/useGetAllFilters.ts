import { useBuildFilters } from "./useBuildFilters";

export const useGetAllFilters = <Resource>() => {
    const { buildFilters } = useBuildFilters<Resource>();

    const getAllFiltersAsync = async () => {
        return buildFilters();
    };

    const getAllFilters = () => {
        return buildFilters();
    };

    return {
        getAllFiltersAsync,
        getAllFilters,
    };
};
