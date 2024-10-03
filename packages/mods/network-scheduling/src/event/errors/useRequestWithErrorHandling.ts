import type { AnyObjectSchema } from "@voloiq/form";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useErrorToast } from "../hooks/useErrorToast";
import { useSuccessToast } from "../hooks/useSuccessToast";
import { useEventTranslation } from "../translations/useEventTranslation";
import type { CreateErrorMessageMapOptions } from "./createErrorMessageMap";
import { createErrorMessageMap } from "./createErrorMessageMap";

export type UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema> = {
    makeRequest: (requestConfig: { data: CreateEntityDTO }) => Promise<EntityDTO | undefined>;
} & Pick<CreateErrorMessageMapOptions<Schema>, "schema" | "isFieldName">;

export const useRequestWithErrorHandling = <EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema>(
    props: UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema>
) => {
    const { makeRequest, schema, isFieldName } = props;

    const { t } = useEventTranslation();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    const makeRequestWithErrorHandling = async (data: CreateEntityDTO) => {
        const errorMessageMap = await makeRequest({ data })
            .then(() => {
                onSuccess(t("successMessages.operation successful"));
            })
            .catch((error: AxiosError<ResponseEnvelope<CreateEntityDTO>>) => {
                const { response } = error;
                if (response && response.status === 400) {
                    if (response.data.error?.message)
                        onError(
                            `${response.data.error?.message} (${t("generic.error.statusCode", {
                                code: response.status,
                            })})`
                        );
                    const { errorMessageMap, unknownErrorOccurred } = createErrorMessageMap({
                        detailedErrors: response.data.error?.details ?? [],
                        schema,
                        isFieldName,
                        t,
                    });

                    if (unknownErrorOccurred) {
                        onError(
                            `${t("errorMessages.unknownError")} (${t("generic.error.statusCode", {
                                code: response.status,
                            })})`
                        );
                    }
                    return errorMessageMap;
                }
                onError(
                    response?.status
                        ? `${t("generic.error.An error occurred")} (${t("generic.error.statusCode", {
                              code: response.status,
                          })})`
                        : t("generic.error.An error occurred")
                );
                return {};
            });

        return errorMessageMap ?? {};
    };

    return {
        makeRequestWithErrorHandling,
    };
};
