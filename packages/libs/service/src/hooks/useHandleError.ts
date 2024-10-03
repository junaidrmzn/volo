import type { AxiosError, AxiosResponse } from "axios";
import { usePrevious } from "react-use";
import { match } from "ts-pattern";
import { useServiceTranslation } from "../translations/useServiceTranslation";
import { useErrorToast } from "./toast/useErrorToast";
import type { ResponseEnvelope } from "./types/ResponseEnvelope";

export const useHandleError = <DTO extends {}>(error: AxiosError<ResponseEnvelope<DTO>> | null, traceId: string) => {
    const { t } = useServiceTranslation();
    const { displayErrorToast } = useErrorToast();

    const previousError = usePrevious(error);

    return match({ error, previousError })
        .when(
            () => !error || (previousError === error && !error),
            () => undefined
        )
        .when(
            () => !error?.response && previousError !== error,
            () => {
                displayErrorToast(
                    t("errorToast.unknownError.title"),
                    `${t("errorToast.unknownError.description")}\n${t("Error code")}: ${traceId}.`
                );
                return undefined;
            }
        )
        .when(
            () => error?.response && error.response.status >= 500 && previousError !== error,
            () => {
                displayErrorToast(
                    t("errorToast.ServerError.title"),
                    `${t("errorToast.ServerError.description")}\n${t("Error code")}: ${traceId}.`
                );
                return undefined;
            }
        )
        .when(
            () =>
                error?.response &&
                error.response.status < 500 &&
                error.response.status >= 400 &&
                error.response.data.error,
            () => error!.response!.data.error
        )
        .otherwise(() => undefined);
};

export const getStatusCode = <DTO>(
    response: AxiosResponse<ResponseEnvelope<DTO>> | undefined,
    error: AxiosError | null
) => {
    if (response) {
        return response.status;
    }
    if (error) {
        if (error.response) {
            return error.response.status;
        }
        // return "503 Service Unavailable" for network errors
        return 503;
    }
    return -1;
};
