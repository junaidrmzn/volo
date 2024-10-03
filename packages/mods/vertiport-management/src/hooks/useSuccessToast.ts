import { useToast } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useVertiportTranslation } from "../translations/useVertiportTranslation";

export const useSuccessToast = (isRedirectToOverview = false) => {
    const { t } = useVertiportTranslation();
    const toast = useToast();
    const navigation = useNavigate();

    const goBackToOverview = () => navigation("..");

    const onSuccess = (description = "") => {
        if (isRedirectToOverview) {
            goBackToOverview();
        }
        toast({ title: t("success.header"), description, status: "success" });
    };

    return { onSuccess };
};

export const useSuccessToastWithoutNavigation = () => {
    const { t } = useVertiportTranslation();
    const toast = useToast();

    const onSuccess = (description = "") => {
        toast({ title: t("success.header"), description, status: "success" });
    };

    return { onSuccess };
};
