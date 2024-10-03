import { useToast } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

export const useSuccessToast = (isRedirectToOverview = false) => {
    const { t } = useResourcesTranslation();
    const toast = useToast();
    const navigation = useNavigate();

    const goBackToOverview = () => navigation("..");

    const onSuccess = (description = "") => {
        if (isRedirectToOverview) {
            goBackToOverview();
        }
        toast({ title: t("aircraft-management.successTitle"), description, status: "success" });
    };

    return { onSuccess };
};
