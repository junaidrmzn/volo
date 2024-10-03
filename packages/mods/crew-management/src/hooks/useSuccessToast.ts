import { useToast } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";

export const useSuccessToast = (isRedirectToOverview = false) => {
    const { t } = useCrewApiTranslation();
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
