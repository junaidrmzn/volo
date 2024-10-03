import { useUpdateTestpointAttempt } from "@voloiq/flight-test-definition-api/v2";
import { useOptimisticEdit } from "@voloiq/utils";

export type UseOptimisticEditTestPointAttemptStatusOptions = {
    testPointId: string;
    attemptId: string;
};

export const getUpdateTestPointAttemptKey = (testPointId: string) => ["testPointAttempt", testPointId];

export const useOptimisticEditTestPointAttemptStatus = (props: UseOptimisticEditTestPointAttemptStatusOptions) => {
    const { testPointId, attemptId } = props;

    const { editTestPointAttempt } = useUpdateTestpointAttempt({ testPointId, attemptId });
    const { optimisticEdit: optimisticEditProcedure } = useOptimisticEdit({
        editResource: editTestPointAttempt,
        queryKey: getUpdateTestPointAttemptKey(testPointId),
    });

    return { optimisticEditProcedure };
};
