import { useState } from "react";
import { TestPointAttempt, TestPointAttemptPatch } from "@voloiq/flight-test-definition-api/v2";
import { useOptimisticEditTestPointAttemptStatus } from "./useOptimisticEditTestPointAttemptStatus";

export const useAttemptsV2 = (initialAttempts: TestPointAttempt[], testPointId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [attemptIdInEdit, setAttemptIdInEdit] = useState<string | undefined>(undefined);
    const [attempts, setAttempts] = useState(initialAttempts);

    const updateAttempt = (id: string, data: TestPointAttemptPatch) => {
        setAttempts((previousAttempts) => {
            const newAttempts = previousAttempts.map((attempt) => {
                if (attempt.id === id) {
                    return { ...attempt, ...data };
                }
                return attempt;
            });
            return newAttempts;
        });
    };
    const { optimisticEditProcedure } = useOptimisticEditTestPointAttemptStatus({
        testPointId,
        attemptId: attemptIdInEdit || "",
    });
    const onUpdateTestpointAttempt = (id: string, data: TestPointAttemptPatch) => {
        setIsLoading(true);
        optimisticEditProcedure({ data });
        setAttemptIdInEdit(undefined);
        updateAttempt(id, data);
        setIsLoading(false);
    };

    return {
        attempts,
        onUpdateTestpointAttempt,
        isLoading,
        setIsLoading,
        attemptIdInEdit,
        setAttemptIdInEdit,
    };
};
