import { useToast } from "@volocopter/design-library-react";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export const useSuccessToast = () => {
    const { t } = useMissionTranslations();
    const toast = useToast();

    const onSuccess = (description: string) => {
        toast({
            title: t("Success"),
            description,
            status: "success",
        });
    };

    return { onSuccess };
};
