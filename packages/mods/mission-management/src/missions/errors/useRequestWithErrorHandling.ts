import type { AnyObjectSchema } from "@voloiq/form";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useErrorToastWithDescription } from "../hooks/useErrorToast";
import type { CreateErrorMessageMapOptions } from "./createErrorMessageMap";
import { createErrorMessageMap } from "./createErrorMessageMap";
import { useMissionErrorTranslations } from "./translations/useMissionErrorTranslations";

export type UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema> = {
    makeRequest: (data: CreateEntityDTO) => Promise<EntityDTO | undefined>;
} & Pick<CreateErrorMessageMapOptions<Schema>, "schema" | "isFieldName">;

export const useRequestWithErrorHandling = <EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema>(
    props: UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema>
) => {
    const { makeRequest, schema, isFieldName } = props;

    const { t } = useMissionErrorTranslations();
    const { onError } = useErrorToastWithDescription();

    const makeRequestWithErrorHandling = async (data: CreateEntityDTO) => {
        const errorMessageMap = await makeRequest(data)
            .then(() => ({}))
            .catch((error: AxiosError<ResponseEnvelope<CreateEntityDTO>>) => {
                const { response } = error;
                if (response && response.status === 400) {
                    if (response.data.error?.message) {
                        onError(`${response.data.error?.message} (${t("statusCode", { code: response.status })})`);
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
                        onError(`${t("errorMessages.unknownError")} (${t("statusCode", { code: response.status })})`);
                    }
                    return errorMessageMap;
                }
                onError(
                    response?.status
                        ? `${t("An error occurred")} (${t("statusCode", { code: response.status })})`
                        : t("An error occurred")
                );
                return {};
            });

        return errorMessageMap;
    };

    return {
        makeRequestWithErrorHandling,
    };
};
