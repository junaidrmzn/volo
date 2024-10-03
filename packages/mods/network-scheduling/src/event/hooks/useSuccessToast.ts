import { useToast } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useEventTranslation } from "../translations/useEventTranslation";

export const useSuccessToast = (isRedirectToOverview = true) => {
    const { t } = useEventTranslation();
    const toast = useToast();
    const navigation = useNavigate();

    const goBackToOverview = () => navigation("..");

    const onSuccess = (description = "") => {
        if (isRedirectToOverview) {
            goBackToOverview();
        }
        toast({ title: t("successTitle"), description, status: "success" });
    };

    return { onSuccess };
};
