import { useToast } from "@volocopter/design-library-react";
import type { Error } from "@voloiq-typescript-api/aircraft-management-types";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

export const useErrorToast = () => {
    const { t } = useResourcesTranslation();
    const toast = useToast();

    const onError = (error: Error) => {
        // The ErrorDetails are not yet typed in the OAS
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const description = error.details?.map((details: any) => details.message ?? "").join("\n") ?? error.message;

        toast({
            title: t("error.An error occurred"),
            description,
            status: "error",
        });
    };

    return { onError };
};
export const useErrorToastWithDescription = () => {
    const { t } = useResourcesTranslation();
    const toast = useToast();

    const onError = (description: string) => {
        toast({
            title: t("aircraft-management.errorTitle"),
            description,
            status: "error",
        });
    };

    return { onError };
};
