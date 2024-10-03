import { useToast } from "@volocopter/design-library-react";
import type { AnyObjectSchema } from "@voloiq/form";
import type { AxiosError } from "@voloiq/service";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";
import { CreateErrorMessageMap, createErrorMessageMap } from "./createErrorMessageMap";

export type UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema> = {
    makeRequest: (requestConfig: { data: CreateEntityDTO }) => Promise<EntityDTO | undefined>;
    onSuccess: () => void;
} & Pick<CreateErrorMessageMap<Schema>, "isFieldName">;

export const useRequestWithErrorHandling = <EntityDTO, CreateEntityDTO, Schema extends AnyObjectSchema>(
    props: UseRequestWithErrorHandlingProps<EntityDTO, CreateEntityDTO, Schema>
) => {
    const { makeRequest, onSuccess, isFieldName } = props;
    const { t } = useConnectionTranslation();
    const toast = useToast();

    const makeRequestWithErrorHandling = async (data: CreateEntityDTO) => {
        const errorMessageMap = await makeRequest({ data })
            .then(() => {
                onSuccess();
                return {};
            })
            .catch((error: AxiosError) => {
                const { response } = error;
                if (response && response.status === 400) {
                    const { errorMessageMap, toastErrorMessages } = createErrorMessageMap({
                        detailedErrors: response.data?.error?.details ?? [],
                        isFieldName,
                        t,
                    });
                    if (toastErrorMessages.isUniqueConnectionValidFromToError) {
                        toast({
                            title: t("title.Add"),
                            description: t("errorMessages.uniqueConnectionValidFromTo"),
                            status: "error",
                        });
                    }
                    return errorMessageMap;
                }
                return {};
            });

        return errorMessageMap;
    };

    return { makeRequestWithErrorHandling };
};
