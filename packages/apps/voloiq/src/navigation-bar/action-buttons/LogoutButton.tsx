import { Icon, NavigationBarActionButton } from "@volocopter/design-library-react";
import { useAuthentication } from "@voloiq/auth";
import { useActionButtonsTranslation } from "./translations/useActionButtonsTranslation";

export const LogoutButton = () => {
    const { t } = useActionButtonsTranslation();
    const { logout } = useAuthentication();

    return <NavigationBarActionButton onClick={logout} label={t("log out")} icon={<Icon icon="logout" />} />;
};
