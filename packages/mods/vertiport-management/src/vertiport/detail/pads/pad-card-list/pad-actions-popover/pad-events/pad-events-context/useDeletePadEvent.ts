import { useDeletePadEvent as useRemovePadEvent } from "../../../../../../../api-hooks/usePadEventService";

export type DeletePadEventCallbackOptions = {
    padEventId: string;
};

export type DeletePadEventCallback = (options: DeletePadEventCallbackOptions) => Promise<void>;

export type UseDeletePadEventOptions = {
    onSuccessfulDelete?: () => void;
};

export const useDeletePadEvent = (options: UseDeletePadEventOptions = {}) => {
    const { onSuccessfulDelete } = options;

    const { sendRequestById } = useRemovePadEvent();

    const deletePadEvent = async (options: DeletePadEventCallbackOptions) => {
        const { padEventId } = options;
        await sendRequestById(padEventId);
        onSuccessfulDelete?.();
    };

    return { deletePadEvent };
};
