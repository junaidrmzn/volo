import { useGetAllService } from "@voloiq/service";
import type { TestPointGroup } from "./apiModels";

type UseGetAllTestPointGroupsOptions = {
    manual?: boolean;
};

export const useGetAllTestPointGroups = (props: UseGetAllTestPointGroupsOptions = {}) => {
    const { manual = false } = props;
    const { sendRequestWithResponseEnvelope } = useGetAllService<TestPointGroup>({
        route: "/ftd/v2/test-point-groups",
        options: { manual },
    });

    return { getAllTestPointGroups: sendRequestWithResponseEnvelope };
};
