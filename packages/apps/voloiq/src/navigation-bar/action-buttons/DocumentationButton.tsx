import { Box, NavigationBarActionButton } from "@volocopter/design-library-react";
import { useLocation } from "@voloiq/routing";
import { useActionButtonsTranslation } from "./translations/useActionButtonsTranslation";

const openDocumentationPage = (pathname: string) => window.open(`/documentation${pathname}`, "_blank");

export const DocumentationButton = () => {
    const { t } = useActionButtonsTranslation();
    const { pathname } = useLocation();

    const icon = (
        <Box fontSize="xxs" w={9} pr={1} whiteSpace="pre-line" display="block">
            {t("docs")}
        </Box>
    );
    const label = t("documentation");

    return <NavigationBarActionButton onClick={() => openDocumentationPage(pathname)} icon={icon} label={label} />;
};
