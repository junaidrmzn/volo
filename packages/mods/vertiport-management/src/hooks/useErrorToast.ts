import { useToast } from "@volocopter/design-library-react";
import type { Error } from "@voloiq-typescript-api/vertiport-management-types";
import { AxiosError } from "@voloiq/service";
import { useVertiportTranslation } from "../translations/useVertiportTranslation";

export const useErrorToast = () => {
    const { t } = useVertiportTranslation();
    const toast = useToast();

    const onError = (error: Error) => {
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

export const useErrorToastWithMessage = () => {
    const { t } = useVertiportTranslation();
    const toast = useToast();

    const onError = (error: AxiosError) => {
        const { response } = error;
        const description = response?.data.error.message
            ? `${response?.data.error.message} (${t("error.statusCode", { code: response?.status })})`
            : t("error.An error occurred");
        toast({
            title: t("error.An error occurred"),
            description,
            status: "error",
        });
    };

    return { onError };
};

export const useErrorToastWithDescription = () => {
    const { t } = useVertiportTranslation();
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
