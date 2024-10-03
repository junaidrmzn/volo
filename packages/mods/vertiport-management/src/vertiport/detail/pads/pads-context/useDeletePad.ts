import { useDeletePad as useRemovePad } from "../../../../api-hooks/usePadService";

export type DeletePadCallbackOptions = {
    padId: string;
};

export type DeletePadCallback = (options: DeletePadCallbackOptions) => Promise<void>;

export type UseDeletePadOptions = {
    onSuccessfulDelete?: () => void;
};

export const useDeletePad = (options: UseDeletePadOptions = {}) => {
    const { onSuccessfulDelete } = options;

    const { sendRequestById } = useRemovePad();

    const deletePad = async (options: DeletePadCallbackOptions) => {
        const { padId } = options;
        await sendRequestById(padId);
        onSuccessfulDelete?.();
    };

    return { deletePad };
};
