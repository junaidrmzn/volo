import type { AnyObjectSchema } from "@voloiq/form";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useErrorToastWithDescription } from "../hooks/useErrorToast";
import { useSuccessToast } from "../hooks/useSuccessToast";
import { useVertiportTranslation } from "../translations/useVertiportTranslation";
import type { CreateErrorMessageMapOptions } from "./createErrorMessageMap";
import { createErrorMessageMap } from "./createErrorMessageMap";

export type UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema> = {
    makeRequest: (requestConfig: { data: CreateEntityDTO }) => Promise<EntityDTO | undefined>;
} & Pick<CreateErrorMessageMapOptions<Schema>, "schema" | "isFieldName">;

export const useRequestWithErrorHandling = <EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema>(
    props: UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema>
) => {
    const { makeRequest, schema, isFieldName } = props;

    const { t } = useVertiportTranslation();
    const { onError } = useErrorToastWithDescription();
    const { onSuccess } = useSuccessToast();

    const makeRequestWithErrorHandling = async (data: CreateEntityDTO) => {
        const errorMessageMap = await makeRequest({ data })
            .then(() => {
                onSuccess(t("success.header"));
            })
            .catch((error: AxiosError<ResponseEnvelope<CreateEntityDTO>>) => {
                const { response } = error;
                if (response && response.status === 400) {
                    if (response.data.error?.message) {
                        onError(
                            `${response.data.error?.message} (${t("error.statusCode", { code: response.status })})`
                        );
                    }
                    const { errorMessageMap, unknownErrorOccurred } = createErrorMessageMap({
                        // todo: type matching
                        // @ts-ignore
                        detailedErrors: response.data.error?.details,
                        schema,
                        isFieldName,
                        t,
                    });
                    if (unknownErrorOccurred) {
                        onError(
                            `${t("error.An error occurred")} (${t("error.statusCode", { code: response.status })})`
                        );
                    }
                    return errorMessageMap;
                }
                onError(
                    response?.status
                        ? `${t("error.An error occurred")} (${t("error.statusCode", { code: response.status })})`
                        : t("error.An error occurred")
                );
                throw error;
            });

        return errorMessageMap ?? {};
    };

    return {
        makeRequestWithErrorHandling,
    };
};
