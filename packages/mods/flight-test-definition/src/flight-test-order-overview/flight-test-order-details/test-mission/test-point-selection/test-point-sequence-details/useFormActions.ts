import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@volocopter/design-library-react";
import { useCallback, useRef } from "react";
import {
    getAllTestPointSequenceTestPointAssociationsQueryKey,
    getAllTestPointSequencesQueryKey,
} from "@voloiq/flight-test-definition-api/v1";
import { PromiseResults } from "@voloiq/form";
import { useTestPointsTabContentTranslation } from "./test-points-tab-content/translations/useTestPointsTabContentTranslation";

type UseFormActionsOptions = {
    onSubmitAdditionalNotes: () => void;
    flightTestOrderId: string;
    testPointSequenceId: string;
};
const filterRejectedPromises = (results: PromiseResults) => {
    return results.filter((result) => result.status === "rejected");
};

export const useFormActions = (options: UseFormActionsOptions) => {
    const sendToast = useToast();

    const { onSubmitAdditionalNotes, flightTestOrderId, testPointSequenceId } = options;
    const queryClient = useQueryClient();
    const formRef = useRef<HTMLFormElement | null>(null);
    const addBlankRowRef = useRef<Function | undefined>(undefined);
    const { t } = useTestPointsTabContentTranslation();

    const onSubmit = useCallback(() => {
        onSubmitAdditionalNotes();
        formRef.current?.requestSubmit();
    }, [onSubmitAdditionalNotes]);

    const onAfterSubmit = useCallback(
        (results) => {
            queryClient.invalidateQueries(getAllTestPointSequencesQueryKey(flightTestOrderId));
            if (filterRejectedPromises(results).length === 0) {
                sendToast({
                    status: "success",
                    title: t("Successfully Submitted"),
                    description: t("Your test point card changes have been saved."),
                });
            } else {
                sendToast({
                    status: "error",
                    title: t("Uh-oh!"),
                    description: t("Something went wrong saving your changes."),
                });
            }
            queryClient.invalidateQueries(
                getAllTestPointSequenceTestPointAssociationsQueryKey(flightTestOrderId, testPointSequenceId)
            );
        },
        [flightTestOrderId, queryClient, sendToast, t, testPointSequenceId]
    );

    return { onAfterSubmit, onSubmit, formRef, addBlankRowRef };
};
