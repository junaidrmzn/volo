import { useGetAllService } from "@voloiq/service";
import type { TestPointGroup } from "./apiModels";

type UseGetAllTestPointGroups = {
    manual?: boolean;
};

export const useGetAllTestPointGroups = (props: UseGetAllTestPointGroups = {}) => {
    const { manual = false } = props;
    const { sendRequestWithResponseEnvelope } = useGetAllService<TestPointGroup>({
        route: "/ftd/v1/test-point-groups",
        options: { manual },
    });

    return { getAllTestPointGroups: sendRequestWithResponseEnvelope };
};
