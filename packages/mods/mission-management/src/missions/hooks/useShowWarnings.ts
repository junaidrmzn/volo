import { useToast } from "@volocopter/design-library-react";
import { useEffect } from "react";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export const useShowWarnings = (warnings: { message: string }[] | undefined) => {
    const toast = useToast();
    const { t } = useMissionTranslations();

    useEffect(() => {
        if (warnings && warnings.length > 0) {
            toast({
                title: t("Some data failed to load"),
                description: t("Try again later"),
                status: "error",
            });
        }
    }, [warnings, toast, t]);
};
