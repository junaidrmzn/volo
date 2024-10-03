import { useAxiosService } from "@voloiq/service";

export const useDeleteParameterGroup = () => {
    const { axiosDelete } = useAxiosService();
    const deleteParameterGroup = (groupId: string) => {
        return axiosDelete({ path: `/ftd/v1/parameter-groups/${groupId}` });
    };

    return {
        deleteParameterGroup,
    };
};
