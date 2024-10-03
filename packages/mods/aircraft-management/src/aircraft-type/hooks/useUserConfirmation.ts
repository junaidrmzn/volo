import { ErrorStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { useEffect, useState } from "react";
import type { Error } from "@voloiq/service";

export type UseUserConfirmationProps = {
    error?: Error;
    openConfirmationModal?: Function;
};

const isUserConfirmationNeeded = (error?: Error | null) =>
    error && error.code === 400 && error.status === ErrorStatus.FAILED_PRECONDITION;

export const useUserConfirmation = (props: UseUserConfirmationProps) => {
    const { error, openConfirmationModal } = props;
    const [informationToConfirm, setInformationToConfirm] = useState<Error>();

    useEffect(() => {
        if (isUserConfirmationNeeded(error)) {
            setInformationToConfirm(error);
            openConfirmationModal?.();
        } else {
            setInformationToConfirm(undefined);
        }
    }, [error, setInformationToConfirm, openConfirmationModal]);

    return { informationToConfirm, isUserConfirmationNeeded };
};
