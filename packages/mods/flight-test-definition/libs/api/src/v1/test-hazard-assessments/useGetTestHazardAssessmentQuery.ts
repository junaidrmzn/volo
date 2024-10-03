import { useQuery } from "@tanstack/react-query";
import { useGetTestHazardAssessment } from "./useGetTestHazardAssessment";

export const getTestHazardAssessmentQueryKey = (testHazardAssessmentId: string) => [
    "testHazardAssessment",
    testHazardAssessmentId,
];
export type UseGetTestHazardAssessmentQuery = {
    testHazardAssessmentId: string;
};

export const useGetTestHazardAssessmentQuery = (props: UseGetTestHazardAssessmentQuery) => {
    const { testHazardAssessmentId } = props;
    const { refetchDataWithResponseEnvelope } = useGetTestHazardAssessment();

    const {
        data,
        refetch: getTestHazardAssessment,
        isLoading,
    } = useQuery({
        queryKey: getTestHazardAssessmentQueryKey(testHazardAssessmentId),
        queryFn: refetchDataWithResponseEnvelope,
    });

    return {
        testHazardAssessment: data?.data,
        getTestHazardAssessment,
        isLoading,
        pagination: data?.pagination,
    };
};
