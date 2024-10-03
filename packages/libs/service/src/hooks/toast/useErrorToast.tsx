import { Icon, useToast } from "@volocopter/design-library-react";
import { useServiceTranslation } from "../../translations/useServiceTranslation";

export const useErrorToast = () => {
    const toast = useToast();
    const { t } = useServiceTranslation();

    const displayErrorToast = (title: string, description: string) => {
        toast({
            title,
            description,
            status: "error",
            duration: 10_000,
            actionButtonProps: {
                "aria-label": t("Copy error message"),
                icon: <Icon icon="copy" size={4} />,
                onClick: () => navigator.clipboard.writeText(`${title}\n${description}`),
            },
        });
    };

    return { displayErrorToast };
};
