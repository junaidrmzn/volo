import { useToast } from "@volocopter/design-library-react";
import { useEventTranslation } from "../translations/useEventTranslation";

export const useErrorToast = () => {
    const { t } = useEventTranslation();
    const toast = useToast();

    const onError = (description: string) => {
        toast({
            title: t("errorTitle"),
            description,
            status: "error",
        });
    };

    return { onError };
};
