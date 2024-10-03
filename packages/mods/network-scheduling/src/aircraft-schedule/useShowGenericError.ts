import { useToast } from "@volocopter/design-library-react";
import { useEffect } from "react";
import { useAircraftScheduleTranslation } from "./translations/useAircraftScheduleTranslation";

export const useShowGenericError = (error: Error | undefined): void => {
    const toast = useToast();
    const { t } = useAircraftScheduleTranslation();

    useEffect(() => {
        if (error) {
            toast({
                title: t("Some data failed to load"),
                description: t("Try again later"),
                status: "error",
            });
        }
    }, [error, toast, t]);
};
