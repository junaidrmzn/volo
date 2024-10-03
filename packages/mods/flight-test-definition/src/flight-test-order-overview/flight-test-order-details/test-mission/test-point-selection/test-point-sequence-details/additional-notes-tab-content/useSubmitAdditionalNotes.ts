import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@volocopter/design-library-react";
import { useCallback, useState } from "react";
import { useBulkEditTestPointSequences } from "@voloiq/flight-test-definition-api/v1";
import { useAdditionalNotesTabContentTranslation } from "./translations/useAdditionalNotesTabContentTranslation";

type UseSubmitAdditionalNotesOptions = {
    additionalNotes?: string;
    testPointSequenceId: string;
    flightTestOrderId: string;
};

export const useSubmitAdditionalNotes = (options: UseSubmitAdditionalNotesOptions) => {
    const sendToast = useToast();
    const { additionalNotes: initialAdditionalNotes, testPointSequenceId, flightTestOrderId } = options;
    const [additionalNotes, setAdditionalNotes] = useState(initialAdditionalNotes || "");
    const queryClient = useQueryClient();

    const { bulkEditTestPointSequences, isLoading } = useBulkEditTestPointSequences({ flightTestOrderId });
    const { t } = useAdditionalNotesTabContentTranslation();

    const onSubmitAdditionalNotes = useCallback(async () => {
        if ((initialAdditionalNotes || "") === additionalNotes) return;
        try {
            await bulkEditTestPointSequences({
                data: [
                    {
                        id: testPointSequenceId,
                        additionalNotes,
                    },
                ],
            });
            queryClient.invalidateQueries(["TestPointSequences"]);
            sendToast({
                status: "success",
                title: t("Successfully Submitted"),
                description: t("Your additional notes have been saved."),
            });
        } catch {
            sendToast({
                status: "error",
                title: t("Uh-oh!"),
                description: t("Something went wrong updating additional notes"),
            });
        }
    }, [
        additionalNotes,
        bulkEditTestPointSequences,
        testPointSequenceId,
        initialAdditionalNotes,
        queryClient,
        sendToast,
        t,
    ]);

    return { onSubmitAdditionalNotes, additionalNotes, setAdditionalNotes, isLoadingAdditionalNotesSubmit: isLoading };
};
