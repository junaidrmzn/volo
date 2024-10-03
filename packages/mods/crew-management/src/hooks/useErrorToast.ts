import { useToast } from "@volocopter/design-library-react";
import type { Error } from "@voloiq-typescript-api/crew-api-types";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";

export const useErrorToast = () => {
    const { t } = useCrewApiTranslation();
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
    const { t } = useCrewApiTranslation();
    const toast = useToast();

    const onError = (description: string) => {
        toast({
            title: t("error.An error occurred"),
            description,
            status: "error",
        });
    };

    return { onError };
};
