import { useToast } from "@volocopter/design-library-react";
import type { Error } from "@voloiq-typescript-api/network-scheduling-types";
import { AxiosError } from "@voloiq/service";
import { useMissionErrorTranslations } from "../errors/translations/useMissionErrorTranslations";

export const useErrorToastWithDescription = () => {
    const { t } = useMissionErrorTranslations();
    const toast = useToast();

    const onError = (description: string) => {
        toast({
            title: t("An error occurred"),
            description,
            status: "error",
        });
    };

    return { onError };
};

export const useErrorToastWithMessage = () => {
    const { t } = useMissionErrorTranslations();
    const toast = useToast();

    const onError = (error: AxiosError) => {
        const { response } = error;
        const description = response?.data.error.message
            ? `${response?.data.error.message} (${t("statusCode", { code: response?.status })})`
            : t("An error occurred");
        toast({
            title: t("An error occurred"),
            description,
            status: "error",
        });
    };

    return { onError };
};

export const useErrorToast = () => {
    const { t } = useMissionErrorTranslations();
    const toast = useToast();

    const onError = (error: Error) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const description = error.details?.map((details: any) => details.message ?? "").join("\n") ?? error.message;

        toast({
            title: t("An error occurred"),
            description,
            status: "error",
        });
    };

    return { onError };
};
