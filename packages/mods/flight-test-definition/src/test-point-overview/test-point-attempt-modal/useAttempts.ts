import { useState } from "react";
import type {
    TestPointAttempt,
    TestPointAttemptInsert,
    TestPointAttemptPatch,
} from "@voloiq/flight-test-definition-api/v1";
import { useAddTestpointAttempt, useUpdateTestpointAttempt } from "@voloiq/flight-test-definition-api/v1";

export const useAttempts = (initialAttempts: TestPointAttempt[], testPointId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [attemptIdInEdit, setAttemptIdInEdit] = useState<"new" | string | undefined>(undefined);
    const [attempts, setAttempts] = useState(initialAttempts);

    const updateAttempt = (id: string, data: TestPointAttemptPatch) => {
        const newAttempts = attempts.map((attempt) => {
            if (attempt.id === id) {
                return { ...attempt, ...data };
            }
            return attempt;
        });
        setAttempts(newAttempts);
    };
    const { updateTestpointAttemptById } = useUpdateTestpointAttempt({ testPointId });
    const onUpdateTestpointAttempt = async (id: string, data: TestPointAttemptPatch) => {
        setIsLoading(true);
        await updateTestpointAttemptById(id, data);
        setAttemptIdInEdit(undefined);
        updateAttempt(id, data);
        setIsLoading(false);
    };

    const addAttempt = (newAttempt: TestPointAttempt) => {
        setAttempts([...attempts, newAttempt]);
    };
    const { addTestpointAttempt } = useAddTestpointAttempt({ testPointId });
    const onAddTestpointAttempt = async (data: TestPointAttemptInsert) => {
        setIsLoading(true);
        const newAttempt = await addTestpointAttempt({ data });
        if (!newAttempt) return;

        addAttempt(newAttempt);
        setAttemptIdInEdit(undefined);
        setIsLoading(false);
    };

    return {
        attempts,
        onUpdateTestpointAttempt,
        onAddTestpointAttempt,
        isLoading,
        setIsLoading,
        attemptIdInEdit,
        setAttemptIdInEdit,
    };
};
