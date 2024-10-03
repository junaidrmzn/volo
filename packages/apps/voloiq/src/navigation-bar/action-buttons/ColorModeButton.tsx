import { Icon, NavigationBarActionButton, useColorMode } from "@volocopter/design-library-react";
import { useActionButtonsTranslation } from "./translations/useActionButtonsTranslation";

export const ColorModeButton = () => {
    const { t } = useActionButtonsTranslation();
    const { toggleColorMode, colorMode } = useColorMode();
    const label = colorMode === "light" ? t("light mode") : t("dark mode");

    return (
        <NavigationBarActionButton
            onClick={toggleColorMode}
            icon={<Icon icon={colorMode === "light" ? "lightMode" : "darkMode"} />}
            label={label}
        />
    );
};
